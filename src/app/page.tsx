'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'

export default function Home() {
  const [value, setValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <main className="flex min-h-dvh flex-col items-center p-6 lg:p-10">
      <div className="w-full max-w-3xl space-y-6">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          className="h-40"
          placeholder="Enter markdown here..."
        />
        <div
          className="rounded-lg border border-zinc-950/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900 space-y-4"
          onClick={() => setIsOpen(true)}
        >
          <ReactMarkdown remarkPlugins={[remarkBreaks]}>
            {value}
          </ReactMarkdown>
        </div>
        <Dialog open={isOpen} onClose={setIsOpen}>
          <DialogTitle>Placeholder</DialogTitle>
          <DialogDescription>
            More detailed word definitions will appear here.
          </DialogDescription>
          <DialogBody>
            <p>Ceci est un texte de remplacement.</p>
          </DialogBody>
          <DialogActions>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </main>
  )
}
