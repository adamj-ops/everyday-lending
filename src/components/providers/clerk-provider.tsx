'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'

interface ClerkProviderWrapperProps {
  children: ReactNode
  appearance?: any
  localization?: any
  signInUrl?: string
  signUpUrl?: string
  signInFallbackRedirectUrl?: string
  signUpFallbackRedirectUrl?: string
  afterSignOutUrl?: string
}

export function ClerkProviderWrapper({ 
  children, 
  appearance,
  localization,
  signInUrl,
  signUpUrl,
  signInFallbackRedirectUrl,
  signUpFallbackRedirectUrl,
  afterSignOutUrl
}: ClerkProviderWrapperProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  
  // Check if we have a valid Clerk key (not the demo key)
  const hasValidClerkKey = publishableKey && 
    publishableKey !== 'pk_test_demo_key_for_development' &&
    publishableKey.startsWith('pk_')
  
  if (!hasValidClerkKey) {
    // If no valid Clerk key, render children without Clerk
    console.warn('Clerk authentication disabled: Invalid or missing publishable key')
    return <>{children}</>
  }
  
  return (
    <ClerkProvider
      appearance={appearance}
      localization={localization}
      signInUrl={signInUrl}
      signUpUrl={signUpUrl}
      signInFallbackRedirectUrl={signInFallbackRedirectUrl}
      signUpFallbackRedirectUrl={signUpFallbackRedirectUrl}
      afterSignOutUrl={afterSignOutUrl}
    >
      {children}
    </ClerkProvider>
  )
}
