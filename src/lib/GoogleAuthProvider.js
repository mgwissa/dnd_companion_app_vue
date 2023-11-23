import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

export const useAuth = () => {
  const auth = getAuth()

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()

    try {
      const result = await signInWithPopup(auth, provider)
      return result.user
    } catch (error) {
      console.error(error)
    }
  }

  return {
    loginWithGoogle
  }
}
