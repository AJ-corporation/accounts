import {
  loadFromFirestore,
  loadFromFirestoreWhere,
} from '../../js/db/firebase/firebaseFirestore'
import { loadFromLocalStorage } from '../../js/db/local/localStorage'

export async function isUsernameAvailable(username) {
  const usersData = await getUserDataByUsername(username)

  return usersData && usersData?.length === 0
}

export async function getNewId() {
  const id = (await loadFromFirestore('accounts', '_about')).amount
  return id + 1
}

export async function getUserDataByUsername(username) {
  const usersData = await loadFromFirestoreWhere('accounts', [
    'user.username',
    '==',
    username,
  ])

  return usersData
}

export function isUserLoggedIn(id) {
  const { accounts } = loadFromLocalStorage('aj-accounts').accounts
  return accounts.includes(id)
}
