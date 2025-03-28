import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStarted(hash: string = '') {
  window.open('https://github.com/VoxLink-org/ez-vtuber-ai#'+hash, '_blank')
}
