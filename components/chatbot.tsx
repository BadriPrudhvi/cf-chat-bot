'use client'

import { useState} from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SendHorizonal, Loader2 } from 'lucide-react'
import { ChatMessage } from '@/components/chat-message'
import { useChatScroll } from '@/hooks/use-chat-scroll'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useChatScroll(messages)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/generate-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: input.trim() }),
      })

      const data = await response.json() as { aiResponse: string }
      const aiMessage: Message = { role: 'assistant', content: data.aiResponse }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto h-[calc(100vh-10rem)] flex flex-col">
      <CardHeader className="flex-none">
        <CardTitle className="text-center">AI Chat Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col h-[calc(100%-5rem)] overflow-hidden">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4"
        >
          {messages.map((message, index) => (
            <div key={index} className="my-4">
              <ChatMessage
                message={message}
                isLoading={isLoading && index === messages.length - 1}
              />
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex-none flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SendHorizonal className="h-4 w-4" />
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
