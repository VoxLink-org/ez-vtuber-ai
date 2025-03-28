"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react"

export default function FallbackAvatar() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentEmotion, setCurrentEmotion] = useState("neutral")
  const [transcript, setTranscript] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  // Mock emotions with different colors
  const emotions = {
    neutral: "#9333ea", // purple
    happy: "#ec4899", // pink
    excited: "#f97316", // orange
    thinking: "#3b82f6", // blue
    surprised: "#facc15", // yellow
  }

  // Animation variables
  const avatarSize = 300
  const eyeSize = 15
  const mouthWidth = 60
  const mouthHeight = 30

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = avatarSize
    canvas.height = avatarSize

    // Start animation loop
    const animate = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw avatar face (circle)
      ctx.beginPath()
      ctx.arc(avatarSize / 2, avatarSize / 2, avatarSize / 2.5, 0, Math.PI * 2)
      ctx.fillStyle = emotions[currentEmotion as keyof typeof emotions]
      ctx.fill()

      // Draw eyes
      const eyeY = avatarSize / 2 - 20
      const leftEyeX = avatarSize / 2 - 40
      const rightEyeX = avatarSize / 2 + 40

      // Blinking animation
      const now = Date.now()
      const blinkInterval = 3000 // Blink every 3 seconds
      const blinkDuration = 200 // Blink lasts 200ms
      const shouldBlink = now % blinkInterval < blinkDuration

      if (shouldBlink) {
        // Closed eyes (blinking)
        ctx.beginPath()
        ctx.moveTo(leftEyeX - eyeSize, eyeY)
        ctx.lineTo(leftEyeX + eyeSize, eyeY)
        ctx.strokeStyle = "white"
        ctx.lineWidth = 3
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(rightEyeX - eyeSize, eyeY)
        ctx.lineTo(rightEyeX + eyeSize, eyeY)
        ctx.strokeStyle = "white"
        ctx.lineWidth = 3
        ctx.stroke()
      } else {
        // Open eyes
        ctx.beginPath()
        ctx.arc(leftEyeX, eyeY, eyeSize, 0, Math.PI * 2)
        ctx.fillStyle = "white"
        ctx.fill()

        ctx.beginPath()
        ctx.arc(rightEyeX, eyeY, eyeSize, 0, Math.PI * 2)
        ctx.fillStyle = "white"
        ctx.fill()
      }

      // Draw mouth based on speaking state
      const mouthY = avatarSize / 2 + 40

      if (isSpeaking) {
        // Speaking mouth (oval that changes size)
        const mouthOpenAmount = Math.sin(Date.now() / 100) * 10 + 20
        ctx.beginPath()
        ctx.ellipse(avatarSize / 2, mouthY, mouthWidth / 2, mouthOpenAmount, 0, 0, Math.PI * 2)
        ctx.fillStyle = "white"
        ctx.fill()
      } else {
        // Closed mouth (smile or neutral line based on emotion)
        ctx.beginPath()
        if (currentEmotion === "happy" || currentEmotion === "excited") {
          // Smile
          ctx.arc(avatarSize / 2, mouthY - 10, mouthWidth / 2, 0, Math.PI)
        } else {
          // Neutral line
          ctx.moveTo(avatarSize / 2 - mouthWidth / 2, mouthY)
          ctx.lineTo(avatarSize / 2 + mouthWidth / 2, mouthY)
        }
        ctx.strokeStyle = "white"
        ctx.lineWidth = 3
        ctx.stroke()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [currentEmotion, isSpeaking])

  // Mock voice recognition
  const toggleListening = () => {
    setIsListening((prev) => !prev)

    if (!isListening) {
      // Simulate voice recognition with random phrases
      const mockPhrases = [
        "Hello! How are you today?",
        "I'm excited to be streaming!",
        "Thanks for watching my stream",
        "What games should we play next?",
        "Don't forget to subscribe!",
      ]

      const mockEmotions = ["neutral", "happy", "excited", "thinking", "surprised"]

      // Simulate transcription and emotion changes
      const transcriptionInterval = setInterval(() => {
        const randomPhrase = mockPhrases[Math.floor(Math.random() * mockPhrases.length)]
        const randomEmotion = mockEmotions[Math.floor(Math.random() * mockEmotions.length)]

        setTranscript(randomPhrase)
        setCurrentEmotion(randomEmotion)

        // Simulate speaking
        setIsSpeaking(true)
        setTimeout(() => setIsSpeaking(false), 2000)
      }, 4000)

      // Store interval ID for cleanup
      return () => clearInterval(transcriptionInterval)
    }
  }

  // Toggle speaking
  const toggleSpeaking = () => {
    setIsSpeaking((prev) => !prev)
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={avatarSize}
          height={avatarSize}
          className="rounded-full border-4 border-purple-200 dark:border-purple-900"
        />
        <div className="absolute bottom-2 left-2 bg-black/20 backdrop-blur-sm p-2 rounded-full">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-xl font-bold">Lumi (Fallback)</h3>
        <p className="text-sm text-muted-foreground">Canvas VTuber</p>
        <p className="text-xs text-amber-500 mt-1">Live2D failed to load, using fallback</p>
      </div>

      {transcript && (
        <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg max-w-xs">
          <p className="text-sm">{transcript}</p>
        </div>
      )}

      <div className="flex space-x-2">
        <Button size="sm" variant={isListening ? "destructive" : "default"} onClick={toggleListening}>
          {isListening ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
          {isListening ? "Stop" : "Listen"}
        </Button>
        <Button size="sm" variant={isSpeaking ? "destructive" : "default"} onClick={toggleSpeaking}>
          {isSpeaking ? <VolumeX className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />}
          {isSpeaking ? "Mute" : "Speak"}
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {Object.keys(emotions).map((emotion) => (
          <Button
            key={emotion}
            size="sm"
            variant="outline"
            className={`capitalize ${currentEmotion === emotion ? "ring-2 ring-purple-500" : ""}`}
            onClick={() => setCurrentEmotion(emotion)}
          >
            {emotion}
          </Button>
        ))}
      </div>
    </div>
  )
}

