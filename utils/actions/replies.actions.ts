"use server";

import Comment from "../models/comment.model";
import Replies from "../models/replies.model";
import User from "../models/user.model";
import connectDB from "../mongoose";

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
