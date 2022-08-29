export interface Role {
    rowGuid: string
    roleId: number
    active: boolean
    canSeeSameLevel: boolean
    canSeeAndModifyRegistry: boolean
    canSeeUnderLevel: boolean
    canSeeOverLevel: boolean
    canModifySameLevel: boolean
    canModifyUnderLevel: boolean
    canModifyOverLevel: boolean
    level: number
  }
  
  export class Roles {
    roleId: number
    name: string
    active: boolean
    level: number
    rowGuid: string
    id?: number
    canSeeSameLevel: boolean
    canSeeAndModifyRegistry: boolean
    canSeeUnderLevel: boolean
    canSeeOverLevel: boolean
    canModifySameLevel: boolean
    canModifyUnderLevel: boolean
    canModifyOverLevel: boolean
    canSeeAndModifyCosts: boolean
    canSeeAndModifyInsertControl: boolean
    numberEmployees: number
  
    static createNewInstance(): Roles {
      const p = new Roles()
      p.name = null
      p.active = false
      p.canModifyOverLevel = false
      p.canModifySameLevel = false
      p.canModifyUnderLevel = false
      p.canSeeAndModifyRegistry = false
      p.canSeeOverLevel = false
      p.canSeeSameLevel = false
      p.canSeeUnderLevel = false
      p.level = null
      p.canSeeAndModifyCosts = false
      p.canSeeAndModifyInsertControl = false
      p.active = false
      return p
    }
  
    static updateNewInstance(form: Roles): Roles {
      const p = new Roles()
      p.name = form.name
      p.active = form.active
      p.canModifyOverLevel = form.canModifyOverLevel
      p.canModifySameLevel = form.canModifySameLevel
      p.canModifyUnderLevel = form.canModifyUnderLevel
      p.canSeeAndModifyRegistry = form.canSeeAndModifyRegistry
      p.canSeeOverLevel = form.canSeeOverLevel
      p.canSeeSameLevel = form.canSeeSameLevel
      p.canSeeUnderLevel = form.canSeeUnderLevel
      p.level = form.level
      p.rowGuid = form.rowGuid
      p.canSeeAndModifyCosts = form.canSeeAndModifyCosts
      p.canSeeAndModifyInsertControl = form.canSeeAndModifyInsertControl
      p.id = form.roleId
      p.active = form.active
      return p
    }
  }

  export class SignleRole {
    roleId: number
    name: string
  }
