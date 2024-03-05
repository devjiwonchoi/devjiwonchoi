'use client'
import { useEffect, useRef } from 'react'
import { Terminal as XtermTerminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { WebLinksAddon } from '@xterm/addon-web-links'
import '@xterm/xterm/css/xterm.css'
import type { ITerminalInitOnlyOptions, ITerminalOptions } from '@xterm/xterm'

const XtermTerinalOptions: ITerminalOptions & ITerminalInitOnlyOptions = {
  fontSize: 14,
  fontFamily: 'Geist Mono, monospace',
  // TOOD: does this work?
  macOptionIsMeta: true,
  cursorBlink: true,
  rows: 25,
  tabStopWidth: 2,
  lineHeight: 1.25,
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

    const promptStr = 'guest@jiwonchoi.dev ~ % '
    const promptStrLen = promptStr.length

    const initPropmt = () => {
      terminal.write(`\r${promptStr}`)
    }
    const prompt = () => {
      terminal.write(`\r\n${promptStr}`)
    }
    const commands: Record<string, any> = {
      clear: {
        f: () => {
          terminal.reset()
          initPropmt()
        },
      },
      help: {
        f: () => {
          terminal.writeln('\nAvailable commands:')
          terminal.writeln('  clear - Clear the terminal screen')
          terminal.writeln('  help - Show this help message')
          prompt()
        },
      },
    }

    function runCommand(text: string) {
      const command = text.trim().split(' ')[0]
      if (command.length > 0) {
        terminal.writeln('')
        if (command in commands) {
          commands[command].f()
          return
        }
        terminal.write(`zsh: command not found: ${command}`)
      }
      prompt()
    }

    // command history
    const history: string[] = []
    let historyIndex = 0

    initPropmt()
    let command = ''
    terminal.onData((e) => {
      switch (e) {
        case '\u0003': // Ctrl+C
          terminal.write('^C')
          prompt()
          break
        case '\r': // Enter
          runCommand(command)
          history.push(command)
          historyIndex = history.length
          command = ''
          break
        case '\u007F': // Backspace (DEL)
          // Do not delete the prompt
          if (terminal.buffer.active.cursorX > promptStrLen) {
            terminal.write('\b \b')
            if (command.length > 0) {
              command = command.substr(0, command.length - 1)
            }
          }
          break
        // Left arrow
        case '\u001b[D':
          if (terminal.buffer.active.cursorX > promptStrLen) {
            terminal.write('\u001b[D')
          }
          break
        // Right arrow
        case '\u001b[C':
          if (command.length > terminal.buffer.active.cursorX - promptStrLen) {
            terminal.write('\u001b[C')
          }
          break
        // Up arrow
        case '\u001b[A':
          if (historyIndex > 0) {
            historyIndex--
            command = history[historyIndex]
            terminal.write(`\r${promptStr}${command}`)
          }
          break
        // Down arrow
        case '\u001b[B':
          if (historyIndex < history.length - 1) {
            historyIndex++
            command = history[historyIndex]
            terminal.write(`\r${promptStr}${command}`)
          }
          break
        default: // Print all other characters for demo
          if (
            (e >= String.fromCharCode(0x20) &&
              e <= String.fromCharCode(0x7e)) ||
            e >= '\u00a0'
          ) {
            command += e
            terminal.write(e)
          }
      }
    })

    if (terminalRef.current) {
      terminal.open(terminalRef.current)
    }

    return () => {
      terminal.dispose()
    }
  }, [])

  return (
    <div className="flex justify-center">
      <div ref={terminalRef} />
    </div>
  )
}
