"use server";

import User from "../models/user.model";
import connectDB from "../mongoose";

export const fetchUser = async ({
  id,
  name,
  email,
  image,
}: {
  id: string;
  name?: string;
  email?: string;
  image?: string;
}) => {
  await connectDB();
  const user = await User.findOne({ id: id });
  if (!user) {
    return await User.create({ id, name, email, image });
  }
  return user;
};
