import { IdMail, IdMailnameLevel, IdName } from "./general.models"
import { User } from "./user.models"


export interface eventsList {
  id: number
  title: string
  start: Date
  end: Date
  color?: string
  extendedProps?: any
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  allDay?: boolean
  display?: string
  className?: string
}

export class RegistryTask {
    name: string
    agendaType: IdName
    taskId: number
    rowGuid: string
  
    static createInstance(param: RegistryTask): RegistryTask {
      const p = new RegistryTask()
      p.agendaType = param.agendaType
      p.name = param.name
      p.rowGuid = param.rowGuid
      p.taskId = param.taskId
      return p
    }
  
    static createNewInstance(): RegistryTask {
      const p = new RegistryTask();
      p.agendaType = null
      p.name = null
      return p
    }
}

export class TaskList {
  rowGuid: string
  taskId: number
  name: string
  startDate: Date
  endDate: Date
  note: string
  employeesAgendaId: number
  loggedHours: number
  user: IdMailnameLevel
  agendaType: IdMail
  status: IdMail
  startTime: string
  endTime: string
}

export class TasksType {
  id: number
  name: string
  color: string
  active: boolean
  jiraId: string
  rowGuid: string
  updatedBy?: number

  static createNewInstance(): TasksType {
    const p = new TasksType();
    p.name = ''
    p.color = ''
    p.active = false
    return p
  }

  static createInstanceForUpdate(param: TasksType, user: User): TasksType {
    const p = new TasksType();
    p.name = param.name
    p.jiraId = param.jiraId
    p.updatedBy = user.userId
    p.active = param.active
    p.color = param.color
    p.rowGuid = param.rowGuid
    p.id = param.id
    return p
  }
}