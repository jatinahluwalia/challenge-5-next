"use client";

import Image from "next/image";
import ProfileAvatar from "./profile-avatar";
import { deleteComment } from "@/utils/actions/comments.actions";

interface Props {
  commentId: string;
  currentUserId?: string;
  authorId?: string;
  content: string;
  score: number;
  authorImage: string;
  username: string;
  time: string;
  isOwner: boolean;
}

const Comment = ({
  commentId,
  currentUserId,
  authorId,
  content,
  score,
  authorImage,
  username,
  time,
  isOwner,
}: Props) => {
  const handleDelete = async () => {
    await deleteComment(commentId);
  };
  return (
    <article className="p-5 bg-white rounded-lg flex gap-7">
      <div className="bg-very-light-gray rounded-lg p-4 flex flex-col justify-between gap-5 items-center">
        <Image
          src={"/images/icon-plus.svg"}
          alt="plus"
          width={15}
          height={15}
        />
        <span className="font-bold text-moderate-blue">{score}</span>
        <Image
          src={"/images/icon-minus.svg"}
          alt="minus"
          width={15}
          height={15}
        />
      </div>
      <div className="grow">
        <div className="flex gap-3 items-center justify-between">
          <div className="flex gap-5 items-center">
            <ProfileAvatar image={authorImage as string} />
            <p className="text-dark-blue font-bold">{username}</p>
            {isOwner && (
              <p className="bg-moderate-blue text-white rounded-sm py-1 px-2 h-max leading-none">
                you
              </p>
            )}
            <p className="text-grayish-blue">{time}</p>
          </div>
          {isOwner ? (
            <div className="flex gap-5">
              <button
                className="flex gap-2 items-center text-soft-red font-bold"
                onClick={handleDelete}
              >
                <Image
                  src={"/images/icon-delete.svg"}
                  alt="delete"
                  width={16}
                  height={16}
                />
                <span>Delete</span>
              </button>
              <button className="flex gap-2 items-center text-moderate-blue font-bold">
                <Image
                  src={"/images/icon-edit.svg"}
                  alt="edit"
                  width={16}
                  height={16}
                />
                <span>Edit</span>
              </button>
            </div>
          ) : (
            <button className="flex gap-2 items-center text-moderate-blue font-bold">
              <Image
                src={"/images/icon-reply.svg"}
                alt="Reply"
                width={16}
                height={16}
              />
              <span>Reply</span>
            </button>
          )}
        </div>
        <p className="text-grayish-blue mt-4">{content}</p>
      </div>
    </article>
  );
};

export default Comment;
