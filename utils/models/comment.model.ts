import mongoose from "mongoose";

const commentSchemma = new mongoose.Schema({
    content: { type: String, required: true },
    score: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    Owner: { type: String },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }],
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }
}, {
    timestamps: true
});


const Comment = mongoose.models.comment || mongoose.model("comment", commentSchemma);

export default Comment