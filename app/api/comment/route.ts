import connectDB from "@/utils/mongoose.js";
import Comment from "@/utils/models/comment.model.js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const { content } = body;

    if (!content) {
      return NextResponse.json(
        {
          message: "Kindly please fill the empty box",
        },
        {
          status: 500,
        },
      );
    }

    await Comment.create(body);

    return NextResponse.json(
      {
        message: "Data successfully add",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Server error Please try again!",
    });
  }
}

export async function GET(_request: NextRequest) {
  try {
    console.log("HI2");
    await connectDB();
    console.log("HI");
    const AllComments = await Comment.find();
    console.log(await Comment.find());
    console.log(AllComments);
    console.log("Hi2");
    // if (AllComments) {
    //     return NextResponse.json({
    //         message: "All Data Send",
    //         AllComments
    //     })
    // }

    return new Response(JSON.stringify(AllComments));
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server error Please try again!",
      },
      {
        status: 500,
      },
    );
  }
}
