import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { NextRequest } from "next/server";

export const authOptions: AuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    adapter: FirestoreAdapter({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAI,
            privateKey: process.env.FIREBASE_PRIVATE_KEY,
        }),
    }),
    secret: process.env.NEXTAUTH_SECRET,
}

export async function POST(request: NextRequest){
    const handler = NextAuth(authOptions)
    return handler(request)
}

export async function GET(request: NextRequest){
    const handler = NextAuth(authOptions)
    return handler(request)
}