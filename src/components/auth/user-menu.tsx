'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-auth'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'

interface UserMenuProps {
  locale: string
}

export function UserMenu({ locale }: UserMenuProps) {
  const { user } = useAuth()
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push(`/${locale}/sign-in`)
    router.refresh()
  }

  if (!user) return null

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm">{user.email}</span>
      <Button onClick={handleSignOut} variant="outline" size="sm">
        Sign Out
      </Button>
    </div>
  )
}
