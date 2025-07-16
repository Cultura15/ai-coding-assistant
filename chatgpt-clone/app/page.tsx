import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignInPage from "./page/signin/page";

export default async function Page(){
  const session = await getServerSession(authOptions);

  if (session){
    redirect("/page/chat");
  }

  return <SignInPage />
}