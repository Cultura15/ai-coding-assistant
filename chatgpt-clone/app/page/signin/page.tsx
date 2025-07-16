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
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl">AI Code Assistant</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-purple-600/20 text-purple-300 px-4 py-2 rounded-full text-sm mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Powered by GPT-4.1 Nano</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Debug Code Like a
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Pro</span>
          </h1>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            {/* AI-powered coding assistant that helps you debug, explain, and review large codebases. Handle 900+ lines of
            code with intelligent analysis and suggestions. */}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold flex items-center gap-2"
              onClick={() => signIn("github", {callbackUrl: "/page/chat"})}
            >
              <Github className="w-5 h-5" />
              Sign up with GitHub
              <ChevronRight className="w-4 h-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white px-8 py-4 text-lg flex items-center gap-2 bg-transparent"
              onClick={() => signIn("github", {callbackUrl: "/page/chat"})}
            >
              <Github className="w-5 h-5" />
              Sign in with GitHub
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