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
  connectDB();
  return await Comment.find()
    .sort({ createdAt: -1 })
    .populate({ path: "owner", model: User })
    .populate({
      path: "replies",
      model: Replies,
      populate: { path: "owner", model: User },
    });
};
