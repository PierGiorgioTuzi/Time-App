export class Table {
    lovCatalogId: number
    tableEntityID: number
    name: string
    description: string
    url: string
    noteId: number
    recordId: number
    tableIndexCode: string
    rowGuid: string
  }
  
  export enum TableTypeENUM {
    'USERS' = 1,
    'USERTYPE' = 2,
    'TASK' = 3,
    'TASKTYPE' = 4,
    'ROLES' = 5,
    'SITE' = 6,
    'PERSONALCOST' = 7
  }
  