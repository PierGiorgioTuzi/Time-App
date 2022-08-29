import { User } from "./user.models"


export class Sites {
    id?: number
    name: string
    rowGuid?: string
  
    static createNewInstance(): Sites {
      const p = new Sites()
      p.name = ''
      return p
    }
    static createInstanceForUpdate(param: Sites, user: User): Sites {
      const p = new Sites;
      p.id = param.id
      p.name = param.name
      p.rowGuid = param.rowGuid
      return p
    }
  }