import connectDB from "@/lib/mongodb";
import Offer from "@/models/offer";
import { NextResponse } from "next/server";

// Get Params Method
export async function GET(request) {
  try {
    await connectDB();

    const id = request.nextUrl.searchParams.get("id");

    const offer = await Offer.findById(id);

    return NextResponse.json({
      success: 200,
      offer: offer,
    });
  } catch (error) {
    return NextResponse.json({ success: 500, message: error.message });
  }
}
