"use server";

import { revalidatePath } from "next/cache";
import Comment from "../models/comment.model";
import User from "../models/user.model";
import connectDB from "../mongoose";
import { fetchUser } from "./user.actions";
import Replies from "../models/replies.model";

export const addComment = async ({
  owner,
  tag,
  replies,
  score,
  content,
}: {
  owner: string;
  tag: string;
  replies: any[];
  score: any[];
  content: string;
}) => {
  await connectDB();
  const user = await fetchUser(owner);
  const comment = await Comment.create({
    content,
    score,
    replies,
    tag,
    owner: user._id,
  });
  await User.findByIdAndUpdate(user._id, { $push: { comments: comment._id } });
  revalidatePath("/");
};
export const deleteComment = async (id: string) => {
  await connectDB();
  const deletedComment = await Comment.findByIdAndDelete(id).populate({
    path: "owner",
    model: User,
  });
  await User.findByIdAndUpdate(deletedComment.owner._id, {
    $pull: { comments: deletedComment._id },
  });
  revalidatePath("/");
};

export const fetchComments = async () => {
  try {
    await connectDB();
    return await Comment.find()
      .sort({ createdAt: -1 })
      .populate({ path: "owner", model: User })
      .populate({
        path: "replies",
        model: Replies,
        populate: { path: "owner", model: User },
      });
  } catch (error: any) {
    throw new Error(`Error fetching comments: ${error.message}`);
  }
};

export const addScore = async (commentId: string, userId: string) => {
  try {
    await connectDB();
    const user = await fetchUser(userId);
    const scoreExists = await Comment.find({ _id: commentId, score: user._id });
    if (scoreExists.length) return false;
    const added = await Comment.findByIdAndUpdate(commentId, {
      $push: { score: user._id },
    });
    revalidatePath("/");
    if (added) return true;
    return false;
  } catch (error: any) {
    throw new Error(`Error adding score: ${error.message}`);
  }
};
export const removeScore = async (commentId: string, userId: string) => {
  try {
    await connectDB();
    const user = await fetchUser(userId);
    await Comment.findByIdAndUpdate(commentId, {
      $pull: { score: user._id },
    });
    revalidatePath("/");
  } catch (error: any) {
    throw new Error(`Error adding score: ${error.message}`);
  }
};

export const updateComment = async (commentId: string, content: string) => {
  try {
    await connectDB();
    await Comment.findByIdAndUpdate(commentId, { content: content });
    revalidatePath("/");
  } catch (error: any) {
    throw new Error(`Error updating comment: ${error.message}`);
  }
};
