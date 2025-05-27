'use client'

import { BubbleMenu, useEditor } from '@tiptap/react'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { useEffect, useState } from 'react'

export function CustomEditor() {
  const [editor, setEditor] = useState<any>(null)

  // This function is passed to SimpleEditor to get the internal editor instance
  const handleReady = (editorInstance: any) => {
    setEditor(editorInstance)
  }

  return (
    <div className="relative">
      {/* Inject BubbleMenu */}
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bg-white border border-gray-300 shadow rounded px-3 py-1 text-sm">
            hello
          </div>
        </BubbleMenu>
      )}

      {/* Render the original editor and get access to its internal editor instance */}
      <SimpleEditor onReady={handleReady} />
    </div>
  )
}
