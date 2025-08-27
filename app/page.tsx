"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const BIRTHDAY_DATA = {
  NAME: "CODY",
  SHORT_MESSAGE: "Hope your day is filled with joy and code!",
}

interface TerminalLine {
  type: "input" | "output" | "error" | "system"
  content: string
  timestamp?: string
}

const SQL_COMMANDS = {
  "SELECT * FROM wishes;": "wishes_table",
  "SELECT * FROM cake;": "cake_scene",
  "COMMIT;": "final_celebration",
}

export default function CyberpunkBirthdayTerminal() {
  const [currentPhase, setCurrentPhase] = useState<"boot" | "login" | "terminal">("boot")
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isTyping, setIsTyping] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  const [currentScene, setCurrentScene] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentPhase === "boot") {
      const bootSequence = [
        "INITIALIZING BIRTHDAY DATABASE...",
        "LOADING CYBERPUNK PROTOCOLS...",
        "SCANNING FOR PARTY MODULES...",
        "CONNECTING TO CELEBRATION NETWORK...",
        `DB://BIRTHDAY_${BIRTHDAY_DATA.NAME.toUpperCase()} READY`,
        "",
        "SYSTEM ONLINE - ENTER LOGIN CREDENTIALS",
      ]

      let index = 0
      const bootInterval = setInterval(() => {
        if (index < bootSequence.length) {
          setTerminalLines((prev) => [
            ...prev,
            {
              type: "system",
              content: bootSequence[index],
              timestamp: new Date().toLocaleTimeString(),
            },
          ])
          index++
        } else {
          clearInterval(bootInterval)
          setTimeout(() => setCurrentPhase("login"), 1000)
        }
      }, 500)

      return () => clearInterval(bootInterval)
    }
  }, [currentPhase])

  useEffect(() => {
    if (currentPhase === "login") {
      setTerminalLines((prev) => [
        ...prev,
        { type: "system", content: "", timestamp: "" },
        { type: "system", content: "> IT'S YOUR BIRTHDAY!", timestamp: new Date().toLocaleTimeString() },
        {
          type: "system",
          content: '> HINT: Try "help" to begin',
          timestamp: new Date().toLocaleTimeString(),
        },
        { type: "input", content: "birthday_db> ", timestamp: "" },
      ])
      setCurrentPhase("terminal")
    }
  }, [currentPhase])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalLines])

  useEffect(() => {
    if (inputRef.current && currentPhase === "terminal") {
      inputRef.current.focus()
    }
  }, [currentPhase])

  const executeCommand = (command: string) => {
    const trimmedCommand = command.trim()

    if (trimmedCommand && !commandHistory.includes(trimmedCommand)) {
      setCommandHistory((prev) => [...prev, trimmedCommand])
    }

    setTerminalLines((prev) => [
      ...prev,
      {
        type: "input",
        content: `birthday_db> ${trimmedCommand}`,
        timestamp: new Date().toLocaleTimeString(),
      },
    ])

    if (SQL_COMMANDS[trimmedCommand as keyof typeof SQL_COMMANDS]) {
      const sceneType = SQL_COMMANDS[trimmedCommand as keyof typeof SQL_COMMANDS]
      executeScene(sceneType, trimmedCommand)
    } else if (trimmedCommand.toLowerCase() === "help") {
      showHelp()
    } else if (trimmedCommand.toLowerCase() === "clear") {
      setTerminalLines([])
    } else if (trimmedCommand) {
      addOutput(`ERROR: Unknown command "${trimmedCommand}"`, "error")
      addOutput('Type "help" for available commands', "system")
    }

    setCurrentInput("")
    setHistoryIndex(-1)
  }

  const executeScene = (sceneType: string, command: string) => {
    setCurrentScene(sceneType)
    setIsTyping(true)

    switch (sceneType) {
      case "wishes_table":
        setTimeout(() => {
          addOutput("┌─────────────────────────────────────────┐")
          addOutput("│ WISHES TABLE                            │")
          addOutput("├─────────────────────────────────────────┤")
          addOutput("│ ID │ WISH                               │")
          addOutput("├─────────────────────────────────────────┤")
          addOutput("│ 1  │ Happy Birthday!                    │")
          addOutput("│ 2  │ May all your dreams come true      │")
          addOutput("│ 3  │ Another year of awesome!           │")
          addOutput("│ 4  │ Celebrate like there's no tomorrow │")
          addOutput("└─────────────────────────────────────────┘")
          addOutput("✨ 4 rows returned")
          setIsTyping(false)
        }, 1000)
        break

      case "cake_scene":
        setTimeout(() => {
          addOutput("🎂 SPAWNING MASSIVE VOXEL CAKE...")
          addOutput("                🕯️🕯️🕯️")
          addOutput("         ┌─────────────────────┐")
          addOutput("         │ ░░░░░░░░░░░░░░░░░░░ │")
          addOutput("         │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │")
          addOutput("         │ ░░░░░░░░░░░░░░░░░░░ │")
          addOutput("         │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │")
          addOutput("         │ ░░░░░░░░░░░░░░░░░░░ │")
          addOutput("         └─────────────────────┘")
          addOutput("      ┌─────────────────────────────┐")
          addOutput("      │ ████████████████████████████ │")
          addOutput("      │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │")
          addOutput("      │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │")
          addOutput("      │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │")
          addOutput("      │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │")
          addOutput("      └─────────────────────────────┘")
          addOutput("🔥 Triple candle flame shader activated!")
          addOutput("🎉 MEGA CAKE DEPLOYED! Size: ENORMOUS!")
          setShowParticles(true)
          setTimeout(() => setShowParticles(false), 3000)
          setIsTyping(false)
        }, 1000)
        break

      case "final_celebration":
        setTimeout(() => {
          addOutput("🚀 COMMITTING BIRTHDAY TRANSACTION...")
          addOutput("")
          addOutput("██╗  ██╗ █████╗ ██████╗ ██████╗ ██╗   ██╗")
          addOutput("██║  ██║██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝")
          addOutput("███████║███████║██████╔╝██████╔╝ ╚████╔╝ ")
          addOutput("██╔══██║██╔══██║██╔═══╝ ██╔═══╝   ╚██╔╝  ")
          addOutput("██║  ██║██║  ██║██║     ██║        ██║   ")
          addOutput("╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝        ╚═╝   ")
          addOutput("")
          addOutput("██████╗ ██╗██████╗ ████████╗██╗  ██╗██████╗  █████╗ ██╗   ██╗")
          addOutput("██╔══██╗██║██╔══██╗╚══██╔══╝██║  ██║██╔══██╗██╔══██╗╚██╗ ██╔╝")
          addOutput("██████╔╝██║██████╔╝   ██║   ███████║██║  ██║███████║ ╚████╔╝ ")
          addOutput("██╔══██╗██║██╔══██╗   ██║   ██╔══██║██║  ██║██╔══██║  ╚██╔╝  ")
          addOutput("██████╔╝██║██║  ██║   ██║   ██║  ██║██████╔╝██║  ██║   ██║   ")
          addOutput("╚═════╝ ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝   ╚═╝   ")
          addOutput("")
          addOutput(`🎉 ${BIRTHDAY_DATA.NAME.toUpperCase()}! 🎉`)
          addOutput("")
          addOutput("🎆 FIREWORKS SEQUENCE INITIATED 🎆")
          addOutput("💫 BIRTHDAY TRANSACTION COMMITTED SUCCESSFULLY 💫")
          addOutput(`💝 ${BIRTHDAY_DATA.SHORT_MESSAGE}`)
          setShowParticles(true)
          setIsTyping(false)
        }, 1500)
        break

      default:
        addOutput("Command executed successfully!")
        setIsTyping(false)
    }
  }

  const showHelp = () => {
    addOutput("🔧 AVAILABLE SQL COMMANDS:")
    addOutput("┌─────────────────────────────────────────┐")
    addOutput("│ COMMAND                    │ EFFECT      │")
    addOutput("├─────────────────────────────────────────┤")
    addOutput("│ SELECT * FROM wishes;      │ Show wishes │")
    addOutput("│ SELECT * FROM cake;        │ Spawn cake  │")
    addOutput("│ COMMIT;                    │ Final scene │")
    addOutput("├─────────────────────────────────────────┤")
    addOutput("│ help, clear                │ Utilities   │")
    addOutput("└─────────────────────────────────────────┘")
    addOutput("💡 Use ↑/↓ arrows for command history")
  }

  const addOutput = (content: string, type: "output" | "error" | "system" = "output") => {
    setTerminalLines((prev) => [
      ...prev,
      {
        type,
        content,
        timestamp: new Date().toLocaleTimeString(),
      },
    ])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(currentInput)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setCurrentInput("")
        } else {
          setHistoryIndex(newIndex)
          setCurrentInput(commandHistory[newIndex])
        }
      }
    }
  }

  if (currentPhase === "boot") {
    return (
      <div className="min-h-screen bg-background text-foreground p-4 font-mono">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-4xl font-bold neon-glow glitch-text" data-text="DB://BIRTHDAY_TERMINAL">
              DB://BIRTHDAY_TERMINAL
            </h1>
          </div>
          <div className="space-y-2">
            {terminalLines.map((line, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs">{line.timestamp}</span>
                <span className={`${line.type === "system" ? "text-accent" : "text-foreground"}`}>{line.content}</span>
              </div>
            ))}
            <div className="terminal-cursor text-primary">█</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-primary text-xs matrix-rain"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j} className="mb-2">
                {Math.random() > 0.5 ? "1" : "0"}
              </div>
            ))}
          </div>
        ))}
      </div>

      {showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-secondary animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 p-4 h-screen flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg md:text-2xl font-bold neon-glow">DB://BIRTHDAY_{BIRTHDAY_DATA.NAME.toUpperCase()}</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => showHelp()} className="text-xs">
              HELP
            </Button>
          </div>
        </div>

        <div ref={terminalRef} className="flex-1 overflow-y-auto space-y-1 mb-4 font-mono text-sm">
          {terminalLines.map((line, index) => (
            <div key={index} className="flex gap-2">
              <span className="text-muted-foreground text-xs w-20 flex-shrink-0">{line.timestamp}</span>
              <span
                className={`
                ${line.type === "input" ? "text-primary" : ""}
                ${line.type === "output" ? "text-foreground" : ""}
                ${line.type === "error" ? "text-destructive" : ""}
                ${line.type === "system" ? "text-accent" : ""}
                whitespace-pre-wrap
              `}
              >
                {line.content}
              </span>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2">
              <span className="text-muted-foreground text-xs w-20 flex-shrink-0">
                {new Date().toLocaleTimeString()}
              </span>
              <span className="text-foreground">
                Processing<span className="terminal-cursor">█</span>
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 bg-muted p-2 rounded pixel-border">
          <span className="text-primary font-bold">birthday_db&gt;</span>
          <Input
            ref={inputRef}
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none focus:ring-0 text-foreground font-mono"
            placeholder="Enter SQL command..."
            disabled={isTyping}
          />
          <span className="terminal-cursor text-primary">█</span>
        </div>

        <div className="mt-2 text-xs text-muted-foreground flex justify-between">
          <span>Connected to BIRTHDAY_DB | Status: ONLINE</span>
        </div>
      </div>
    </div>
  )
}
