import mongoose from "mongoose";

const repliesSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    score: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    tag: { type: String },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: "comment" },
  },
  {
    timestamps: true,
  },
);

const Replies =
  mongoose.models.replies || mongoose.model("replies", repliesSchema);

export default Replies;
