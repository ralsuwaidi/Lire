'use client'

import { useState } from 'react'

function randomPlaceholder() {
  const placeholders = [
    'Lorem',
    'Ipsum',
    'Dolor',
    'Sit',
    'Amet',
  ]
  return placeholders[Math.floor(Math.random() * placeholders.length)]
}

function Word({ word }: { word: string }) {
  const [open, setOpen] = useState(false)
  return (
    <span className="relative" onClick={() => setOpen((o) => !o)}>
      {word}
      {open && (
        <span className="absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 rounded bg-white p-1 text-xs shadow">
          {randomPlaceholder()}
        </span>
      )}
    </span>
  )
}

export function ReadlangText({ text }: { text: string }) {
  const paragraphs = text.split(/\n+/)
  return (
    <div className="space-y-4 text-lg leading-relaxed">
      {paragraphs.map((p, i) => (
        <p key={i} className="whitespace-pre-wrap">
          {p.split(/(\s+)/).map((part, j) => (
            /^\s+$/.test(part) ? (
              part
            ) : (
              <Word key={j} word={part} />
            )
          ))}
        </p>
      ))}
    </div>
  )
}
