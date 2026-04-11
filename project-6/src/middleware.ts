import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const token = req.cookies.get("token");
  if (token) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/", req.url));
  }
};

export const config = {
  matcher: ["/user-manage/:path*", "/company-manage/:path*"],
};
