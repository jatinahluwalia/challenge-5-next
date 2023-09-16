"use server";

import User from "../models/user.model";
import connectDB from "../mongoose";

export const fetchUser = async (id: string) => {
  return await User.findOne({ id });
};

export const addUser = async ({
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
  return await User.create({ id, name, email, image });
};
