import { getDatabase, ref, set } from 'firebase/database'

export const addUser = async (userId, name, email) => {
  try {
    const db = getDatabase()
    const userRef = ref(db, `Users/${userId}`)
    await set(userRef, { name, email })
    console.log('User added successfully')
  } catch (error) {
    console.error('Error adding user:', error)
  }
}
