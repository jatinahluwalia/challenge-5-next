import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  // name: { type: String },
  // email: { type: String },
  // image: { type: String },
  id: String,
  //   comments: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "comment",
  //     },
  //   ],
  // },
  // {
  //   timestamps: true,
});

const User = mongoose.models.user || mongoose.model("user", UserSchema);

export default User;
