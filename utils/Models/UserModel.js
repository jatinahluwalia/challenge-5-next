import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    UserName: { type: String },
    Email: { type: String, required: true },
    Image: { type: String }
}, {
    timestamps: true
})

const User = mongoose.models.user || mongoose.model("user", UserSchema);


export default User