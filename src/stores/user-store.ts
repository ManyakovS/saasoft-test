import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { User } from '@/types'

export const useUserStore = defineStore('userStore', () => {
  const savedUsers = localStorage.getItem('users')
  const users = ref<User[]>(savedUsers ? JSON.parse(savedUsers) : [])

  watch(users, (newUsers) => {
    const usersToSave = newUsers.filter(user => user.login && user.login.trim() !== '')
    if (usersToSave.length > 0) {
      localStorage.setItem('users', JSON.stringify(usersToSave))
    } else {
      localStorage.removeItem('users')
    }
  }, { deep: true })

  const createEmptyUser = (): User => ({
    tempId: crypto.randomUUID(),
    login: '',
    password: null,
    type: 'LDAP',
    marks: []
  })

  const addEmptyUser = () => {
    users.value.push(createEmptyUser())
  }

  const updateUser = (id: string, updatedData: User) => {
    const index = users.value.findIndex(u => u.tempId === id)
    if (index !== -1) {
      users.value[index] = { ...updatedData, tempId: id }
    }
  }

  const deleteUser = (id: string) => {
    users.value = users.value.filter(u => u.tempId !== id)
  }

  return {
    users,
    addEmptyUser,
    updateUser,
    deleteUser
  }
})
