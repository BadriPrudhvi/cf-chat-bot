import { UserRound, Bot } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant'
    content: string
  }
  isLoading?: boolean
}

interface CodeComponentProps extends React.ClassAttributes<HTMLElement>, 
  React.HTMLAttributes<HTMLElement> {
  inline?: boolean
  className?: string
}

export function ChatMessage({ message, isLoading = false }: ChatMessageProps) {
  const components: Components = {
    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
    ul: ({ children }) => <ul className="mb-2 list-disc pl-4">{children}</ul>,
    ol: ({ children }) => <ol className="mb-2 list-decimal pl-4">{children}</ol>,
    li: ({ children }) => <li className="mb-1">{children}</li>,
    code: ({ inline, className, children, ...props }: CodeComponentProps) => (
      <code
        className={`${
          inline ? 'bg-muted-foreground/20 rounded px-1' : 'block bg-muted-foreground/20 p-2 rounded-md'
        } ${className || ''}`}
        {...props}
      >
        {children}
      </code>
    ),
    a: ({ children, href }) => (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {children}
      </a>
    ),
  }

  return (
    <div
      className={`flex items-start gap-2 group ${
        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <div
        className={`flex-none rounded-full p-2 ${
          message.role === 'user' ? 'bg-primary' : 'bg-muted'
        }`}
      >
        {message.role === 'user' ? (
          <UserRound className={`h-4 w-4 ${
            message.role === 'user' ? 'text-primary-foreground' : ''
          }`} />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>
      <div className={`relative flex-1 ${
        message.role === 'user' ? 'flex justify-end' : ''
      }`}>
        <div
          className={`rounded-lg px-4 py-2 break-words ${
            message.role === 'user'
              ? 'bg-primary text-primary-foreground inline-block max-w-[80%]'
              : 'bg-muted max-w-[80%]'
          }`}
        >
          {message.role === 'assistant' ? (
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              className="prose dark:prose-invert prose-sm max-w-none"
              components={components}
            >
              {message.content}
            </ReactMarkdown>
          ) : (
            message.content
          )}
        </div>
      </div>
    </div>
  )
}
