// VULNERABLE CODE - FOR CODEQL TESTING ONLY
// This file contains SQL Injection vulnerability

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const userId = query.id as string
  
  // SQL Injection vulnerability: direct string concatenation
  const sqlQuery = `SELECT * FROM users WHERE id = '${userId}'`
  
  // Simulated database query (dangerous pattern)
  console.log('Executing query:', sqlQuery)
  
  // Another vulnerable pattern with POST body
  const body = await readBody(event).catch(() => ({}))
  if (body.username) {
    const searchQuery = `SELECT * FROM users WHERE username = '${body.username}' AND password = '${body.password}'`
    console.log('Search query:', searchQuery)
  }
  
  return {
    message: 'User data retrieved',
    query: sqlQuery,
    // Exposing sensitive information
    internal_debug: process.env.DATABASE_URL
  }
})
