import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Landing from './components/Landing'
import DecisionInput from './components/DecisionInput'
import LoadingScreen from './components/LoadingScreen'
import Result from './components/Result'
import './App.css'

export default function App() {
  const [screen, setScreen] = useState('intro') // 'intro' | 'decision' | 'loading' | 'result'
  const [decision, setDecision] = useState('')
  const [environment, setEnvironment] = useState('Village')
  const [resultData, setResultData] = useState(null)
  const [apiError, setApiError] = useState('')

  // Scan handler
  const handleScan = async (selectedDecision, selectedEnv) => {
    setDecision(selectedDecision)
    setEnvironment(selectedEnv)
    setApiError('')
    setScreen('loading')

    const payload = {
      decision: selectedDecision,
      environment: selectedEnv
    }

    const apiBaseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

    try {
      const response = await fetch(`${apiBaseUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        let errorMessage = `Server returned status: ${response.status}`
        try {
          const errorData = await response.json()
          if (errorData.details || errorData.error) {
            errorMessage = errorData.details || errorData.error
          }
        } catch {
          // Keep the HTTP status when the server did not return JSON.
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      
      // Delay slightly so user can enjoy scanning messages
      setTimeout(() => {
        setResultData(data)
        setScreen('result')
      }, 2600)

    } catch (err) {
      console.warn('Backend connection issue', err)
      setApiError(err.message || 'Unable to connect to the prediction service.')
      setScreen('decision')
    }
  }

  // Reset handler (Requirement 20)
  const handleReset = () => {
    setDecision('')
    setEnvironment('Village')
    setResultData(null)
    setScreen('decision')
  }

  return (
    <div className="w-full min-h-screen relative font-sans overflow-x-hidden">
      <AnimatePresence mode="wait">
        {screen === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Landing onStart={() => setScreen('decision')} />
          </motion.div>
        )}

        {screen === 'decision' && (
          <motion.div
            key="decision"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
          >
            <DecisionInput
              onScan={handleScan}
              onBack={() => setScreen('intro')}
              apiError={apiError}
            />
          </motion.div>
        )}

        {screen === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <LoadingScreen
              decision={decision}
              environment={environment}
            />
          </motion.div>
        )}

        {screen === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Result
              data={resultData}
              onReset={handleReset}
              onBackToInput={() => setScreen('decision')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
