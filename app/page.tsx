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
  return (
    <main className="grow flex flex-col items-center justify-center max-h-screen relative">
      <div className="my-5">
        <SignedOut>
          <button className="rounded-md py-3 px-8 bg-moderate-blue text-white h-max font-bold">
            SIGN IN
          </button>
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
        <div className="grow overflow-y-auto flex flex-col gap-5 px-5">
          {comments.map((comment) => (
            <Comment
              content={comment.content}
              username={comment.tag}
              key={comment._id}
              authorImage={comment.owner.image}
              time={moment(comment.createdAt).fromNow()}
              score={comment.score.length}
            />
          ))}
        </div>
        <div className="mt-auto my-5">
          <Form
            currentUserId={user.id}
            currentUserImage={user.imageUrl}
            username={user.firstName ? user.firstName : "username"}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
