const USER_KEY = 'user'
// 从本地存储中获取用户
export const getUser = () => JSON.parse(window.localStorage.getItem(USER_KEY))

// 从本地存储中删除用户
export const removeUser = () => window.localStorage.removeItem(USER_KEY)

// 从本地存储中设置用户
export const setUser = (data) => JSON.stringify(USER_KEY, window.localStorage.setItem(data))
