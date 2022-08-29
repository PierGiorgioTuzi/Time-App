import { IdMail, IdName } from "./general.models"
import { Role } from "./role.models"
import { User } from "./user.models"


export class Employees {
    rowGuid: string
    id: number
    active: boolean
    jobTitle: string
    avatar: string
    role: Role
    user: IdMail
    employeesType: IdName
    name: string
    email: string
    userId?: number
  
    static createInstance(param: Employees): SingleEmployee {
      const p = new SingleEmployee();
      p.rowGuid = param.rowGuid
      p.id = param.id
      p.active = param.active
      p.jobTitle = param.jobTitle
      p.role = param.role
      p.employeesType = param.employeesType
      p.name = param.name
      p.email = param.user.email
      p.userId = param.user.id
      return p
    }
  
    static createNewInstance(): SingleEmployee {
      const p = new SingleEmployee();
      p.id = null
      p.active = false
      p.jobTitle = null
      p.role = null
      p.employeesType = null
      p.name = null 
      p.email = null   
      return p
    }
  
    static updateInstace(param: Employees, user: User): UpdateEmployee {
      const p = new UpdateEmployee()
      p.active = param.active
      //p.avatar = param.avatar
      p.roleId = param.role.roleId
      p.employeeTypeId = param.employeesType.id
      p.userId = param.userId
      p.jobTitle = param.jobTitle
      p.name = param.name
      p.rowGuid = param.rowGuid
      p.id = param.id
      p.email = param.email
      return p
    }
  
    static createNewInstanceForCreate(param: Employees): CreateEmployee {
      //"avatar": "string",
      const p = new CreateEmployee()
      p.name = param.name,
      p.jobTitle = param.jobTitle,
      p.employeeTypeId = param.employeesType.id
      p.active = param.active
      p.email = param.email + '@retailitaliasrl.it'
      p.roleId = param.role.roleId
      return p
    }
  }
  
  export class CreateEmployee {
    name: string
    jobTitle: string
    employeeTypeId: number
    active: boolean
    email: string
    roleId: number
  }
  
  export class UpdateEmployee {
    rowGuid: string
    id: number
    avatar: string
    userId: number
    name: string
    jobTitle: string
    employeeTypeId: number
    active: boolean
    email: string
    roleId: number
  }
  
  export class SingleEmployee {
    name: string
    jobTitle: string
    employeesType: IdName
    active: boolean
    role: Role
    id: number
    email: string
    rowGuid: string
    userId?: number
  }
 