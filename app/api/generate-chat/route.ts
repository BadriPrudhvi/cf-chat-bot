import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
    try {
        const ctx = getRequestContext()
        if (!ctx?.env?.AI || !ctx?.env?.CLOUDFLARE_GATEWAY_ID) {
            throw new Error('Required environment variables are not set')
        }

        const ai = ctx.env.AI
        const gateway_id = ctx.env.CLOUDFLARE_GATEWAY_ID
        
        let { userInput } = await request.json() as { userInput: string }
      
        const systemPrompt = `You are a helpful and friendly AI assistant. Format your responses using markdown to enhance readability:

- Use **bold** for emphasis
- Use \`code blocks\` for code or technical terms
- Use bullet points for lists
- Use numbered lists for steps
- Use headings where appropriate
- Use code fences (\`\`\`) for multi-line code
- Include relevant links when referencing external resources

Keep your responses clear, concise, and well-formatted.`

        const messages = [
            { role: "system", content: systemPrompt },
            { role: "user", content: userInput },
        ]

        const response = await ai.run("@cf/meta/llama-3.1-70b-instruct",  // Using a different model that might be more widely available
            { 
                messages, 
                temperature: 0.5,
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

        if (!response?.response) {
            throw new Error('No response received from AI')
        }

        return new Response(JSON.stringify({ aiResponse: response.response }), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    } catch (error) {
        console.error('Error in generate-chat:', error)
        return new Response(
            JSON.stringify({ 
                error: 'Failed to generate response', 
                details: error instanceof Error ? error.message : 'Unknown error'
            }), 
            { 
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
    }
}
