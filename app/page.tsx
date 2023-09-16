import Comment from "@/components/comment";
import Form from "@/components/form";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  currentUser,
} from "@clerk/nextjs";
import { NextPage } from "next";
import { redirect } from "next/navigation";

const Home: NextPage = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  return (
    <main className="grow grid place-content-center">
      <div className="absolute">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SignOutButton />
        </SignedIn>
      </div>
      <div className="w-[min(800px,100%)] mx-auto">
        <Comment />
        <Form
          currentUserId={user.id}
          currentUserImage={user.imageUrl}
          username={user.firstName ? user.firstName : "username"}
          name={
            user.firstName && user.lastName
              ? user.firstName + " " + user.lastName
              : "Name"
          }
          email={user.emailAddresses[0].emailAddress}
        />
      </div>
    </main>
  );
};

export default Home;
