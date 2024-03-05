'use client'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const terminal = new XtermTerminal(XtermTerinalOptions)
    const fitAddon = new FitAddon()
    const webLinksAddon = new WebLinksAddon()
    terminal.loadAddon(fitAddon)
    terminal.loadAddon(webLinksAddon)
    fitAddon.fit()

    let currentDir = '~'
    const promptStr = (dir?: string) => `guest@jiwonchoi.dev ${dir ?? '~'} % `
    const promptStrLen = promptStr.length

    const homeDir = [
      'biography',
      'blog',
      'projects',
      // 'README.md',
      // 'resume.pdf',
      'socials',
    ]
    const innerDirs: Record<string, string[]> = {
      biography: ['index.html'],
      // TODO: fetch blog posts
      blog: ['index.html'],
      // TODO: fetch projects
      projects: ['index.html'],
      socials: ['github.md', 'gmail.md', 'linkedin.md', 'twitter.md'],
    }
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

    const initPropmt = () => {
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
          initPropmt()
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
          if (currentDir in innerDirs) {
            terminal.write(innerDirs[currentDir].join('    '))
            prompt()
          } else {
            terminal.write(homeDir.join('    '))
            prompt()
          }
        },
      },
      whoami: {
        f: () => {
          // TODO: cheer up the user
          terminal.writeln('guest')
          prompt()
        },
      },
      cd: {
        f: (dir: string) => {
          // move to the given directory
          if (dir in innerDirs) {
            // innerDirs[dir]
            currentDir = dir
            prompt({ dir, lineBreak: false })
          }
        },
      },
      open: {
        f: (file: string) => {
          if (innerDirs[currentDir].includes(file)) {
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
        // Tab
        case '\u0009':
          // tab completion
          const lastWord = command.split(' ').pop()

          if (lastWord) {
            let dir = homeDir
            if (currentDir in innerDirs) {
              dir = innerDirs[currentDir]
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
