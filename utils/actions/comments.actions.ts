"use server";

import Comment from "../models/comment.model";
import User from "../models/user.model";
import connectDB from "../mongoose";
import { fetchUser } from "./user.actions";

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
};

export const fetchComments = async () => {
  connectDB();
  return await Comment.find().populate({ path: "owner", model: User });
};
