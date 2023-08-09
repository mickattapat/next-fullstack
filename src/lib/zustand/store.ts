import { IUser } from '@/app/model/user.interface'
import { Session } from 'next-auth'
import { create } from 'zustand'



interface AuthState {
  userProfile: IUser | null
  setUserProfile: (profile: IUser) => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  userProfile: null,
  setUserProfile: (profile: IUser) => set(() => ({ userProfile: profile })),
}))