import { Webhook, WebhookRequiredHeaders } from "svix";
import { headers } from "next/headers";
import { IncomingHttpHeaders } from "http";
import { NextResponse } from "next/server";
import { addUser } from "@/utils/actions/user.actions";

type EventType = "user.created";

type Event = {
  data: Record<string, string | number | Record<string, string>[]>;
  object: "event";
  type: EventType;
};

export const GET = () => {
  if (process.env.NEXT_CLERK_WEBHOOK_SECRET) return NextResponse.json("good");
  return NextResponse.json("bad");
};

export const POST = async (request: Request) => {
  const payload = await request.json();
  const header = headers();

  const heads = {
    "svix-id": header.get("svix-id"),
    "svix-timestamp": header.get("svix-timestamp"),
    "svix-signature": header.get("svix-signature"),
  };
  const wh = new Webhook(process.env.NEXT_CLERK_WEBHOOK_SECRET || "");

  let evnt: Event | null = null;

  try {
    evnt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders,
    ) as Event;
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }

  const eventType: EventType = evnt?.type!;
  if (eventType === "user.created") {
    try {
      if (
        typeof evnt.data["email_addresses"] === "string" ||
        typeof evnt.data["email_addresses"] === "number"
      )
        return;
      await addUser({
        id: evnt.data["id"] as string,
        name: evnt.data["first_name"] + " " + evnt.data["last_name"],
        email: evnt.data["email_addresses"][0]["email_address"],
        image: evnt.data["image_url"] as string,
      });

      return NextResponse.json({ message: "User Created" }, { status: 201 });
    } catch (err) {
      console.log(err);

      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 },
      );
    }
  }
};
