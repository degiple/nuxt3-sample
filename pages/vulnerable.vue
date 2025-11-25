<script setup lang="ts">
// VULNERABLE CODE - FOR CODEQL TESTING ONLY
// This file contains XSS (Cross-Site Scripting) vulnerabilities

useHead({ title: 'Vulnerable Page - XSS Test' })

const route = useRoute()
const userInput = ref('')
const displayHtml = ref('')

// XSS vulnerability: using v-html with unsanitized user input
const handleSubmit = () => {
  // Directly setting user input to innerHTML (dangerous)
  displayHtml.value = userInput.value
}

// XSS vulnerability: reading from URL query without sanitization
const messageFromUrl = route.query.message as string || ''

// Dangerous: eval usage
const executeCode = (code: string) => {
  try {
    // Code injection vulnerability
    eval(code)
  } catch (e) {
    console.error('Error executing code:', e)
  }
}

// Dangerous: innerHTML manipulation
onMounted(() => {
  if (messageFromUrl) {
    const el = document.getElementById('message-display')
    if (el) {
      // XSS vulnerability: setting innerHTML from URL parameter
      el.innerHTML = messageFromUrl
    }
  }
})
</script>

<template>
  <div class="vulnerable-page">
    <h1>Vulnerable Page (XSS Test)</h1>
    <p class="warning">⚠️ This page contains intentional security vulnerabilities for CodeQL testing</p>
    
    <div class="section">
      <h2>XSS Vulnerability #1: v-html with user input</h2>
      <input v-model="userInput" placeholder="Enter HTML content">
      <button @click="handleSubmit">Submit</button>
      <!-- Dangerous: v-html with unsanitized user input -->
      <div v-html="displayHtml" class="output"></div>
    </div>

    <div class="section">
      <h2>XSS Vulnerability #2: URL parameter injection</h2>
      <p>Check URL parameter: ?message=&lt;script&gt;alert('XSS')&lt;/script&gt;</p>
      <div id="message-display" class="output"></div>
    </div>

    <div class="section">
      <h2>Code Injection: eval usage</h2>
      <button @click="executeCode(userInput)">Execute Code (Dangerous!)</button>
    </div>

    <nuxt-link to="/">Back to Home</nuxt-link>
  </div>
</template>

<style scoped>
.vulnerable-page {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.warning {
  color: red;
  font-weight: bold;
  padding: 1rem;
  background-color: #fff3cd;
  border: 2px solid #ffc107;
  border-radius: 4px;
}

.section {
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.output {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  min-height: 50px;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
}

button {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #c82333;
}
</style>
