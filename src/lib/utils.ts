import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import path from 'path'
import fs from 'fs'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getUploadRoot() {
  const envPath = process.env.UPLOAD_ROOT

  // Jika env diset → pakai
  if (envPath) {
    return path.isAbsolute(envPath)
      ? envPath
      : path.join(process.cwd(), envPath)
  }

  // Fallback aman (DEV)
  return path.join(process.cwd(), 'public/uploads')
}