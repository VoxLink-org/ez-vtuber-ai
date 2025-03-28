"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, Send, RefreshCw } from "lucide-react"
import VTuberAvatar from "./vtuber-avatar"

export default function DemoSection() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Hello! I'm Lumi, your AI VTuber assistant. How can I help you today?" },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: inputValue }])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI thinking
    setTimeout(() => {
      // Mock responses based on user input
      let response = "I'm not sure how to respond to that. Can you try asking something else?"

      const lowerInput = inputValue.toLowerCase()
      if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        response = "Hello there! It's great to meet you! How's your day going?"
      } else if (lowerInput.includes("how are you") || lowerInput.includes("how's it going")) {
        response = "I'm doing fantastic! As a VTuber, I'm always excited to chat with viewers like you!"
      } else if (lowerInput.includes("game") || lowerInput.includes("play")) {
        response = "I love gaming! My favorites are RPGs and rhythm games. What do you enjoy playing?"
      } else if (lowerInput.includes("sing") || lowerInput.includes("music")) {
        response = "I do enjoy singing! Would you like me to recommend some songs I've been practicing?"
      } else if (lowerInput.includes("thank")) {
        response = "You're very welcome! I'm happy I could help!"
      }

      // Add AI response
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsLoading(false)

      // Scroll to bottom
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleRecording = () => {
    setIsRecording((prev) => !prev)

    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setInputValue("Hello, can you tell me about yourself?")
        setIsRecording(false)
      }, 2000)
    }
  }

  const resetChat = () => {
    setMessages([
      { role: "assistant", content: "Hello! I'm Lumi, your AI VTuber assistant. How can I help you today?" },
    ])
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex justify-center">
        <VTuberAvatar />
      </div>

      <div className="flex flex-col bg-background rounded-xl shadow-lg overflow-hidden border">
        <div className="p-4 border-b bg-muted/40">
          <Tabs defaultValue="chat">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="mt-0">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Chat with Lumi</h3>
                <Button variant="ghost" size="sm" onClick={resetChat}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="settings" className="mt-0">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Avatar Settings</h3>
                <p className="text-sm text-muted-foreground">Customize your VTuber experience</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex-1 overflow-y-auto p-4 h-[300px]">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user" ? "bg-purple-600 text-white" : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                  <div className="flex space-x-2">
                    <div
                      className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Button variant={isRecording ? "destructive" : "outline"} size="icon" onClick={toggleRecording}>
              <Mic className="h-4 w-4" />
            </Button>
            <Textarea
              placeholder="Type a message..."
              className="min-h-[40px] resize-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

