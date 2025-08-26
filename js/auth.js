import { supabase } from './supabaseClient.js'

// Sign up new user
export async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    })
    return { data, error }
}

// Sign in user
export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })
    return { data, error }
}

// Sign out user
export async function signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
}

// Get the current session
export async function getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
}

// Check auth state and redirect if needed
export async function checkAuthState() {
    const { session, error } = await getSession()
    if (!session && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html'
        return false
    }
    return true
}

// Redirect to login page
export function redirectToLogin() {
    window.location.href = 'login.html'
}

// Auth state change listener
supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
        // Clear any user data from localStorage
        localStorage.removeItem('userData')
        // Redirect to login page
        window.location.href = 'login.html'
    } else if (event === 'SIGNED_IN') {
        // Store user data
        if (session?.user) {
            localStorage.setItem('userData', JSON.stringify(session.user))
        }
    }
})
