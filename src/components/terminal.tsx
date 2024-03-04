'use client'
import { useEffect, useRef } from 'react'
import { Terminal as XtermTerminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { WebLinksAddon } from '@xterm/addon-web-links'
import '@xterm/xterm/css/xterm.css'
import type { ITerminalInitOnlyOptions, ITerminalOptions } from '@xterm/xterm'

const XtermTerinalOptions: ITerminalOptions & ITerminalInitOnlyOptions = {
  fontSize: 16,
  fontFamily: 'Geist Mono, monospace',
  // TODO: is this working?
  macOptionIsMeta: true,
  rows: 30,
  tabStopWidth: 2,

  theme: {
    background: '#141414',
    cursor: '#fafafa',
    black: '#0a0a0a',
    white: '#fafafa',
  },
}

export function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const terminal = new XtermTerminal(XtermTerinalOptions)
    const fitAddon = new FitAddon()
    const webLinksAddon = new WebLinksAddon()
    terminal.loadAddon(fitAddon)
    terminal.loadAddon(webLinksAddon)
    fitAddon.fit()

    const prompt = () => {
      terminal.write('\r\n$ ')
    }

    prompt()

    terminal.onKey((e: { key: string; domEvent: KeyboardEvent }) => {
      const ev = e.domEvent
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey

      if (ev.code === 'Enter') {
        return prompt()
      }

      // Prevent deleting the prompt
      // TODO: Fix this
      if (ev.code === 'Backspace' && terminal.buffer.active.cursorX > 2) {
        return terminal.write('\b \b')
      }

      if (printable) {
        return terminal.write(e.key)
      }
    })

    if (terminalRef.current) {
      terminal.open(terminalRef.current)
    }

    return () => {
      terminal.dispose()
    }
  }, [])

  return <div ref={terminalRef} />
}
