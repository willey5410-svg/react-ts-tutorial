import type { ReactNode } from 'react'

interface TermProps {
  definition: string
  children: ReactNode
}

export function Term({ definition, children }: TermProps) {
  return (
    <dfn
      title={definition}
      className="cursor-help underline decoration-dotted decoration-2 underline-offset-2"
    >
      {children}
    </dfn>
  )
}
