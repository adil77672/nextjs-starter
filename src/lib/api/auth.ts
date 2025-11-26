import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

type SignInData = {
  email: string
  password: string
}

type SignUpData = {
  name: string
  email: string
  password: string
}

type AuthResponse = {
  authenticated: boolean
  user?: {
    id: string
    email: string
    name: string
  }
  message?: string
  error?: string
}

// Sign In Mutation
export function useSignIn() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: SignInData): Promise<AuthResponse> => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Login failed")
      }

      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] })
    },
  })
}

// Sign Up Mutation
export function useSignUp() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: SignUpData): Promise<AuthResponse> => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Registration failed")
      }

      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] })
    },
  })
}

// Sign Out Mutation
export function useSignOut() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (): Promise<void> => {
      const response = await fetch("/api/auth/session", {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Logout failed")
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(["session"], { authenticated: false })
      queryClient.invalidateQueries({ queryKey: ["session"] })
    },
  })
}

// Session Query
export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async (): Promise<AuthResponse> => {
      const response = await fetch("/api/auth/session")
      const data = await response.json()
      return data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Forgot Password Mutation
export function useForgotPassword() {
  return useMutation({
    mutationFn: async (email: string): Promise<{ message: string; demoOtp?: string }> => {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send reset code")
      }

      return result
    },
  })
}

// Verify OTP Mutation
export function useVerifyOtp() {
  return useMutation({
    mutationFn: async (data: { email: string; otp: string }): Promise<{ resetToken: string }> => {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Invalid OTP")
      }

      return result
    },
  })
}

// Reset Password Mutation
export function useResetPassword() {
  return useMutation({
    mutationFn: async (data: {
      resetToken: string
      newPassword: string
    }): Promise<{ message: string }> => {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resetToken: data.resetToken,
          newPassword: data.newPassword,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to reset password")
      }

      return result
    },
  })
}
