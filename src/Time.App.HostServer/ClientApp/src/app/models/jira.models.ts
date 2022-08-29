import { FromSidebar } from "../common/enum/sidebar.enum"
import { Status } from "../common/enum/status.enum"
import { DateService } from "../services/date.service"
import { formatDate, IdMailnameLevel, IdName } from "./general.models"
import { User } from "./user.models"


export class WrapperTasks {
    projectTask: JiraTask[]
    supportTask: JiraTask[]
    otherTask: JiraTask[]
  }

export class JiraTask {
    rowGuid: string
    taskId: number
    name: string
    startDate: Date
    endDate: Date
    dueDate: Date
    timeSpentInHour: number
    note: string
    estimate: string
    sla: number
    idJiraTask: number
    project: IdName
    status: IdName
    priority: IdName
    taskSource: IdName
    issueType: IdName
    employeesAssignee: IdName
    user: IdMailnameLevel
    jira: JiraLink
    employeesAgendaId: number
    agendaType: IdName
    startTime: string
    endTime: string
    site: IdName
    personalCost: IdName
    constructor( dateService: DateService) {}

    static fromJiraFormFrontEndtoJiraTaskBackEnd(event: JiraFormFrontEnd): JiraFormBackEnd {
      const p = new JiraFormBackEnd;
      p.agendaTypeId = event.agendaType?.id;
      p.loggedHours = event.loggedHours
      p.name = event.name
      p.note = event.note
      p.projectId = event.project?.id
      p.statusId = event.status?.id ? event.status.id : 0
      p.taskId = event.taskId
      p.siteId = event.site.id
      p.userId = event.user.id
      p.startTime = (event.startTime.getHours().toLocaleString().length === 1) ? String('0' + event.startTime.getHours()) + ':00' : String(event.startTime.getHours()) + ':00'
      p.endTime = (event.endTime.getHours().toLocaleString().length === 1) ? String('0' + event.endTime.getHours()) + ':00' : String(event.endTime.getHours()) + ':00'
      if (event.startDate.length > 1) {
        p.startDate = formatDate(event.startDate[0])
        p.endDate = formatDate(event.startDate[1])
      } else {
        p.startDate = formatDate(event.startDate[0])
        p.endDate = formatDate(event.startDate[0])
      }
      return p
    }
  
    static fromJiraTaskToJiraCalendarEventBackEnd(event: JiraFormFrontEnd, user: User): JiraCalendarEventBackEnd {
      const p = new JiraCalendarEventBackEnd();
      p.id = event.employeesAgendaId
      p.rowGuid = event.rowGuid
      p.startDate = formatDate(event.startDate[0])
      if (event.startDate[1]) {
        p.endDate = formatDate(event.startDate[1])
      } else {
        p.endDate = formatDate(event.startDate[0])
      }
      p.startTime = event.startTime.getHours().toString().length === 1 ? '0' + event.startTime.getHours() + ':00' : event.startTime.getHours() + ':00'
      p.endTime = event.endTime.getHours() + ':00'
      p.name = event.name
      p.note = event.note
      p.loggedHours = event.loggedHours
      p.taskId = event.taskId
      p.userId = event.user.id
      p.projectId = event.project?.id
      p.agendaTypeId = event.agendaType?.id
      p.statusId = event.status?.id
      p.siteId = event.site.id
      return p
    }
  
    static fromJiraTaskToJiraFormFrontEnd(event: JiraTask, typeFromSidebar: FromSidebar, user: User): JiraFormFrontEnd {
      const fromSidebarENUM = FromSidebar
      const p = new JiraFormFrontEnd;
      if (typeFromSidebar === fromSidebarENUM.OTHER) {
        p.isProjectTask = false
        p.name = event.name
        p.agendaType = event.agendaType
        p.rowGuid = event.rowGuid
        p.taskId = event.taskId
        p.sla = event.sla
        p.site = event.site
        p.user = {
          mail: user.email,
          id: user.userId,
          name: user.name,
          level: user.level
        }
        p.startDate = [new Date(event.startDate)]
        p.employeesAgendaId = event.employeesAgendaId
        if (!event.startTime) {
          p.startTime = new Date()
          p.startTime.setHours(9)
          p.startTime.setMinutes(0)
          p.endTime = new Date()
          p.endTime.setHours(18)
          p.endTime.setMinutes(0)
        } else {
          const startDate = new Date(event.startDate)
          const startTime = startDate
          startTime.setHours(Number(event.startTime.substring(0, 2)))
          p.startTime = new Date()
          p.startTime.setHours(startTime.getHours());
          p.startTime.setMinutes(0)
          const endTime = startDate
          endTime.setHours(Number(event.endTime.substring(0, 2)))
          p.endTime = new Date()
          p.endTime.setHours(endTime.getHours());
          p.endTime.setMinutes(0)
        }
      } else {
        const startDate = new Date(event.startDate)
        const status = Status
        p.endDate = event.endDate
        p.loggedHours = 0
        p.name = event.name
        p.note = event.note
        p.timeSpentInHour = event.timeSpentInHour
        p.rowGuid = event.rowGuid
        p.site = event.site
        p.startDate = [startDate]
        p.agendaType = event.agendaType
        if (event.status?.id !== status.TODO) {
          p.status = event.status
        } else {
          p.status = {
            id: status.WIP,
            name: 'WIP'
          }
          if (typeFromSidebar === fromSidebarENUM.PROJECT) {
            p.isProjectTask = true
          } else if (typeFromSidebar === fromSidebarENUM.SUPPORT) {
            p.isProjectTask = false
          }
        }
        if (p.status.id === status.FINISHED) {
          p.status = {
            id: status.CLOSED,
            name: 'Closed'
          }
        }
        if (typeFromSidebar === fromSidebarENUM.CALENDAR) {
          p.status = event.status
          p.agendaType = event.agendaType
        }
        p.taskId = event.taskId
        p.estimate = event.estimate
        p.dueDate = event.dueDate
        p.user = event.user
        p.priority = event.priority
        p.employeesAgendaId = event.employeesAgendaId
        const statusENUM = Status
        if (event.status?.id === statusENUM.CLOSED) {
          p.statusFrontEnd = statusENUM.CLOSED
        }
        p.project = event.project
        p.statusFrontEnd = event.status?.id
        if (typeFromSidebar !== fromSidebarENUM.CALENDAR) {
          p.startTime = new Date()
          p.startTime.setHours(9)
          p.startTime.setMinutes(0)
          p.endTime = new Date()
          p.endTime.setHours(18)
          p.endTime.setMinutes(0)
        } else {
          const startTime = startDate
          startTime.setHours(Number(event.startTime.substring(0, 2)))
          p.startTime = new Date()
          p.startTime.setHours(startTime.getHours());
          p.startTime.setMinutes(0)
          const endTime = startDate
          endTime.setHours(Number(event.endTime.substring(0, 2)))
          p.endTime = new Date()
          p.endTime.setHours(endTime.getHours());
          p.endTime.setMinutes(0)
        }
      }
      return p
    }
  
    static resizeToBackEnd(event: any, user: User, viewCalendar: string): JiraCalendarEventBackEnd {
      const p = new JiraCalendarEventBackEnd();
      
      p.id = event.employeesAgendaId
      p.rowGuid = event.rowGuid
      p.startDate = formatDate(event.startDate)
      p.endDate = formatDate(event.endDate.setDate(event.endDate.getDate()))
      if (viewCalendar === 'timeGridWeek' || viewCalendar === 'timeGridDay') {
        p.startTime = event.startTime
        p.endTime = event.endTime
      } else {
        p.startTime = '09:00'
        p.endTime = '18:00'
      }
      p.name = event.name
      p.note = event.note
      p.loggedHours = event.loggedHours
      p.taskId = event.taskId
      p.siteId = event.site.id
      p.userId = event.user.id
      p.agendaTypeId = event.agendaType.id
      p.statusId = event.status?.id ? event.status.id : 0
      return p
    }
  
    static moveToBackEnd(event: any, user: User): JiraCalendarEventBackEnd {
      const p = new JiraCalendarEventBackEnd();
      p.id = event.employeesAgendaId
      p.rowGuid = event.rowGuid
      p.startDate = formatDate(event.startDate)
      p.endDate = formatDate(event.startDate)
      const startTime = event.startDate
      startTime.setHours(event.startTime.substring(0, 2))
      startTime.setMinutes(0)
      p.startTime = startTime.getHours().toString().length === 1 ? '0' + startTime.getHours().toString() + ':00' : startTime.getHours().toString() + ':00'
      const endTime = event.endDate
      endTime.setHours(event.endTime.substring(0, 2))
      endTime.setMinutes(0)
      p.endTime = endTime.getHours().toString().length === 1 ? '0' + endTime.getHours().toString() + ':00' : endTime.getHours().toString() + ':00'
      p.name = event.name
      p.siteId  = event.site.id
      p.note = event.note
      p.loggedHours = event.loggedHours
      p.taskId = event.taskId
      p.userId = event.user.id
      p.agendaTypeId = event.agendaType.id
      p.statusId = event.status?.id ? event.status.id : 0
      return p
    }
  }

export class JiraFormFrontEnd {
    rowGuid: string
    startDate: Date[]
    endDate: Date
    name: string
    note: string
    loggedHours: number
    taskId: number
    user: IdMailnameLevel
    agendaType?: IdName
    status?: IdName | null
    statusFrontEnd: number
    startTime: Date
    endTime: Date
    dueDate: Date
    priority: IdName
    timeSpentInHour: number
    estimate: string
    project: IdName
    isProjectTask: boolean
    employeesAgendaId: number
    sla?: number
    site: IdName
  }
  
export class JiraFormBackEnd {
    startDate: string
    endDate: string
    startTime: string
    endTime: string
    name: string
    note: string
    loggedHours: number
    taskId: number
    userId: number
    agendaTypeId: number | undefined
    statusId: number | undefined
    isProjectTask: boolean
    siteId?: number
    projectId: number
  }
  
export interface JiraLink {
    id: number
    key: string
    link: string
  }
  
export class JiraCalendarEventBackEnd {
    id: number
    rowGuid: string
    startDate: Date | Date[] | string
    endDate: Date | string
    startTime: string
    endTime: string
    name: string
    note: string
    loggedHours: number
    taskId: number
    userId: number
    agendaTypeId?: number
    statusId?: number
    projectId?: number
    siteId?: number
  }