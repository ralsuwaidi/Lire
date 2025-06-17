'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Home() {
  const [value, setValue] = useState('')

  return (
    <main className="flex min-h-dvh flex-col items-center p-6 lg:p-10">
      <div className="w-full max-w-3xl space-y-6">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          className="h-40"
          placeholder="Enter markdown here..."
        />
        <div className="rounded-lg border border-zinc-950/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
          <ReactMarkdown remarkPlugins={[remarkGfm]} className="space-y-4">
            {value}
          </ReactMarkdown>
        </div>
      </div>
    </main>
  )
}
