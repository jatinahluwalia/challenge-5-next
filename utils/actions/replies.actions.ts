"use server";

import { revalidatePath } from "next/cache";
import Comment from "../models/comment.model";
import Replies from "../models/replies.model";
import User from "../models/user.model";
import connectDB from "../mongoose";
import { fetchUser } from "./user.actions";

export const addReply = async (data: {
  content: string;
  score: any[];
  owner: string;
  tag: string;
  commentId: string;
}) => {
  await connectDB();
  const currentUser = await User.findOne({ id: data.owner });
  const createdReply = await Replies.create({
    ...data,
    owner: currentUser._id,
  });
  await Comment.findByIdAndUpdate(data.commentId, {
    $push: { replies: createdReply._id },
  });
};

export const addReplyScore = async (commentId: string, userId: string) => {
  try {
    await connectDB();
    const user = await fetchUser(userId);
    const scoreExists = await Replies.find({ _id: commentId, score: user._id });
    if (scoreExists.length) return false;
    await Replies.findByIdAndUpdate(commentId, {
      $push: { score: user._id },
    });
    revalidatePath("/");
    return true;
  } catch (error: any) {
    throw new Error(`Error adding score: ${error.message}`);
  }
};
export const removeReplyScore = async (commentId: string, userId: string) => {
  try {
    await connectDB();
    const user = await fetchUser(userId);
    await Replies.findByIdAndUpdate(commentId, {
      $pull: { score: user._id },
    });
    revalidatePath("/");
  } catch (error: any) {
    throw new Error(`Error adding score: ${error.message}`);
  }
};
