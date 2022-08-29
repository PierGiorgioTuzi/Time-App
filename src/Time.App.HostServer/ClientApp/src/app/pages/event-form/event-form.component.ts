import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { FromSidebar } from 'src/app/common/enum/sidebar.enum';
import { Status } from 'src/app/common/enum/status.enum';
import { formatDate, IdName, IdNameLevel } from 'src/app/models/general.models';
import { JiraFormBackEnd, JiraFormFrontEnd, JiraTask } from 'src/app/models/jira.models';
import { PaginatedResponse } from 'src/app/models/paginated-response.model';
import { User } from 'src/app/models/user.models';
import { DateService } from 'src/app/services/date.service';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  /*
  * ViewChild for calendar
  */
  @ViewChild('range') calendar: any
  /*
  * Boolean to close the event-form
  */
  @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>()
  /*
  * selected event
  */
  @Input() event: JiraTask
  /*
  * Type of selected event 
  */
  @Input() typeFromSidebar: FromSidebar
  /*
  * Object of logged user 
  */
  @Input() user: User
  /*
  * Boolean for can/can't delete single event
  */
  @Input() canRemove: boolean
  /*
  * Boolean for enable/disable form (permissions)
  */
  @Input() disabledForm: boolean
  /*
  * Boolean for enable/disable weekend
  */
  @Input() weekend: boolean
  /*
  * All events in calendar
  */
  @Input() calendarEvents: any[]
  /*
  * All events in calendar
  */
  @Input() isEditMode: boolean
  /*
  * List of users
  */
  userList: IdNameLevel[]
  /*
  * List of Agenda Type
  */
  agendaTypeList: IdName[]
  /*
  * Event trasformed for front-end
  */
  dragEvent: JiraFormFrontEnd
  /*
  * Boolean for active form
  */
  loadForm: boolean = false
  /*
  * ENUM for status
  */
  statusENUM = Status
  /*
  * ENUM for sidebar
  */
  fromSidebar = FromSidebar
  /*
  * Loading gif on buttons
  */
  loading: boolean = false
  /*
  * List of status
  */
  statusList: IdName[]
  /*
  * Boolean for disabled status
  */
  disabledStatus: boolean = false
  /*
   * Boolean for p-dialog not-have-permission
   */
  notHavePermission: boolean = false
  /*
  * List of site
  */
  siteList: IdName[]
  /*
  * List of projects
  */
  projectList: any[]
  /*
  * Disability form if is closed
  */
  disabilityStatus: boolean = false



  constructor(private calendarService: CalendarService,
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private dateService: DateService) { }



  ngOnInit(): void {
    this.getSiteList();
    this.dragEvent = JiraTask.fromJiraTaskToJiraFormFrontEnd(this.event, this.typeFromSidebar, this.user);
    if (this.dragEvent.status?.id === Status.CLOSED) {
      this.disabilityStatus = true
    }
    if (this.typeFromSidebar !== this.fromSidebar.OTHER) {
      if (this.event.status?.id === Status.CLOSED) {
        this.disabledStatus = true;
      }
    }
    if ((!this.user.canModifyOverLevel && this.dragEvent.user.level < this.user.level) ||
      (!this.user.canModifyUnderLevel && this.dragEvent.user.level > this.user.level) ||
      !this.user.canModifySameLevel && this.dragEvent.user.level === this.user.level && this.dragEvent.user.id !== this.user.userId) {
      this.disabledForm = true;
    }
    this.loadForm = true
  }

  getProjectList(): void {
    this.calendarService.getProjectList().subscribe(result => {
      this.projectList = result
    })
  }


  checkPermission(event: User): void {
    if ((!this.user.canModifyOverLevel && event.level < this.user.level) ||
      (!this.user.canModifyUnderLevel && event.level > this.user.level) ||
      !this.user.canModifySameLevel && event.level === this.user.level && this.dragEvent.user.id !== this.user.userId) {
      this.disabledForm = true;
    } else {
      this.disabledForm = false
    }
  }


  getStatusList(): void {
    this.calendarService.getStatusList().subscribe((result: IdName[]) => {
      this.statusList = result
      if (this.event.status.id === Status.TODO) {
        this.statusList = this.statusList.filter(e => e.id === Status.CLOSED || e.id === Status.PLANNED || e.id === Status.WIP)
      } else if (this.event.status.id === Status.WIP) {
        this.statusList = this.statusList.filter(e => e.id === Status.WIP || e.id === Status.CLOSED || e.id === Status.PLANNED)
      } else if (this.event.status.id === Status.PLANNED) {
        this.statusList = this.statusList.filter(e => e.id === Status.PLANNED || e.id === Status.CLOSED)
      } else if (this.event.status.id === Status.CLOSED || this.event.status.id === Status.FINISHED ) {
        this.statusList = this.statusList.filter(e => e.id === Status.CLOSED)
      }
    })
  }

  setStatus(status: Status): void {
    this.dragEvent.status = this.statusList.find((e: IdName) => e.id === status) as IdName
    this.dragEvent.statusFrontEnd = status
  }


  getUsersList(query: any): void {
    this.calendarService.getUsersList().subscribe((result: IdNameLevel[]) => {
      if (query.query) {
        this.userList = result
      }
      if (!this.user.canSeeSameLevel) {
        this.userList = this.userList.filter(e => e.level !== this.user.level || e.id === this.user.userId)
      }
      if (!this.user.canSeeUnderLevel) {
        this.userList = this.userList.filter(e => e.level > this.user.level || e.id === this.user.userId)
      }
      if (!this.user.canSeeOverLevel) {
        this.userList = this.userList.filter(e => e.level < this.user.level || e.id === this.user.userId)
      }
    })
  }


  getAgendaType(): void {
    this.calendarService.getAgendaTypeList(1,1000).subscribe((result: PaginatedResponse<IdName>) => {
      this.agendaTypeList = result.list
    })
  }

  getSiteList(): void {
    this.calendarService.getSiteList().subscribe((result: IdName[]) => {
      this.siteList = result
    })
  }


  createEvent(): void {
    this.loading = true;
    if (this.typeFromSidebar === this.fromSidebar.CALENDAR || this.isEditMode) {
      const param = JiraTask.fromJiraTaskToJiraCalendarEventBackEnd(this.dragEvent, this.user)
      this.calendarEvents.filter(e => formatDate(e.start) >= param.startDate && formatDate(e.end) <= param.endDate)
      this.calendarService.updateEventFromCalendar(param, this.user, this.weekend).subscribe(
        (result: JiraFormBackEnd) => {
          this.loading = false;
          this.closed.emit(true)
        },
        (error: any) => {
          this.closed.emit(false)
        })
    } else {
      const param = JiraTask.fromJiraFormFrontEndtoJiraTaskBackEnd(this.dragEvent)
      this.calendarService.createEventFromSidebar(param, this.user, this.weekend).subscribe(
      (result: JiraFormBackEnd) => {
        this.loading = false;
        this.closed.emit(true)
      },
      (error: any) => {
        this.closed.emit(false)
      })
    }
  }


  setTime(typeOfTime: string): void {
    if (typeOfTime === 'startTime') {
      this.dragEvent.startTime.setMinutes(0)
    } else {
      this.dragEvent.endTime.setMinutes(0)
    }
  }

  deleteEvent(): void {
    const message = this.translateService.instant('agenda.deleteSingleTask')
    const header = this.translateService.instant('general.attention')
    const icon = "pi pi-exclamation-triangle"
    this.confirmationService.confirm({
      message,
      header,
      key: 'confirmationDelete',
      icon,
      acceptLabel: this.translateService.instant('general.yes'),
      accept: () => {
        this.loading = true;
        const param = {
          ids: this.dragEvent.employeesAgendaId
        }
        this.calendarService.deleteEventFromCalendar(param).subscribe((result: JiraFormBackEnd) => {
          this.loading = false;
          this.closed.emit(true)
        },
      (error: any) => {
        this.closed.emit(false)
      })
      },
      reject: () => {
      }
    })
  }

}
