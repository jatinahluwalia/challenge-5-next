import Comment from "@/components/comment";
import Form from "@/components/form";
import { fetchComments } from "@/utils/actions/comments.actions";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  currentUser,
} from "@clerk/nextjs";
import { NextPage } from "next";
import { redirect } from "next/navigation";
import moment from "moment";

const Home: NextPage = async () => {
  const [user, comments] = await Promise.all([currentUser(), fetchComments()]);
  if (!user) redirect("/sign-in");
  if (!comments) return "There are no comments to show";
  return (
    <main className="grow flex flex-col items-center justify-center max-h-screen relative">
      <div className="my-5">
        <SignedOut>
          <SignInButton>
            <button className="rounded-md py-3 px-8 bg-moderate-blue text-white h-max font-bold">
              SIGN IN
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <SignOutButton>
            <button className="rounded-md py-3 px-8 bg-moderate-blue text-white h-max font-bold">
              SIGN OUT
            </button>
          </SignOutButton>
        </SignedIn>
      </div>
      <div className="grow w-[min(800px,100%)] flex flex-col relative overflow-y-hidden">
        <div className="grow overflow-y-auto flex flex-col px-5 gap-5 mb-5">
          {comments.map((comment) => (
            <>
              <Comment
                key={comment._id}
                content={comment.content}
                commentId={String(comment._id)}
                username={comment.tag}
                authorImage={comment.owner.image}
                time={moment(comment.createdAt).fromNow()}
                score={comment.score.length}
                isOwner={comment.owner.id === user.id}
                currentUserImage={user.imageUrl}
                currentUserId={user.id}
              />
              {comment.replies.length
                ? comment.replies.map((comment: any) => (
                    <div className="flex" key={comment._id}>
                      <div className="w-1 bg-light-gray mx-14" />
                      <Comment
                        key={comment._id}
                        content={comment.content}
                        commentId={String(comment._id)}
                        username={comment.tag}
                        authorImage={comment.owner.image}
                        time={moment(comment.createdAt).fromNow()}
                        score={comment.score.length}
                        isOwner={comment.owner.id === user.id}
                        currentUserImage={user.imageUrl}
                        currentUserId={user.id}
                        className="grow"
                        isReply
                      />
                    </div>
                  ))
                : null}
            </>
          ))}
        </div>
        <div className="mt-auto my-5">
          <Form
            currentUserId={user.id}
            currentUserImage={user.imageUrl}
            username={user.firstName ? user.firstName : "username"}
            type="send"
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
