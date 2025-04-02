import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export const verifyAccessToken = async (req: NextRequest) => {
  const accessToken = req.cookies.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("login", req.url)); // need to make sure since backend has different url
  }

  const secret = new TextEncoder().encode(
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET
  );

  try {
    jwtVerify(accessToken, secret);

    return NextResponse.next();
  } catch (err: unknown) {
    console.error("Access token verification failed", err);
    return NextResponse.redirect(new URL("login", req.url)); // need to make sure since backend has different url
  }
};
