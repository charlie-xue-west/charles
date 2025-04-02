import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken, verifyRefreshToken } from "./middlewares";

export async function middleware(req: NextRequest) {
  const accessTokenResult = await verifyAccessToken(req);
  if (accessTokenResult instanceof NextResponse) {
    return accessTokenResult;
  }

  const refreshTokenResult = await verifyRefreshToken(req);
  if (refreshTokenResult instanceof NextResponse) {
    return refreshTokenResult;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/hub"],
};
