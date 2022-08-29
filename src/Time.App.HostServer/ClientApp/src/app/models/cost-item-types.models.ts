export class PersonalCosts {
    id?: number
    rowGuid?: string
    name: string
    canModifyForWorker: boolean
    canModifyForThirdPart: boolean

  
    static createNewInstance(): PersonalCosts {
      const p = new PersonalCosts()
      p.id = 0
      p.name = ''
      p.canModifyForWorker = false
      p.canModifyForThirdPart = false
      return p
    }
  }