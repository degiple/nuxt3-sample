// VULNERABLE CODE - FOR CODEQL TESTING ONLY
// This file contains Path Traversal vulnerability

import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const filename = query.file as string
  
  if (!filename) {
    return { error: 'No filename provided' }
  }
  
  try {
    // Path Traversal vulnerability: no validation of user input
    // Attacker could use: ?file=../../../../etc/passwd
    const filePath = join(process.cwd(), 'public', filename)
    
    // Dangerous: reading file without path validation
    const content = readFileSync(filePath, 'utf-8')
    
    return {
      filename,
      content,
      // Information disclosure
      fullPath: filePath
    }
  } catch (error: any) {
    // Information disclosure: exposing system paths in error messages
    return {
      error: 'Failed to read file',
      message: error.message,
      stack: error.stack
    }
  }
})
