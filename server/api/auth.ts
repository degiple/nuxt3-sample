// VULNERABLE CODE - FOR CODEQL TESTING ONLY
// This file contains hardcoded credentials and secrets

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}))
  
  // VULNERABILITY: Hardcoded credentials
  const ADMIN_PASSWORD = 'SuperSecret123!'
  const API_KEY = 'sk_live_1234567890abcdef'
  const DATABASE_PASSWORD = 'db_password_2024'
  const JWT_SECRET = 'my-super-secret-jwt-key-do-not-share'
  
  // VULNERABILITY: Hardcoded AWS credentials
  const awsConfig = {
    accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
    secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
    region: 'us-east-1'
  }
  
  // VULNERABILITY: Weak authentication logic
  if (body.username === 'admin' && body.password === ADMIN_PASSWORD) {
    return {
      success: true,
      token: JWT_SECRET,
      apiKey: API_KEY,
      // Information disclosure
      config: awsConfig
    }
  }
  
  // VULNERABILITY: SQL connection string with credentials
  const connectionString = `postgresql://admin:${DATABASE_PASSWORD}@localhost:5432/mydb`
  
  // VULNERABILITY: Private key embedded in code
  const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA1234567890abcdefghijklmnopqrstuvwxyz
-----END RSA PRIVATE KEY-----`
  
  return {
    authenticated: false,
    // Exposing sensitive configuration
    debug: {
      connectionString,
      apiKey: API_KEY,
      hasPrivateKey: privateKey.length > 0
    }
  }
})
