import { supabase } from './supabaseClient.js'

// Get user session
export async function getSession() {
    try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        return session
    } catch (error) {
        console.error('Error getting session:', error)
        return null
    }
}

// Update user profile
export async function updateProfile(profile) {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .upsert(profile)
        if (error) throw error
        return data
    } catch (error) {
        console.error('Error updating profile:', error)
        return null
    }
}

// Get user profile
export async function getProfile() {
    try {
        const session = await getSession()
        if (!session) return null

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error getting profile:', error)
        return null
    }
}

// Update user settings
export async function updateSettings(settings) {
    try {
        const session = await getSession()
        if (!session) return null

        const { data, error } = await supabase
            .from('user_settings')
            .upsert({
                user_id: session.user.id,
                ...settings
            })
        if (error) throw error
        return data
    } catch (error) {
        console.error('Error updating settings:', error)
        return null
    }
}
