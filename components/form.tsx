"use client";

import { addComment } from "@/utils/actions/comments.actions";
import ProfileAvatar from "./profile-avatar";
import { useForm } from "react-hook-form";
interface Props {
  currentUserId: string;
  currentUserImage: string;
  username: string;
}

const Form = ({ currentUserId, currentUserImage, username }: Props) => {
  type FormValues = {
    content: string;
  };

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: { content: "" },
  });
  const onSubmit = async (values: FormValues) => {
    await addComment({
      owner: currentUserId,
      tag: username,
      replies: [],
      score: [],
      content: values.content,
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-5 bg-white rounded-lg flex gap-5"
    >
      <ProfileAvatar image={currentUserImage} />
      <textarea
        rows={3}
        {...register("content", {
          required: {
            value: true,
            message: "Please fill this field.",
          },
        })}
        placeholder="Add a comment..."
        className={`${
          errors.content?.message ? "border-red-600" : "border-light-gray"
        } grow rounded-md border-2 py-4 px-5`}
      />
      <button className="rounded-md py-3 px-8 bg-moderate-blue text-white h-max font-bold">
        SEND
      </button>
    </form>
  );
};

export default Form;
