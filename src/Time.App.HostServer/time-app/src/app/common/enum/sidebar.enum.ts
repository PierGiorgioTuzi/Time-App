export enum ActiveLinkENUM {
    'AGENDA' = 1,
    'COSTOPERSONALE' = 2,
    'ANAGRAFICHE' = 3,
    'CONTROLLOINSERIMENTI' = 4
  }
  export interface SidebarFilter {
    usersIds: number[]
    projectsIds: number[]
    statusIds: number[]
  }
  export enum FromSidebar {
    'PROJECT',
    'SUPPORT',
    'OTHER',
    'CALENDAR'
  }