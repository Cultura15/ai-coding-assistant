import { db } from "@/lib/firebase";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const userDoc = await db.collection("users").doc(id).get();

  if (!userDoc.exists) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(userDoc.data()), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
