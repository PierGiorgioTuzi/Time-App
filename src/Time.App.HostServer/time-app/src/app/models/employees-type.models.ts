export class EmployeesType {
    rowGuid: string
    id: number
    name: string
    active: boolean
  
    static createNewInstance(): EmployeesType {
      const p = new EmployeesType();
      p.name = null
      p.active = false
      return p
    }
  }
