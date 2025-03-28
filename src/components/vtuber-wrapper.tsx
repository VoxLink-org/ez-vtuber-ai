"use client"

import { useState, useEffect } from "react"
import VTuberAvatar from "./vtuber-avatar"
import FallbackAvatar from "./fallback-avatar"

export default function VTuberWrapper() {
  const [useFallback, setUseFallback] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if Live2D libraries are available
    const checkLibraries = () => {
      if (typeof window === "undefined") return false

      // Check if our onLoad callback has fired
      if (window.live2dLoaded) {
        return true
      }

      // Check if the required libraries are loaded
      const hasPixi = !!window.PIXI
      const hasLive2D = hasPixi && !!window.PIXI.live2d
      const hasCubismCore = !!window.Live2DCubismCore

      if (!hasPixi || !hasLive2D || !hasCubismCore) {
        console.warn("Live2D libraries not fully loaded, using fallback avatar")
        return false
      }

      return true
    }

    // Try to check immediately
    let librariesLoaded = checkLibraries()
    if (librariesLoaded) {
      setUseFallback(false)
      setIsLoading(false)
      return
    }

    // If not loaded yet, set up a polling mechanism
    const checkInterval = setInterval(() => {
      librariesLoaded = checkLibraries()
      if (librariesLoaded) {
        setUseFallback(false)
        setIsLoading(false)
        clearInterval(checkInterval)
      }
    }, 500)

    // After a timeout, give up and use fallback
    const timeoutId = setTimeout(() => {
      if (!librariesLoaded) {
        console.error("Timed out waiting for Live2D libraries")
        setUseFallback(true)
        setIsLoading(false)
        clearInterval(checkInterval)
      }
    }, 5000)

    return () => {
      clearInterval(checkInterval)
      clearTimeout(timeoutId)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg w-[300px] h-[400px]">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-muted-foreground">Loading VTuber...</p>
      </div>
    )
  }

  return useFallback ? <FallbackAvatar /> : <VTuberAvatar />
}

