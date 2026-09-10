import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;

      const pathname = request.nextUrl.pathname;

      const isPublicRoute = pathname === "/login" || pathname === "/register";

      if (isPublicRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", request.nextUrl));
        }

        return true;
      }

      return isLoggedIn;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
