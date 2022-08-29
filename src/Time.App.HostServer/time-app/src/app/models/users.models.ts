export class User {
    email: string
    role: string
    userKey: string
    name: string
    isAdmin: boolean
    userId: number
    canSeeSameLevel: boolean
    canSeeUnderLevel: boolean
    canSeeOverLevel: boolean
    canModifySameLevel: boolean
    canModifyUnderLevel: boolean
    canModifyOverLevel: boolean
    canSeeAndModifyRegistry: boolean
    level: number
    jobTitle: string
    canSeeAndModifyCosts: boolean
    canSeeAndModifyInsertControl: boolean
    roleId: number
  }