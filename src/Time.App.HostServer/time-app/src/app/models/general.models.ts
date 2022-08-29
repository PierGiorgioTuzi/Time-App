export interface IdMail {
    email: string,
    id: number
  }
  
  export interface IdMailname {
    id: number
    name: string
    mail: string
  }
  
  export interface IdMailnameLevel {
    id: number
    name: string
    mail: string
    level: number
  }
  
  export interface IdName {
    id: number
    name: string
  }
  
  export interface IdNameLevel {
    id: number
    name: string
    level: number
  }
  
  export interface NameCode {
    name: string
    code: string
  }

  export interface Overlap {
    start: number
    end: number
    index: number
  }


  export class firstEventForPagination {
    first: number
    globalFilter: null
    multiSortMeta: undefined
    rows: number
    sortField: undefined
    sortOrder: number

    constructor() {
      this.first = 0
      this.globalFilter = null
      this.multiSortMeta = undefined
      this.rows = 20
      this.sortField = undefined
      this.sortOrder = 1
    }
  }


  export class InsertControl {
    employeeId: number
    endDate: string
    name:string
    loggedHours: number
    userId: number
  }
  
  export interface PersonalFilter {
    usersIds: number[]
    projectsIds: number[]
    agendaTypeIds: number[]
  }


  
