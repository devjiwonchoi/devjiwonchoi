'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { Terminal as XtermTerminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { WebLinksAddon } from '@xterm/addon-web-links'
import '@xterm/xterm/css/xterm.css'
import { dirTree } from './constants'
import type { ITerminalInitOnlyOptions, ITerminalOptions } from '@xterm/xterm'

const XtermTerminalOptions: ITerminalOptions & ITerminalInitOnlyOptions = {
  fontSize: 14,
  fontFamily: 'Geist Mono, monospace',
  // TODO: does this work?
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
  const router = useRouter()
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const terminal = new XtermTerminal(XtermTerminalOptions)
    const fitAddon = new FitAddon()
    const webLinksAddon = new WebLinksAddon()
    terminal.loadAddon(fitAddon)
    terminal.loadAddon(webLinksAddon)
    fitAddon.fit()

    let currentDir = '~'
    const promptStr = (dir?: string) => `guest@jiwonchoi.dev ${dir ?? '~'} % `
    const promptStrLen = promptStr.length

    let currentDirLevel = 0
    const helpMessage = [
      '',
      'Available commands:',
      '  clear    - Clear the terminal screen',
      '  help     - Show this help message',
      '  ls       - List the files in the current directory',
      '  whoami   - Print the current user',
      '  cd       - Change the current directory',
      '  open     - Open a file or directory',
    ].join('\n\r')

    const initPrompt = () => {
      terminal.write(`\r${promptStr()}`)
    }
    const prompt = ({
      dir = currentDir,
      lineBreak = true,
    }: { dir?: string; lineBreak?: boolean } = {}) => {
      terminal.write(`\r${lineBreak ? '\n' : ''}${promptStr(dir)}`)
    }
    const commands: Record<string, any> = {
      // TODO: fix it puts a new line after clear
      clear: {
        f: () => {
          terminal.reset()
          initPrompt()
        },
      },
      help: {
        f: () => {
          terminal.writeln(helpMessage)
          prompt()
        },
      },
      ls: {
        f: () => {
          // show the list of files in the current directory
          if (currentDir in dirTree) {
            terminal.write(
              dirTree[currentDir].files
                .map((file: any) => file.name)
                .join('    '),
            )
            prompt()
          } else {
            terminal.write(Object.keys(dirTree).join('    '))
            prompt()
          }
        },
      },
      whoami: {
        f: () => {
          // TODO: cheer up the user
          terminal.write('guest')
          prompt()
        },
      },
      cd: {
        f: (dir: string) => {
          // move to the given directory
          if (dir in dirTree) {
            currentDir = dir
            prompt({ dir, lineBreak: false })
          }
          if (dir === '..') {
            const dirArr = currentDir.split('/')
            if (dirArr.length > 1) {
              dirArr.pop()
              currentDir = dirArr.join('/')
              prompt({ dir: currentDir, lineBreak: false })
            }
          }
        },
      },
      open: {
        f: (file: string) => {
          if (dirTree[currentDir].files.includes(file)) {
            router.push(`/${file === 'index.html' ? currentDir : file}`)
          }
        },
      },
    }

    function runCommand(text: string) {
      const command = text.trim().split(' ')[0]
      const dir = text.trim().split(' ').slice(1)[0]
      if (command.length > 0) {
        terminal.writeln('')
        if (command in commands) {
          commands[command].f(dir)
          return
        }
        terminal.write(`zsh: command not found: ${command}`)
      }
      prompt()
    }

    // command history
    const history: string[] = []
    let historyIndex = 0

    initPrompt()
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
        // Tab
        case '\u0009':
          // tab completion
          const lastWord = command.split(' ').pop()

          if (lastWord) {
            let dir = Object.keys(dirTree)
            if (currentDir in dirTree) {
              dir = dirTree[currentDir]
            }

            const matchingCommands = dir.filter((command) =>
              command.startsWith(lastWord),
            )

            if (matchingCommands.length === 1) {
              terminal.write(matchingCommands[0].slice(lastWord.length))
              command += matchingCommands[0].slice(lastWord.length)
            } else if (matchingCommands.length > 1) {
              terminal.writeln('')
              terminal.write(matchingCommands.join(' '))
              prompt()
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
            // clear the current command first
            terminal.write(`\r${promptStr}${' '.repeat(command.length)}`)
            // preserve current index, then decrement
            historyIndex--
            command = history[historyIndex]
            terminal.write(`\r${promptStr}${command}`)
          }
          break
        // Down arrow
        case '\u001b[B':
          if (historyIndex < history.length - 1) {
            // clear the current command first
            terminal.write(`\r${promptStr}${' '.repeat(command.length)}`)
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
      terminal.focus()
    }

    return () => {
      terminal.dispose()
    }
  }, [router])

  return (
    <div className="flex justify-center">
      <div ref={terminalRef} />
    </div>
  )
}
