import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { codeOnlySystemPrompt } from "@/lib/ai/codeOnly";
import { debugOnlySystemPrompt } from "@/lib/ai/debugOnly";
import { isWithinLineLimit } from "@/lib/ai/limitGuard";
import { isCodingPrompt } from "@/lib/ai/token-saver";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest){
    const body = await request.json()
    const { message: userMessage, mode = "full" } = body;

    if (!userMessage){
        return NextResponse.json({error: 'Message is required'}, {status: 400});
    }

    if (!isWithinLineLimit(userMessage)){
        return NextResponse.json({error: 'Input exceeds 900 lines'}, {status: 400});
    }

    if (!isCodingPrompt){
        return NextResponse.json({error: "Only coding-related questions are allowed."}, {status: 400});
    }

    const systemPrompt = mode === "partial" ? debugOnlySystemPrompt : codeOnlySystemPrompt;


    const stream = await openai.chat.completions.create({
        model: 'gpt-4.1-nano',
        stream: true,
        messages: [
            {role: 'system', content: systemPrompt},
            {role: 'user', content: userMessage}
        ],
        temperature: 0.2
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
        async start(controller){
            for await (const chunk of stream){
                const content = chunk.choices[0]?.delta?.content;

                if (content){
                    controller.enqueue(encoder.encode(content));
                }
            }
            controller.close();
        }
    })
    
    return new NextResponse(readableStream, {
        headers:{
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache'
        }
    })
}
