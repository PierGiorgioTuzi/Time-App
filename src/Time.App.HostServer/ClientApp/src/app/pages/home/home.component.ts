import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Calendar, CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import itLocale from '@fullcalendar/core/locales/it';
import { TranslateService } from '@ngx-translate/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridWeek from '@fullcalendar/timegrid';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { DateService } from 'src/app/services/date.service';
import { RegistryService } from 'src/app/services/registry.service';
import { CalendarService } from 'src/app/services/calendar.service';
import { ActiveLinkENUM, FromSidebar, SidebarFilter } from 'src/app/common/enum/sidebar.enum';
import { eventsList, TaskList } from 'src/app/models/task.models';
import { Status } from 'src/app/common/enum/status.enum';
import { IdName, IdNameLevel, Overlap, PersonalFilter } from 'src/app/models/general.models';
import { JiraTask, WrapperTasks } from 'src/app/models/jira.models';
import { User } from 'src/app/models/user.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  /*
  * Enable/disable Weekend
  */
  weekend: boolean = false;
  /*
  * Enum of activeLink
  */
  activeLinkENUM = ActiveLinkENUM
  /*
  * Active link in Sidebar
  */
  activeLink: ActiveLinkENUM
  /*
  * Array of projectTask
  */
  projectTaskList: eventsList[] = []
  /*
  * Array of otherTask 
  */
  otherTaskList: eventsList[] = []
  /*
  * Array of array of supportTask divideb by Sla 
  */
  supportTaskList: JiraTask[]
  /*
  * Array of number of priority to loop in HTML
  */
  numberPriority: string[] = []
  /*
  * Events of calendar 
  */
  events: any[] = []
  /*
  * Calendar Options
  */
  viewCalendar: string = 'dayGridMonth'
  /*
  * Coordinate right menu Y
  */
  rightMenuY: number
  /*
  * Coordinate right menu X
  */
  rightMenuX: number
  /*
  * Right click menu active
  */
  rightActive: boolean = false
  /*
  * Right event active
  */
  rigthActiveElement: eventsList
  /*
  * Boolean for see remove all from a event
  */
  deleteAllVisibleButton: boolean
  /*
  * Boolean for form ready or not
  */
  loadForm: boolean
  /*
  ENUM of status
  */
  statusENUM = Status
  /*
  * List of status in filter
  */
  statusList: IdName[]
  /*
  * List of users in filter
  */
  userList: IdNameLevel[]
  /*
  * List of Project in calendar filter
  */
  projectList: IdName[]
  /*
  * List of Agenda Type in calendar filter
  */
  agendaTypeList: IdName[]
  /*
  * Agenda Type filtered calendar
  */
  selectedAgendaTypeForCalendar: number[] = []
  /*
  * User filtered calendar
  */
  selectedUserForCalendar: number[] = []
  /*
  * Project filtered calendar
  */
  selectedProjectForCalendar: number[] = []
  /*
  * User filtered sidebar
  */
  selectedUser: number[] = []
  /*
  * project filtered sidebar
  */
  selectedProject: number[] = []
  /*
  * Status filtered 
  */
  selectedStatus: number[] = []
  /*
  * Label in language onChange Filters Status Sidebar
  */
  selectedItemsLabel: string
  /*
  * Label in language onChange Filters Porject Sidebar
  */
  selectedItemsProjectLabel: string
  /*
  * Label in language onChange Filters User
  */
  selectedItemsLabelUser: string
  /*
  * Label in language onChange Filter Calendar
  */
  selectedItemsLabelUserForCalendar: string
  /*
  * Label in language onChange Filter Calendar project
  */
  selectedItemsLabelProjectForCalendar: string
  /*
  * Label in language onChange Filter Calendar agenda type
  */
  selectedItemsLabelAgendaTypeForCalendar: string
  /*
  * Object of user logged 
  */
  user: User
  /*
  * Boolean for show form of event
  */
  singleEventBoolean: boolean = false
  /*
  * Boolean enable/disabled remove button in form
  */
  canRemove: boolean = false
  /*
  * Single Event to modify
  */
  singleEvent: JiraTask
  /*
  * Enum for set if a event in sidebar is a project or a support task
  */
  fromSidebar = FromSidebar
  /*
  * Value to pass in input for know if event is a project or support task
  */
  typeFromSidebar: FromSidebar
  /*
  * Boolean for enable/disable form (permissions)
  */
  disableForm: boolean = false
  /*
  * Boolean for p-dialog for not have permission
  */
  notHavePermission: boolean = false
  /*
  * Boolean for create/update in form
  */
  isEditMode: boolean
  /*
  * Calendar Options
  */
  options: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridWeek, interactionPlugin],
    initialView: this.viewCalendar,
    initialDate: new Date(),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    views: {
      dayGridMonth: {
        dayMaxEvents: 2,
      },
    },
    droppable: true,
    dropAccept: '.cool-event',
    height: '83vh',
    hiddenDays: [6, 7, 0],
    eventDidMount: (arg: any) => {
      const argo = arg
      arg.el.addEventListener("contextmenu", (jsEvent: any) => {
        jsEvent.preventDefault()
        this.rightMenuX = jsEvent.pageX
        this.rightMenuY = jsEvent.pageY - 60
        this.typeFromSidebar = this.fromSidebar.CALENDAR;
        this.rigthActiveElement = argo.event._def
        this.rightActive = true
      })
    },
    events: this.events,
    editable: true,
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    locale: this.translateService.currentLang === 'it' ? itLocale : undefined,
    eventDrop: this.moveEvent.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventResize: this.eventResize.bind(this),
    eventReceive: this.eventReceive.bind(this),
  }


  constructor(
    private chDf: ChangeDetectorRef,
    private calendarService: CalendarService,
    private translateService: TranslateService,
    private router: Router,
    private registryService: RegistryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _el: ElementRef,
    private dateService: DateService,
    private location: Location) {
    this.checkLogin();
    this.translateService.onLangChange.subscribe((event: any) => {
      this.setLanguageLabelsMultiselect();
      this.reloadDraggable()
    })
  }




  ngOnInit(): void {
    this.loadForm = false
    this.activeLink = this.activeLinkENUM.AGENDA
    this.selectedUser = [this.user.userId]
    this.selectedUserForCalendar = [this.user.userId]
    let fromOtherPage: any = this.location.getState()
    fromOtherPage = fromOtherPage.userSelected
    if (fromOtherPage) {
      this.selectedUserForCalendar = [fromOtherPage]
    }
    this.loadLists()
    this.loadEventSidebar('', true)
    this.updateFilterForPersonalTask()
    this.loadEventSidebar('', true)

  }


  checkLogin(): void {
    const user = localStorage.getItem('user')
    if (user) {
      this.user = JSON.parse(user);
    } else {
      this.router.navigateByUrl('login');
    }
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const button = document.querySelector('.fc-toolbar-chunk:last-child > .fc-button-group') as HTMLElement
      const element = document.querySelector('#toggle')
      button.prepend(element)   
    }, 1);
  }
  /*
  * enable/disable weekend 
  */
  toggleWeekend(): void {
    if (this.weekend) {
      this.options.hiddenDays = []
    } else {
      this.options.hiddenDays = [6, 7, 0]
    }
    let calendarEl = document.getElementById('time');
    let calendar = new Calendar(calendarEl as HTMLElement, this.options);
    calendar.render();
    this.chDf.detectChanges()
    this.setSignalOnCalendar()
  }
  /*
  * Function for create SLA array by priority,
  * @param list is sidebar's events 
  * @param key is 'sla' (string) for sort array for sla value
  */
  groupBySLA(list: any, key: string) {
    return list.reduce(function (rv: { [x: string]: any[]; }, x: { [x: string]: string | number; }) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }
  /*
  * Check if in a day on calendar
  * there are events for more 8 hours and overlap events
  * in all 3 view of calendar
  */
  setSignalOnCalendar(): void {
    if (this.viewCalendar === 'timeGridDay') {
      this.setSignalDay()
    } else if (this.viewCalendar === 'timeGridWeek') {
      this.setSignalWeek()
    } else {
      this.setSignalMonthly()
    }
    this.chDf.detectChanges()
  }
  /*
  * Function for day view
  */
  setSignalDay(): void {
    const bigCellContainer = '.fc-col-header-cell'
    const cell = document.querySelector(bigCellContainer).getAttribute('data-date')
    const dayTocontrol = this.dateService.dateFromFormatstringMMDDToDate(cell, '-')
    const events = this.events.filter(e => e.start.getDate() === dayTocontrol.getDate() && e.start.getMonth() === dayTocontrol.getMonth())
    if (events) {
      let hoursUsed = 0
      if (this.checkDateTimeOverlap(events)) {
        const cella = document.querySelector('.fc-col-header-cell-cushion')
        const stringError = this.translateService.instant('agenda.overlap')
        const template = this.createElementFromHTML('<i class="fa fa-exclamation-triangle red" aria-hidden="true" title="' + stringError + '"></i>')
        const isYet = document.querySelector('.red')
        if (!isYet) {
          cella.append(template)
        }
      } else {
        let element = document.querySelector('.fc-col-header-cell-cushion')
        const isYet = element.querySelector('.red')
        if (isYet) {
          isYet.remove()
        }
      }
      events.forEach(item => {
        hoursUsed += this.dateService.hourFromStringToDate(item.extendedProps.element.endTime).getHours() - this.dateService.hourFromStringToDate(item.extendedProps.element.startTime).getHours()
      })
      if (hoursUsed > 9) {
        const cella = document.querySelector('.fc-col-header-cell-cushion')
        const stringError = this.translateService.instant('agenda.extraordinary')
        const template = this.createElementFromHTML('<i class="fa fa-exclamation-triangle alert" aria-hidden="true" title="' + stringError + '"></i>')
        const isYet = cella.querySelector('.alert')
        if (!isYet) {
          cella.append(template)
        }
      } else {
        const cella = document.querySelector('.fc-col-header-cell-cushion')
        const isYet = cella.querySelector('.alert')
        if (isYet) {
          isYet.remove()
        }
      }
    }
  }
  /*
  * Function for week view
  */
  setSignalWeek(): void {
    const bigCellContainer = '.fc-col-header-cell .fc-scrollgrid-sync-inner'
    let events = document.querySelectorAll('.fc-timegrid-event') as any
    const allDays = document.querySelectorAll('.fc-daygrid-event') as any
    const eventToControl = []
    if (events.length > 0) {
      events.forEach(element => {
        if (element.fcSeg) {
          eventToControl.push(element.fcSeg.start, element.fcSeg.end)
        }
      })
    }
    if (allDays.length > 0) {
      allDays.forEach(element => {
        if (element.fcSeg?.eventRange) {
          eventToControl.push(element.fcSeg.eventRange.def.extendedProps.element.startDate, element.fcSeg.eventRange.def.extendedProps.element.endDate)
        }
      })
    }
    const cell = document.querySelectorAll(bigCellContainer)
    cell.forEach((e, index) => {
      if (e.childNodes.length === 1) {
        if (this.selectedUserForCalendar.length === 1) {
          const day = e.querySelector('.fc-col-header-cell-cushion').getAttribute('aria-label')
          const dayTocontrol = this.dateService.getDateFromStringWithMonthWord(day, this.translateService.currentLang)
          if (this.selectedUserForCalendar.length === 1) {
            const DatesToControl = []
            if (this.events.length > 0) {
              this.events.forEach(element => {
                const startDate = new Date(element.extendedProps.element.startDate)
                if (this.dateService.fromDateToString(startDate) === this.dateService.fromDateToString(dayTocontrol)) {
                  DatesToControl.push(element)
                }
              });
            }
            let hoursUsed = 0;
            if (DatesToControl.length > 0) {
              DatesToControl.forEach(item => {
                hoursUsed += this.dateService.hourFromStringToDate(item.extendedProps.element.endTime).getHours() - this.dateService.hourFromStringToDate(item.extendedProps.element.startTime).getHours()
              })
              if (this.checkDateTimeOverlap(DatesToControl)) {
                e.id = 'id' + String(index)
                let element = document.querySelectorAll('#id' + String(index));
                element.forEach((el, index) => {
                  if (!index) {
                    const stringError = this.translateService.instant('agenda.overlap')
                    const template = this.createElementFromHTML('<i class="fa fa-exclamation-triangle red" aria-hidden="true" title="' + stringError + '"></i>')
                    const cella = el.querySelector('.fc-col-header-cell-cushion')
                    const isYet = el.querySelector('.red')
                    if (!isYet) {
                      cella.append(template)
                    }
                  }
                })
              } else {
                e.id = 'id' + String(index)
                let element = document.querySelectorAll('#id' + String(index));
                element.forEach((el, index) => {
                  if (!index) {
                    const cella = el.querySelector('.fc-col-header-cell-cushion')
                    const isYet = el.querySelector('.red')
                    if (isYet) {
                      isYet.remove()
                    }
                  }
                })
              }
            }
            if (hoursUsed > 9) {
              e.id = 'id' + String(index)
              let element = document.querySelectorAll('#id' + String(index));
              element.forEach((e, index) => {
                if (!index) {
                  const stringError = this.translateService.instant('agenda.extraordinary')
                  const template = this.createElementFromHTML('<i class="fa fa-exclamation-triangle alert" aria-hidden="true" title="' + stringError + '"></i>')
                  const cella = e.querySelector('.fc-col-header-cell-cushion')
                  const isYet = e.querySelector('.alert')
                  if (!isYet) {
                    cella.append(template)
                  }
                }
              })
            } else {
              e.id = 'id' + String(index)
              let element = document.querySelectorAll('#id' + String(index));
              element.forEach((e, index) => {
                if (!index) {
                  const cella = e.querySelector('.fc-col-header-cell-cushion')
                  const isYet = cella.querySelector('.alert')
                  if (isYet) {
                    isYet.remove()
                  }
                }
              })
            }
          }
        } else {
          e.id = 'id' + String(index)
          let element = document.querySelectorAll('#id' + String(index));
          element.forEach((e, index) => {
            if (!index) {
              const cella = e.querySelector('.fc-col-header-cell-cushion')
              const isYet = cella.querySelector('.alert')
              const isYetRed = cella.querySelector('.red')
              if (isYet) {
                isYet.remove()
              }
              if (isYetRed) {
                isYetRed.remove()
              }
            }
          })
        }
      }
    })
  }
  /*
  * Function for monthly view
  */
  setSignalMonthly(): void {
    const bigCellContainer = '.fc-daygrid-day-frame'
    const cell = document.querySelectorAll(bigCellContainer)
    cell.forEach((e, index) => {
      if (e.childNodes.length > 1) {
        const day = e.querySelector('.fc-daygrid-day-number').getAttribute('aria-label')
        const dayTocontrol = this.dateService.getDateFromStringWithMonthWord(day, this.translateService.currentLang)
        if (this.selectedUserForCalendar.length === 1) {
          const DatesToControl = []
          this.events.forEach(element => {
            const startDate = new Date(element.extendedProps.element.startDate)
            if (this.dateService.fromDateToString(startDate) === this.dateService.fromDateToString(dayTocontrol)) {
              DatesToControl.push(element)
            }
          });
          let hoursUsed = 0;
          if (DatesToControl.length > 0) {
            DatesToControl.forEach(item => {
              hoursUsed += this.dateService.hourFromStringToDate(item.extendedProps.element.endTime).getHours() - this.dateService.hourFromStringToDate(item.extendedProps.element.startTime).getHours()
            })
            if (this.checkDateTimeOverlap(DatesToControl)) {
              e.id = 'id' + String(index)
              let element = document.querySelectorAll('#id' + String(index));
              element.forEach((el, index) => {
                if (!index) {
                  const stringError = this.translateService.instant('agenda.overlap')
                  const template = this.createElementFromHTML('<i class="fa fa-exclamation-triangle red" aria-hidden="true" title="' + stringError + '"></i>')
                  const cella = el.querySelector('.fc-daygrid-day-top')
                  const isYet = el.querySelector('.red')
                  if (!isYet) {
                    cella.append(template)
                  }
                }
              })
            } else {
              e.id = 'id' + String(index)
              let element = document.querySelectorAll('#id' + String(index));
              element.forEach((el, index) => {
                if (!index) {
                  const cella = el.querySelector('.fc-daygrid-day-top')
                  const isYet = cella.querySelector('.red')
                  if (isYet) {
                    isYet.remove()
                  }
                }
              })
            }
          }
          if (hoursUsed > 9) {
            e.id = 'id' + String(index)
            let element = document.querySelectorAll('#id' + String(index));
            element.forEach((e, index) => {
              if (!index) {
                const stringError = this.translateService.instant('agenda.extraordinary')
                const template = this.createElementFromHTML('<i class="fa fa-exclamation-triangle alert" aria-hidden="true" title="' + stringError + '"></i>')
                const cella = e.querySelector('.fc-daygrid-day-top')
                const isYet = e.querySelector('.alert')
                if (!isYet) {
                  cella.append(template)
                }
              }
            })
          } else {
            e.id = 'id' + String(index)
            let element = document.querySelectorAll('#id' + String(index));
            element.forEach((e, index) => {
              if (!index) {
                const cella = e.querySelector('.fc-daygrid-day-top')
                const isYet = cella.querySelector('.alert')
                if (isYet) {
                  isYet.remove()
                }
              }
            })
          }
        } else {
          e.id = 'id' + String(index)
          let element = document.querySelectorAll('#id' + String(index));
          element.forEach((e, index) => {
            if (!index) {
              const cella = e.querySelector('.fc-daygrid-day-top')
              const isYet = cella.querySelector('.alert')
              const isYetRed = cella.querySelector('.red')
              if (isYet) {
                isYet.remove()
              }
              if (isYetRed) {
                isYetRed.remove()
              }
            }
          })
        }
      }
    })
  }
  /*
  * Function to check overlap events
  */
  checkDateTimeOverlap(dateTimes: any[]) {
    let isOverlap = false;
    let mapTime: Overlap[] = []
    mapTime = dateTimes.map((e, i) => {return { start: e.start.getTime(), end: e.end.getTime(), index: i}})
    isOverlap = mapTime.some(_ => mapTime.filter(x => x.index != _.index).some(y => this.overlapCondition(y, _)))
    return isOverlap;
  }
  /*
  * Function for overlap condition
  */
  overlapCondition(el1: Overlap, el2: Overlap): boolean{
    return ((el1.start >= el2.start && el1.start < el2.end) || (el1.end > el2.start && el1.end < el2.end) || (el2.start >= el1.start && el2.start < el1.end ) )
  }
  /*
  * Create signal for calendar overlap and extraordinary
  */
  createElementFromHTML(htmlString: string): ChildNode {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }
  /*
  * Control for enable/disabled calendar filter button
  */
  checkUserCalendarFilter(): boolean {
    return this.selectedUserForCalendar.length === 1 && this.selectedUserForCalendar.includes(this.user.userId)
  }
  /*
  * Control for enable/disabled sidebar filter button
  */
  checkUserSidebarFilter(): boolean {
    return this.selectedUser.length === 1 && this.selectedUser.includes(this.user.userId) && this.selectedStatus.length === 3 && this.selectedProject.length === 0
  }
  /*
  * Load all event right side
  */
  loadEventSidebar(event: any = '', defaultStatus: boolean = false): void {
    this.loadForm = false
    if (this.selectedUser.length === 0) {
      this.selectedUser = [this.user.userId]
    }
    if (this.selectedStatus.length === 0) {
      this.selectedStatus = [this.statusENUM.WIP, this.statusENUM.TODO, this.statusENUM.PLANNED]
    }
    if (defaultStatus) {
      this.selectedStatus = [this.statusENUM.WIP, this.statusENUM.TODO, this.statusENUM.PLANNED]
      this.selectedProject = []
      this.selectedUser = [this.user.userId]
    }
    const sidebarFilters: SidebarFilter = {
      usersIds: this.selectedUser,
      projectsIds: this.selectedProject,
      statusIds: this.selectedStatus
    }
    this.setLanguageLabelsMultiselect()
    this.calendarService.getTaskList(sidebarFilters).subscribe(
      (result: WrapperTasks) => {
        this.createEventsList(result);
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorText') })
        this.reloadData()
      },
    )
  }
  /*
  * Load all list
  */
  loadLists(): void {
    forkJoin(
      {
        status: this.calendarService.getStatusList(),
        users: this.calendarService.getUsersList(),
        project: this.calendarService.getProjectList(),
        agendaType: this.calendarService.getAgendaTypeList(1,1000)
      }
    ).subscribe(
      (result: any) => {
        this.userList = result.users
        if (!this.user.canSeeSameLevel) {
          this.userList = this.userList.filter(e => e.level !== this.user.level || e.id === this.user.userId)
        }
        if (!this.user.canSeeUnderLevel) {
          this.userList = this.userList.filter(e => e.level > this.user.level || e.id === this.user.userId)
        }
        if (!this.user.canSeeOverLevel) {
          this.userList = this.userList.filter(e => e.level < this.user.level || e.id === this.user.userId)
        }
        this.userList = this.registryService.sortDescriptionByField(this.userList, 'name')
        this.statusList = this.registryService.sortDescriptionByField(result.status, 'name')
        this.projectList = this.registryService.sortDescriptionByField(result.project, 'name')
        this.agendaTypeList = this.registryService.sortDescriptionByField(result.agendaType.list, 'name')
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorText') })
      },
    )
  }
  /*
  * Function to reload calendar
  */
  reloadData(): void {
    this.updateFilterForPersonalTask()
    this.loadEventSidebar('', false)
  }
  /*
  * Function to reload personal task in calendar
  */
  updateFilterForPersonalTask(event: any = ''): void {
    if (this.selectedUserForCalendar.length === 0) {
      this.selectedUserForCalendar = [this.user.userId]
    }
    const personalFilters: PersonalFilter = {
      usersIds: this.selectedUserForCalendar,
      projectsIds: this.selectedProjectForCalendar,
      agendaTypeIds: this.selectedAgendaTypeForCalendar
    }
    this.setLanguageLabelsMultiselect();
    this.calendarService.getTaskPersonalList(personalFilters).subscribe((result: TaskList[]) => {
      this.createPersonalEventList(result);
    },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorGeneral'), life: 2000 });
      })
  }
  /*
   * Function for set label of filter in multilanguage
   */
  setLanguageLabelsMultiselect(): void {
    if (this.selectedStatus && this.selectedStatus.length > 0) {
      this.selectedItemsLabel = String((this.selectedStatus.length) + ' ' + this.translateService.instant('agenda.selectedStatus'))
    }
    if (this.selectedProject && this.selectedProject.length > 0) {
      this.selectedItemsProjectLabel = String((this.selectedProject.length) + ' ' + this.translateService.instant('agenda.selectedProject'))
    }
    if (this.selectedUser && this.selectedUser.length > 0) {
      this.selectedItemsLabelUser = String((this.selectedUser.length) + ' ' + this.translateService.instant('agenda.selectedUser'))
    }
    if (this.selectedUserForCalendar && this.selectedUserForCalendar.length > 0) {
      this.selectedItemsLabelUserForCalendar = String((this.selectedUserForCalendar.length) + ' ' + this.translateService.instant('agenda.selectedUser'))
    }
    if (this.selectedProjectForCalendar && this.selectedProjectForCalendar.length > 0) {
      this.selectedItemsLabelProjectForCalendar = String((this.selectedProjectForCalendar.length) + ' ' + this.translateService.instant('agenda.selectedProject'))
    }
    if (this.selectedItemsLabelAgendaTypeForCalendar && this.selectedItemsLabelAgendaTypeForCalendar.length > 0) {
      this.selectedItemsLabelAgendaTypeForCalendar = String((this.selectedAgendaTypeForCalendar.length) + ' ' + this.translateService.instant('agenda.selectedAgendaType'))
    }
    this.chDf.detectChanges();
  }
  /*
  * Function for set object of task in task div
  */
  setProjectJSON(project: any): string {
    return JSON.stringify(project);
  }
  /*
  * Function to lengthen or decrease the time of a task
  */
  eventResize(event: any): void {
    const range = event.event._instance.range
    const singleEvent = event.event._def.extendedProps.element;
    const singleEventToPass = event.event._def;
    const userId = event.event._def.extendedProps.element.user.id;
    let start = range.start
    let end = range.end
    if (this.viewCalendar === 'timeGridWeek' || this.viewCalendar === 'timeGridDay') {
      range.start.setHours(range.start.getHours() - 2)
      range.end.setHours(range.end.getHours() - 2)
      start = range.start
      end = range.end
      singleEventToPass.extendedProps.element.startTime = String(this.dateService.getHoursFromDate(start)) + ':00'
      singleEventToPass.extendedProps.element.endTime = String(this.dateService.getHoursFromDate(end)) + ':00'
    } else {
      start.setHours(0)
      end = new Date(end.setDate(range.end.getDate() - 1))
      end.setHours(0);
    }
    if (userId !== this.user.userId) {
      if (!this.user.canModifyOverLevel) {
        if (singleEvent.user.level < this.user.level) {
          this.notHavePermission = true
        }
      }
      if (!this.user.canModifySameLevel) {
        if (singleEvent.user.level === this.user.level && singleEvent.user.id !== this.user.userId) {
          this.notHavePermission = true
        }
      }
      if (!this.user.canModifyUnderLevel) {
        if (singleEvent.user.level > this.user.level) {
          this.notHavePermission = true
        }
      }
    }
    if (!this.notHavePermission) {
      singleEventToPass.extendedProps.element.startDate = start
      singleEventToPass.extendedProps.element.endDate = end
      const param = JiraTask.resizeToBackEnd(singleEventToPass.extendedProps.element, this.user, this.viewCalendar)
      this.calendarService.updateEventFromCalendar(param, this.user, this.weekend).subscribe((result: any) => {
        this.updateFilterForPersonalTask()
      })
    }
  }
  /*
  * Close not have permission dialog and reload Data
  */
  closeNotHavePermission(): void {
    this.notHavePermission = false;
    this.reloadData();
  }
  /*
  * drag event in calendar in other date
  */
  moveEvent(event: any): void {
    const range = event.event._instance.range
    const singleEvent = event.event._def.extendedProps.element;
    const userId = event.event._def.extendedProps.element.user.id;
    const singleEventToPass = event.event._def;
    let start = new Date();
    let end = new Date();
    if (this.viewCalendar === 'timeGridWeek' || this.viewCalendar === 'timeGridDay') {
      range.start.setHours(range.start.getHours() - 2)
      range.end.setHours(range.end.getHours() - 2)
      start = range.start
      end = range.end
      singleEvent.startTime = String(this.dateService.getHoursFromDate(start)) + ':00'
      singleEvent.endTime = String(this.dateService.getHoursFromDate(end)) + ':00'
    } else {
      start = range.start
      start.setHours(0)
      end = range.start
      end.setHours(0);
    }
    if (userId !== this.user.userId) {
      if (!this.user.canModifyOverLevel) {
        if (singleEvent.user.level < this.user.level) {
          this.notHavePermission = true
        }
      }
      if (!this.user.canModifySameLevel) {
        if (singleEvent.user.level === this.user.level && singleEvent.user.id !== this.user.userId) {
          this.notHavePermission = true
        }
      }
      if (!this.user.canModifyUnderLevel) {
        if (singleEvent.user.level > this.user.level) {
          this.notHavePermission = true
        }
      }
    }
    if (!this.notHavePermission) {
      singleEventToPass.extendedProps.element.startDate = start
      singleEventToPass.extendedProps.element.endDate = end
      const param = JiraTask.moveToBackEnd(singleEventToPass.extendedProps.element, this.user)
      this.calendarService.updateEventFromCalendar(param, this.user, this.weekend).subscribe((result: any) => {
        this.updateFilterForPersonalTask();
      })
    }
  }
  /*
  * drag event on calendar
  */
  eventReceive(event: any): void {
    this.disableForm = false;
    this.singleEvent = event.event._def.extendedProps.element
    this.singleEvent.startDate = event.event._instance.range.start
    this.singleEvent.endDate = event.event._instance.range.end
    const userId = this.singleEvent.user?.id;
    if (userId !== this.user.userId) {
      if (!this.user.canModifyOverLevel) {
        if (this.singleEvent.user.level < this.user.level) {
          this.notHavePermission = true
        }
      }
      if (!this.user.canModifySameLevel) {
        if (this.singleEvent.user.level === this.user.level && userId !== this.user.userId) {
          this.notHavePermission = true
        }
      }
      if (!this.user.canModifyUnderLevel) {
        if (this.singleEvent.user.level > this.user.level) {
          this.notHavePermission = true
        }
      }
    }
    if (!this.notHavePermission) {
      if (event.event._def.extendedProps.isProject) {
        this.typeFromSidebar = this.fromSidebar.PROJECT
      } else if (event.event._def.extendedProps.isProject === false) {
        this.typeFromSidebar = this.fromSidebar.SUPPORT
      } else if (event.event._def.extendedProps.other) {
        this.typeFromSidebar = this.fromSidebar.OTHER
      }
      this.isEditMode = false
      this.canRemove = false
      this.singleEventBoolean = true
    }
  }
  /*
  * click on event
  */
  handleEventClick(event: EventClickArg) {
    this.disableForm = false;
    this.singleEvent = event.event._def.extendedProps.element
    this.isEditMode = true
    if (this.singleEvent.status === null) {
      this.typeFromSidebar = this.fromSidebar.OTHER
    } else {
      this.typeFromSidebar = this.fromSidebar.CALENDAR
    }
    if (!this.user.canModifyOverLevel) {
      if (this.singleEvent.user.level < this.user.level) {
        this.disableForm = true;
      }
    }
    if (!this.user.canModifySameLevel) {
      if (this.singleEvent.user.level === this.user.level && this.singleEvent.user.id !== this.user.userId) {
        this.disableForm = true;
      }
    }
    if (!this.user.canModifyUnderLevel) {
      if (this.singleEvent.user.level > this.user.level) {
        this.disableForm = true;
      }
    }
    this.canRemove = true
    this.singleEventBoolean = true
  }
  /*
  * Color for Personal Task
  */
  setPersonalTaskColor(task: TaskList, target: string): string {
    switch (task && task.status && task.status.id) {
      case this.statusENUM.TODO:
        if (target === 'backgroundColor') {
          return 'grey'
        } else if (target === 'borderColor') {
          return 'grey'
        } else if (target === 'textColor') {
          return 'white'
        }
        break;
      case this.statusENUM.PLANNED:
        if (target === 'backgroundColor') {
          return 'cornflowerblue'
        } else if (target === 'borderColor') {
          return 'cornflowerblue'
        } else if (target === 'textColor') {
          return 'white'
        }
        break
      case this.statusENUM.CLOSED:
        if (target === 'backgroundColor') {
          return 'lightgreen'
        } else if (target === 'borderColor') {
          return 'lightgreen'
        } else if (target === 'textColor') {
          return 'black'
        }
        break
      case this.statusENUM.FINISHED:
        if (target === 'backgroundColor') {
          return 'green'
        } else if (target === 'borderColor') {
          return 'green'
        } else if (target === 'textColor') {
          return 'white'
        }
        break;
      case this.statusENUM.WIP:
        if (target === 'backgroundColor') {
          return 'orange'
        } else if (target === 'borderColor') {
          return 'orange'
        } else if (target === 'textColor') {
          return 'white'
        }
        break
      default:
        if (target === 'backgroundColor') {
          return 'white'
        } else if (target === 'borderColor') {
          return 'white'
        } else if (target === 'textColor') {
          return 'black'
        }
    }
  }
  /*
  * create list of Personal tasks in calendar
  */
  createPersonalEventList(jiraTask: TaskList[]): void {
    this.events = [];
    jiraTask.forEach((element, index) => {
      const hourStart = this.dateService.setDateHourToDate(new Date(element.startDate), element.startTime)
      const hourEnd = this.dateService.setDateHourToDate(new Date(element.endDate), element.endTime)
      let allDayStart: Date | number = this.dateService.hourFromStringToDate(element.startTime)
      allDayStart = allDayStart.getHours()
      let allDayEnd: Date | number = this.dateService.hourFromStringToDate(element.endTime)
      allDayEnd = allDayEnd.getHours();
      const allDay = allDayEnd - allDayStart >= 9
      const singleEvent: eventsList = {
        id: element.taskId,
        title: this.selectedUserForCalendar.length > 1 ? element.user.name.substring(0, 6) + ' - ' + element.name : element.name,
        start: hourStart.date,
        allDay: allDay,
        end: hourEnd.date,
        className: allDay ? '' : 'not-allday',
        backgroundColor: this.setPersonalTaskColor(element, 'backgroundColor'),
        borderColor: this.setPersonalTaskColor(element, 'borderColor'),
        textColor: this.setPersonalTaskColor(element, 'textColor'),
        extendedProps: {
          element: element,
          id: index
        }
      }
      this.events.push(singleEvent);
    })
    let calendarEl = document.getElementById('time');
    this.options.events = this.events;
    let calendar = new Calendar(calendarEl as HTMLElement, this.options);
    calendar.render();
    this.setSignalOnCalendar()
  }
  /*
  * create list of tasks in sidebar
  */
  createEventsList(jiraTask: WrapperTasks): void {
    this.projectTaskList = [];
    if (jiraTask.projectTask.length > 0) {
      jiraTask.projectTask.forEach((element: JiraTask) => {
        const singleEvent: eventsList = {
          id: element.taskId,
          title: element.name,
          start: element.startDate,
          end: element.endDate,
          extendedProps: {
            element: element,
            isProject: true
          }
        }
        this.projectTaskList.push(singleEvent);
      })
    }
    this.supportTaskList = []
    this.numberPriority = []
    if (jiraTask.supportTask.length > 0) {
      const supportTask = this.groupBySLA(jiraTask.supportTask, 'sla');
      const array = []
      for (let support in supportTask) {
        this.numberPriority.push(support)
        array[support] = supportTask[support]
      }
      array.forEach(element => {
        if (element.length > 0) {
          element.forEach((element: JiraTask) => {
            const singleEvent: eventsList = {
              id: element.taskId,
              title: element.name,
              start: element.startDate,
              end: element.endDate,
              extendedProps: {
                element: element,
                isProject: false
              }
            }
            if (this.supportTaskList[String(element.sla)]?.length > 0) {
              this.supportTaskList[String(element.sla)].push(singleEvent);
            } else {
              this.supportTaskList[String(element.sla)] = [singleEvent];
            }
          }
          )
        }
      })
    }
    this.otherTaskList = [];
    if (jiraTask.otherTask?.length > 0) {
      jiraTask.otherTask.forEach((element: JiraTask) => {
        const singleEvent: eventsList = {
          id: element.taskId,
          title: element.name,
          start: element.startDate,
          end: element.endDate,
          extendedProps: {
            element,
            other: true
          }
        }
        this.otherTaskList.push(singleEvent);
      })
    }
    this.loadForm = true
    this.reloadDraggable()
  }
  /*
  * Function for calcolate number status types of support tasks 
  */
  lengthSupport(item: any, status: Status): number {
    return item.filter((e: { extendedProps: { element: { status: { id: Status; }; }; }; }) => e.extendedProps.element.status.id === status).length
  }
  /*
  * Function for calcolate number status types of project tasks 
  */
  lengthProject(item: string | number, status: Status): number {
    return this[item].filter((e: { extendedProps: { element: { status: { id: Status; }; }; }; }) => e.extendedProps.element.status.id === status).length
  }
  /*
  * Function for set task color 
  */
  setTaskColor(task: eventsList): string {
    if (task && task.extendedProps && task.extendedProps.element && task.extendedProps.element.status && task.extendedProps.element.status.id) {
      switch (task.extendedProps.element.status.id) {
        case this.statusENUM.TODO:
          task.backgroundColor = 'grey'
          task.borderColor = 'grey'
          return 'grey'
        case this.statusENUM.PLANNED:
          task.backgroundColor = 'cornflowerblue'
          task.borderColor = 'cornflowerblue'
          return 'blue'
        case this.statusENUM.CLOSED:
          task.backgroundColor = 'lightgreen'
          task.borderColor = 'lightgreen'
          task.textColor = 'black'
          return 'light-green'
        case this.statusENUM.FINISHED:
          task.backgroundColor = 'green'
          task.borderColor = 'green'
          return 'green'
        case this.statusENUM.WIP:
          task.backgroundColor = 'orange'
          task.borderColor = 'orange'
          return 'orange'
        default:
          return ''
      }
    } else {
      task.backgroundColor = 'white'
      task.borderColor = 'black'
      task.textColor = 'black'
      return ''
    }
  }
  /*
  * Function for click on task 
  */
  openEvent(event: any): void {
    this.disableForm = false;
    this.singleEvent = event.extendedProps.element
    this.singleEvent.startDate = new Date()
    this.isEditMode = false
    if (event.extendedProps?.isProject) {
      this.typeFromSidebar = this.fromSidebar.PROJECT
    } else if (event.extendedProps?.isProject === false) {
      this.typeFromSidebar = this.fromSidebar.SUPPORT
    } else if (event.extendedProps?.other) {
      this.typeFromSidebar = this.fromSidebar.OTHER
    }
    if (this.typeFromSidebar !== this.fromSidebar.OTHER) {
      if (!this.user.canModifyOverLevel) {
        if (this.singleEvent.user.level < this.user.level) {
          this.disableForm = true;
        }
      }
      if (!this.user.canModifySameLevel) {
        if (this.singleEvent.user.level === this.user.level && this.singleEvent.user.id !== this.user.userId) {
          this.disableForm = true;
        }
      }
      if (!this.user.canModifyUnderLevel) {
        if (this.singleEvent.user.level > this.user.level) {
          this.disableForm = true;
        }
      }
    }
    if (this.typeFromSidebar === this.fromSidebar.CALENDAR) {
      this.canRemove = true
    } else {
      this.canRemove = false
    }
    this.rightActive = false
    this.singleEventBoolean = true
  }
  /*
  * Function for set all task draggable
  */
  reloadDraggable(): void {
    setTimeout(() => {
      let calendarEl = document.getElementById('time');
      this.options.locale = this.translateService.currentLang === 'it' ? itLocale : undefined
      let calendar = new Calendar(calendarEl as HTMLElement, this.options)
      const draggableList = document.getElementById('list');
      if (draggableList) {
        new Draggable(draggableList as HTMLElement, {
          itemSelector: '.cool-event',
        });
      }
      if (this.router.url === '/home') {
        calendar.render()
      }
      this.setSignalOnCalendar()
      this.chDf.detectChanges()
    }, 500);
  }
  /*
  * Function for delete all tasks
  */
  deleteAllTask(): void {
    this.notHavePermission = false;
    if (this.rigthActiveElement.extendedProps.element.user.id !== this.user.userId) {
      if (!this.user.canModifyOverLevel) {
        if (this.rigthActiveElement.extendedProps.element.user.level < this.user.level) {
          this.notHavePermission = true;
        }
      }
      if (!this.user.canModifySameLevel) {
        if (this.rigthActiveElement.extendedProps.element.user.level === this.user.level && this.rigthActiveElement.extendedProps.element.user.id !== this.user.userId) {
          this.notHavePermission = true;
        }
      }
      if (!this.user.canModifyUnderLevel) {
        if (this.rigthActiveElement.extendedProps.element.user.level > this.user.level) {
          this.notHavePermission = true;
        }
      }
    }
    if (!this.notHavePermission) {
      const elements = this.events.filter((e) => e.extendedProps.element.taskId === this.rigthActiveElement.extendedProps.element.taskId)
      let message = ''
      if (elements.length > 1) {
        message = this.translateService.instant('agenda.deleteAllTask', { number: elements.length })
        this.deleteAllVisibleButton = true
      } else {
        message = this.translateService.instant('agenda.deleteSingleTask')
        this.deleteAllVisibleButton = false
      }
      const header = this.translateService.instant('general.attention')
      const icon = "pi pi-exclamation-triangle"
      this.rightActive = false;
      this.confirmationService.confirm({
        message,
        key: 'confirmation',
        header,
        icon,
        accept: () => {
          const deleteEvents: number[] = []
          elements.forEach(e => {
            deleteEvents.push(e.extendedProps.element.employeesAgendaId)
          })
          const deleteEvent = {
            ids: deleteEvents
          }
          this.calendarService.deleteEventFromCalendar(deleteEvent).subscribe(
            (result: any) => {
              this.messageService.add({ severity: 'success', summary: this.translateService.instant('general.request'), detail: this.translateService.instant('general.saveOk'), life: 2000 });
              this.reloadData();
            },
            (error: Error) => {
              this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorDelete'), life: 2000 })
              this.reloadData();
            })
        },
        reject: () => {
        }
      })
    }
  }
  /*
  * Function for delete single task
  */
  deleteSingleEvent(): void {
    const deleteEvent = {
      ids: [this.rigthActiveElement.extendedProps.element.employeesAgendaId]
    }
    this.calendarService.deleteEventFromCalendar(deleteEvent).subscribe(
      (result: any) => {
        this.messageService.add({ severity: 'success', summary: this.translateService.instant('general.request'), detail: this.translateService.instant('general.saveOk'), life: 2000 });
        this.reloadData();
      },
      (error: Error) => {
        this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorDelete'), life: 2000 })
        this.reloadData();
      })
  }
  /*
  * Function for go to Jira site and view the single task
  */
  goToJiraEvent(): void {
    window.open(this.singleEvent.jira.link, "_blank");
  }
  /*
  * Function for close event and show successfull toast
  */
  closeSingleEvent(event: boolean): void {
    this.singleEventBoolean = false;
    if (event) {
      this.messageService.add({ severity: 'success', summary: this.translateService.instant('general.request'), detail: this.translateService.instant('general.saveOk') });
    } else {
      this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorOperation') })
    }
    this.reloadData()
  }
  /*
  * Function for close event form when click on X close header 
  */
  closeSingleEventFromHeader(): void {
    this.singleEventBoolean = false
    this.updateFilterForPersonalTask()
  }
  /*
  * Function for reload calendar for adapat to viewport
  */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.reloadDraggable();
  }
  /*
  * Function for map timewiew of calendar
  */
  @HostListener('click', ['$event.target'])
  changeViewOfCalendar(event: { className: string | string[]; }) {
    if (event.className.includes('fc-timeGridDay-button')) {
      this.viewCalendar = 'timeGridDay'
      this.options.initialView = this.viewCalendar;
    } else if (event.className.includes('fc-timeGridWeek-button')) {
      this.viewCalendar = 'timeGridWeek'
      this.options.initialView = this.viewCalendar;
    } else if (event.className.includes('fc-dayGridMonth-button')) {
      this.viewCalendar = 'dayGridMonth'
      this.options.initialView = this.viewCalendar;
    }
    this.setSignalOnCalendar()
  }
  /*
  * Function for close right element div (div: delete task)
  */
  @HostListener('document:click', ['$event'])
  clickout() {
    (!this._el.nativeElement.className.includes('rightMenu')) ? this.rightActive = false : this.rightActive = true
  }

}
