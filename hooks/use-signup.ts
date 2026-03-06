import { useState } from 'react'

interface SignupData {
  email: string
  signup_type: 'debtor' | 'counselor' | 'lender'
  full_name?: string
  certification?: string
  specializations?: string
  experience?: string
  reason_for_joining?: string
}

interface SignupResponse {
  success: boolean
  message: string
  error?: string
}

export function useSignup() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signup = async (data: SignupData): Promise<SignupResponse> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/signups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        const errorMessage = result.error || 'Failed to save signup'
        setError(errorMessage)
        return {
          success: false,
          message: errorMessage,
          error: errorMessage,
        }
      }

      return {
        success: true,
        message: 'Successfully saved your signup!',
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      return {
        success: false,
        message: errorMessage,
        error: errorMessage,
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}
