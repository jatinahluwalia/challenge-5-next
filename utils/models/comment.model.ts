import mongoose from "mongoose";

const commentSchemma = new mongoose.Schema({
    content: { type: String, required: true },
    score: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "replies"
    }],
    tag: {type: String}
}, {
    timestamps: true
});


const Comment = mongoose.models.comment || mongoose.model("comment", commentSchemma);

export default Comment