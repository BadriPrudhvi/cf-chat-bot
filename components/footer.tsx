export function Footer() {
  return (
    <footer className="text-center p-4 text-sm text-gray-500">
      <div className="container max-w-5xl mx-auto">
        <p>
          Powered by{' '}
          <a 
            href="https://developers.cloudflare.com/workers-ai/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-500 hover:underline"
          >
            Cloudflare Workers AI
          </a>
          {' '}using{' '}
          <a 
            href="https://developers.cloudflare.com/workers-ai/models/llama-3.1-70b-instruct/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-500 hover:underline"
          >
            Meta Llama 3.1
          </a>
        </p>
      </div>
    </footer>
  )
}
