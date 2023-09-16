import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // publicRoutes: ["/", "/api/comment", "/api/user"],
  // ignoredRoutes: ["/", "/api/comment", "/api/user"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
