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

  export function formatDate(date: string | number | Date ) {
    date = new Date(date);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return year + '-' + month + '-' + day;
  }
  
  export function formatDateFrontEnd(date: string | number | Date) {
    date = new Date(date);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return day + '-' + month + '-' + year;
  }
  
