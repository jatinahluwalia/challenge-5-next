"use client";

import { addComment, updateComment } from "@/utils/actions/comments.actions";
import ProfileAvatar from "./profile-avatar";
import { useForm } from "react-hook-form";
import { addReply, updateReply } from "@/utils/actions/replies.actions";

interface Props {
  currentUserId: string;
  currentUserImage: string;
  username: string;
  type: "send" | "update" | "reply" | "reply-update";
  commentId?: string;
  setReply?: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
  setReplyUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form = ({
  currentUserId,
  currentUserImage,
  username,
  type,
  commentId,
  setReply,
  setUpdate,
  setReplyUpdate,
}: Props) => {
  type FormValues = {
    content: string;
  };

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    defaultValues: { content: type === "reply" ? `@${username}` : "" },
  });
  const onSubmit = async (values: FormValues) => {
    switch (type) {
      case "send": {
        await addComment({
          owner: currentUserId,
          tag: username,
          replies: [],
          score: [],
          content: values.content,
        });
        reset();
        break;
      }
      case "reply": {
        await addReply({
          owner: currentUserId,
          tag: username,
          score: [],
          content: values.content,
          commentId: commentId as string,
        });
        reset();
        setReply && setReply(false);
        break;
      }
      case "update": {
        await updateComment(String(commentId), values.content);
        reset();
        setUpdate && setUpdate(false);
        break;
      }
      case "reply-update": {
        await updateReply(String(commentId), values.content);
        console.log("hi");
        reset();
        setReplyUpdate && setReplyUpdate(false);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`p-5 bg-white rounded-lg flex gap-5 ${
        type === "reply-update" ? "col-start-2 mt-5" : ""
      }`}
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
      <button
        className="rounded-md py-3 px-8 bg-moderate-blue text-white h-max font-bold disabled:opacity-50"
        disabled={isSubmitting}
      >
        {type !== "reply-update" ? type.toUpperCase() : "UPDATE"}
      </button>
    </form>
  );
};

export default Form;
