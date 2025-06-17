'use client'

import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

// Load the GFM plugin lazily to avoid build errors if dependencies
// haven't been installed yet. This mirrors what would happen after
// running `npm install` locally.
let gfmPlugin: any

export default function Home() {
  const [value, setValue] = useState('')
  const [plugins, setPlugins] = useState<any[]>([])

  useEffect(() => {
    if (!gfmPlugin) {
      import('remark-gfm').then((mod) => {
        gfmPlugin = mod.default
        setPlugins([gfmPlugin])
      })
    } else {
      setPlugins([gfmPlugin])
    }
  }, [])

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
          <ReactMarkdown remarkPlugins={plugins} className="space-y-4">
            {value}
          </ReactMarkdown>
        </div>
      </div>
    </main>
  )
}
