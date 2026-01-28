import { http } from 'uview-pro'
import { ref } from 'vue'

export function useUserApi() {
  const users = ref([])
  const loading = ref(false)

  // 获取用户列表
  const fetchUsers = async () => {
    loading.value = true
    try {
      const res = await http.get<any>('/api/users')
      users.value = res.data
    }
    finally {
      loading.value = false
    }
  }

  // 创建用户
  const createUser = async (data: any) => {
    return await http.post('/api/users', data)
  }

  // 更新用户
  const updateUser = async (id: string, data: any) => {
    return await http.put(`/api/users/${id}`, data)
  }

  // 删除用户
  const deleteUser = async (id: string) => {
    return await http.delete(`/api/users/${id}`)
  }

  return {
    users,
    loading,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  }
}
