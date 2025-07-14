import NextAuth from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest){
    const handler = NextAuth(authOptions)
    return handler(request)
}

export async function GET(request: NextRequest){
    const handler = NextAuth(authOptions)
    return handler(request)
}