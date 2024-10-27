'use client'

import Chatbot from '@/components/chatbot'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container max-w-5xl mx-auto p-4 sm:py-6">
        <Chatbot />
      </main>
      <Footer />
    </div>
  )
}
