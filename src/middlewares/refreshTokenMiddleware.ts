import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

// Middleware to verify refresh token
export const verifyRefreshToken = async (req: NextRequest) => {
  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if no refresh token
  }

  const secret = new TextEncoder().encode(
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET
  );

  try {
    jwtVerify(refreshToken, secret);
    return NextResponse.next(); // Continue if refresh token is valid
  } catch (err: unknown) {
    console.error("Refresh token verification failed", err);

    return NextResponse.redirect(new URL("/login", req.url)); // Token verification failed, redirect to login
  }
};
