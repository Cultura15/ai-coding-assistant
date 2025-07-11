import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { codeOnlySystemPrompt } from "@/lib/ai/codeOnly";
import { isWithinLineLimit } from "@/lib/ai/limitGuard";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest){
    const body = await request.json()
    const userMessage = body.message

    if (!userMessage){
        return NextResponse.json({error: 'Message is required'}, {status: 400});
    }

    if (!isWithinLineLimit(userMessage)){
        return NextResponse.json({error: 'Input exceeds 900 lines'}, {status: 400})
    }

    const response = await openai.chat.completions.create({
        model: 'gpt-4.1-nano',
        messages: [
            {role: 'system', content: codeOnlySystemPrompt},
            {role: 'user', content: userMessage}
        ],
        temperature: 0.2
    });

    const aiReply = response.choices[0]?.message?.content || '';

      if (!isWithinLineLimit(aiReply)){
        return NextResponse.json({error: 'Input exceeds 900 lines'}, {status: 400})
    }
    
    return NextResponse.json({reply: aiReply});
}
