import { create } from 'zustand'

const useUserStore = create((set) => ({
    isLogin: false,
    user: {},
    setUser: (input) => set((state) => {
        return {
            isLogin: true,
            user: input
        }
    }),
    clearUser: () => set({ isLogin:false, user: null }),
    logUserInfo: () => ((state)=>{
        console.log('isLogin:', state.isLogin);
        console.log('user:', state.user);
    })
}))

export {useUserStore}