import connectDB from "@/utils/mongoose";
import Comment from "@/utils/models/comment.model";
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
    await connectDB();
    const AllComments = await Comment.find();
    if (AllComments) {
      return NextResponse.json({
        message: "All Data Send",
        AllComments,
      });
    }
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
