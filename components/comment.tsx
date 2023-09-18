"use client";

import Image from "next/image";
import ProfileAvatar from "./profile-avatar";
import {
  addScore,
  deleteComment,
  removeScore,
} from "@/utils/actions/comments.actions";
import { HTMLAttributes, useState } from "react";
import Form from "./form";
import {
  addReplyScore,
  removeReplyScore,
} from "@/utils/actions/replies.actions";

interface Props extends HTMLAttributes<HTMLElement> {
  commentId: string;
  currentUserId: string;
  authorId?: string;
  content: string;
  score: number;
  authorImage: string;
  username: string;
  time: string;
  isOwner: boolean;
  currentUserImage?: string;
  isReply?: boolean;
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
  currentUserImage,
  className,
  isReply,
  ...props
}: Props) => {
  const [reply, setReply] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    await deleteComment(commentId);
  };

  const handleReply = () => {
    setReply(true);
  };

  const handleUpdate = () => {
    setUpdate(true);
  };

  const handleScorePlus = async () => {
    if (!isReply) {
      setLoading(true);
      const score = await addScore(commentId, currentUserId);
      if (!score) alert("Score not added");
      setLoading(false);
    } else {
      console.log("hi");
      setLoading(true);
      const score = await addReplyScore(commentId, currentUserId);
      if (!score) alert("Score not added");
      setLoading(false);
    }
  };

  const handleScoreMinus = async () => {
    if (!isReply) {
      setLoading(true);
      await removeScore(commentId, currentUserId);
      setLoading(false);
    } else {
      setLoading(true);
      await removeReplyScore(commentId, currentUserId);
      setLoading(false);
    }
  };
  return (
    <>
      <article
        className={`p-5 bg-white rounded-lg flex gap-7 ${className}`}
        {...props}
      >
        <div className="bg-very-light-gray rounded-lg p-4 flex flex-col justify-between gap-5 items-center">
          <Image
            src={"/images/icon-plus.svg"}
            alt="plus"
            width={15}
            height={15}
            onClick={handleScorePlus}
            role="button"
            aria-disabled={loading}
          />
          <span className="font-bold text-moderate-blue">{score}</span>
          <Image
            src={"/images/icon-minus.svg"}
            alt="minus"
            width={15}
            height={15}
            onClick={handleScoreMinus}
            role="button"
            aria-disabled={loading}
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
                <button
                  className="flex gap-2 items-center text-moderate-blue font-bold"
                  onClick={handleUpdate}
                >
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
              <button
                className="flex gap-2 items-center text-moderate-blue font-bold"
                onClick={handleReply}
              >
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
      {reply ? (
        <Form
          currentUserId={currentUserId}
          currentUserImage={currentUserImage as string}
          username={username}
          type="reply"
          commentId={commentId}
          setReply={setReply}
        />
      ) : (
        update && (
          <Form
            currentUserId={currentUserId as string}
            currentUserImage={currentUserImage as string}
            username={username}
            type="update"
            commentId={commentId}
            setUpdate={setUpdate}
          />
        )
      )}
    </>
  );
};

export default Comment;
