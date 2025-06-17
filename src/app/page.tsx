'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

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
          className="space-y-4 rounded-lg border border-zinc-950/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900"
          onClick={() => setIsOpen(true)}
        >
          <div className="prose dark:prose-invert max-w-none whitespace-pre-line">
            <ReactMarkdown>{value}</ReactMarkdown>
          </div>
        </div>
        <Dialog open={isOpen} onClose={setIsOpen}>
          <DialogTitle>Placeholder</DialogTitle>
          <DialogDescription>More detailed word definitions will appear here.</DialogDescription>
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
