"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Github, Code, Sparkles, ChevronRight, Star } from "lucide-react"

export default function SignInPage() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-700/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
              <img
                src="/myLogo.png"
                alt="My Logo"
                className="w-8 h-8 object-contain"
              />
            <span className="font-semibold text-base sm:text-lg">j15.ai</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <br></br>
          <br></br>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Debug Code Like a
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Pro</span>
          </h1>

          <br></br>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold flex items-center gap-2"
              onClick={() => signIn("github", {callbackUrl: "/page/chat"})}
            >
              <Github className="w-5 h-5" />
              Sign in with GitHub
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>Trusted by developers</span>
            </div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <span>Free to start</span>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <span>No credit card required</span>
          </div>
        </div>
      </section>
    </div>
  )
}