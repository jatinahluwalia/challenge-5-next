import Comment from "@/components/comment";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

const Home = () => {
  return (
    <main className="grow grid place-content-center">
      <div className="absolute">
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
      <div className="w-[min(800px,100%)] mx-auto">
        <Comment />
      </div>
    </main>
  );
};

export default Home;
