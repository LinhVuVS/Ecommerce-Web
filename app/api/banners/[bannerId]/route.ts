import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { connectToDB } from "@/lib/mongoDB";
import Banner from "@/lib/models/Banner";

export const GET = async (
  req: NextRequest,
  { params }: { params: { bannerId: string } }
) => {
  try {
    await connectToDB();

    const banner = await Banner.findById(params.bannerId);

    if (!banner) {
      return new NextResponse(
        JSON.stringify({ message: "Banner not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(banner, { status: 200 });
  } catch (err) {
    console.log("[bannerId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { bannerId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    let banner = await Banner.findById(params.bannerId);

    if (!banner) {
      return new NextResponse("Banner not found", { status: 404 });
    }

    const { title, description, image } = await req.json();

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    banner = await Banner.findByIdAndUpdate(
      params.bannerId,
      { title, description, image },
      { new: true }
    );

    await banner.save();

    return NextResponse.json(banner, { status: 200 });
  } catch (err) {
    console.log("[bannerId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { bannerId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    await Banner.findByIdAndDelete(params.bannerId);
    
    return new NextResponse("Banner is deleted", { status: 200 });
  } catch (err) {
    console.log("[bannerId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";