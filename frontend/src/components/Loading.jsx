import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Loading = () => {
  const { nextUrl } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (nextUrl) {
      const timer = setTimeout(() => {
        navigate('/' + nextUrl)
      }, 8000)

      return () => clearTimeout(timer)
    }
  }, [nextUrl, navigate])

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] opacity-80 blur-2xl" />
      
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-primary border-gray-600 shadow-lg"></div>

      <h2 className="mt-6 text-xl font-semibold text-white animate-pulse">Please wait...</h2>
      <p className="text-sm text-gray-400 mt-2">
        We are preparing something awesome for you.
      </p>

      {nextUrl && (
        <p className="text-xs text-gray-500 mt-4">
          Redirecting to <span className="text-primary font-medium">/{nextUrl}</span> in 8 seconds
        </p>
      )}
    </div>
  )
}

export default Loading
