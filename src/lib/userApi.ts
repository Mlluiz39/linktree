import { supabase } from './supabase'
import type { DbProfile } from './supabase'

export type CurrentUser = {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string | null
}

// Supabase stores credentials in auth.users; profile extras (name/avatar) live
// in the "profiles" table, related by id (auth.uid()).
export async function fetchCurrentUser(): Promise<CurrentUser> {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autenticado.')

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()
  if (error) throw error

  const profile = data as DbProfile | null
  return {
    id: user.id,
    firstName: profile?.first_name ?? '',
    lastName: profile?.last_name ?? '',
    email: user.email ?? '',
    avatar: profile?.avatar ?? null,
  }
}

export async function updateUser(patch: {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  avatar?: string | null
}): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autenticado.')

  // Profile fields (name/avatar) → "profiles" table (upsert row for this user).
  const profilePatch: Partial<
    Pick<DbProfile, 'first_name' | 'last_name' | 'avatar'>
  > = {}
  if (patch.firstName !== undefined) profilePatch.first_name = patch.firstName
  if (patch.lastName !== undefined) profilePatch.last_name = patch.lastName
  if (patch.avatar !== undefined) profilePatch.avatar = patch.avatar

  if (Object.keys(profilePatch).length > 0) {
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, ...profilePatch })
    if (error) throw error
  }

  // Auth fields (email/password) → Supabase Auth.
  if (patch.email !== undefined && patch.email !== user.email) {
    const { error } = await supabase.auth.updateUser({ email: patch.email })
    if (error) throw error
  }
  if (patch.password !== undefined && patch.password !== '') {
    const { error } = await supabase.auth.updateUser({
      password: patch.password,
    })
    if (error) throw error
  }
}
