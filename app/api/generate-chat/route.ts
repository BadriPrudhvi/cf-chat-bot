import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
    const ai = getRequestContext().env.AI
    const gateway_id = getRequestContext().env.CLOUDFLARE_GATEWAY_ID
    
    let { userInput} = await request.json() as { userInput: string}
  
    const systemPrompt = `You are a helpful assistant. Your task is to answer questions.`

    const userPrompt = `${userInput}`

    const messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
    ]

    const response = await ai.run("@cf/meta/llama-3.1-70b-instruct",
        { 
            messages, 
            temperature: 1, 
            max_tokens: 1024, 
        }, 
        {
            gateway: {
                id: gateway_id,
                skipCache: false,
                cacheTtl: 3600000,
            },
      },
    )

    return new Response(JSON.stringify({ bio: response.response }), {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}