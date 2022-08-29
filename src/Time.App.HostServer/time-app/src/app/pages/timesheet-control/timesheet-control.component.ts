import { AfterContentChecked, AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DateService } from 'src/app/services/date.service';
import { RegistryService } from 'src/app/services/registry.service';
import { CalendarService } from 'src/app/services/calendar.service';
import { ActiveLinkENUM } from 'src/app/common/enum/sidebar.enum';
import { IdName, IdNameLevel } from 'src/app/models/general.models';
import { InsertControlList } from 'src/app/models/insert-control.models';

@Component({
  selector: 'app-timesheet-control',
  templateUrl: './timesheet-control.component.html',
  styleUrls: ['./timesheet-control.component.css']
})
export class TimesheetControlComponent implements OnInit, AfterContentChecked, AfterViewChecked {
  /* 
  * Boolean for ready form
  */
  loadForm: boolean = false
  /* 
  * Boolean for loading table
  */
  loading: boolean 
  /*
  * Active link in Sidebar
  */
  activeLink: ActiveLinkENUM
  /*
  * ENUM for activeLink
  */
  activeLinkENUM = ActiveLinkENUM
  /*
  * List of users
  */
  userList: IdName[]
  /*
  * List of users to send to backend
  */
  usersSelected: IdNameLevel[] = []
  /*
  * Label in language onChange Filter User
  */
  labelUserMultiSelect: string
  /*
  * Start Date of filter
  */
  startDateFilter: Date
  /*
  * End Date of filter
  */
  endDateFilter: Date
  /*
  * Object of table
  */
  insertControlList: any[]
  /*
  * Header Dates format For t-body
  */
  headerFields: string[] = []
  /*
  * Header Dates format to string
  */
  headerTable: string[] = []
  /*
  * Header Dates in Date format
  */
  range: Date[]
  /*
  * String of lang in use
  */
  lang: string
  /*
  * Boolean for active/inactive weekend
  */
  weekend: boolean = false
  /*
  * Page to show
  */
  page: number = 1
  /*
  * List of Project in calendar filter
  */
  projectList: IdName[] = []
  /*
  * Selected projects in filter
  */
  selectedProject: number[] = []
  /*
  * Label in language onChange Filter Calendar project
  */
  selectedItemsLabelProjectForCalendar: string
  /*
  * List of Agenda Type in calendar filter
  */
  agendaTypeList: IdName[] = []
  /*
  * Agenda Type filtered
  */
  selectedAgendaType: number[] = []
 /*
  * Label in language onChange Filter agenda type
  */
  selectedItemsLabelAgendaType: string

  constructor(

    private chDef: ChangeDetectorRef,
    private translateService: TranslateService,
    private dateService: DateService,
    private calendarService: CalendarService,
    private registryService: RegistryService,
    private router: Router
  ) {
    this.translateService.onLangChange.subscribe((event: any) => {
      this.lang = this.translateService.currentLang
      this.range = this.dateService.datesArray(this.startDateFilter,this.endDateFilter, this.weekend)
      this.headerFields = this.dateService.fromDateToDayMonthStringArray(this.range)
      this.headerTable = this.dateService.fromDateToDayMonthStringArrayWithDayName(this.range, this.translateService.currentLang)
      this.setLabels()
    })
  }

  ngAfterContentChecked(): void {
    setTimeout(() => {
      this.chDef.detectChanges()
    }, 1);
  }

  ngAfterViewChecked(): void {
    this.chDef.detectChanges()
  }

  ngOnInit(): void {
    this.lang = this.translateService.currentLang
    this.activeLink = this.activeLinkENUM.CONTROLLOINSERIMENTI
    this.getUsersList()
    this.getAgendaTypeList()
    this.getProjectList()
    this.resetFilter()
  }

  // setObject(item: InsertControl[], dateToFind: Date, userId: number): any {
  //   let found = item.find(e => new Date(e.endDate).getTime() === dateToFind.getTime() && e.employeeId === userId);
  //   if (found) {
  //     return { user: found.employeeId , loggedHours: found.loggedHours }
  //   } else {
  //     return { user: userId , loggedHours: 0 }
  //   }
  // } 

  getUsersList(): void {
    this.registryService.getEmployerList().subscribe((result: IdName[]) => {
      this.userList = result
    })
  }

  getProjectList(): void {
    this.calendarService.getProjectList().subscribe(result => {
      this.projectList = this.registryService.sortDescriptionByField(result, 'name')
    })
  }

  getAgendaTypeList(): void {
    this.calendarService.getAgendaTypeList().subscribe(result => {
      this.agendaTypeList = this.registryService.sortDescriptionByField(result, 'name')
    })

  }

  toggleWeekend(event): void {
    this.weekend = event.checked
    this.updateRange()
  }

  getNameFromEmployesId(id: number) {
    if (id && this.userList?.length > 0) {
      return this.userList.find(x => x.id === Number(id)).name
    } else {
      return ''
    }
  }

  updateRange(event: string = ''): void {
    this.loadForm = false
    this.loading = true
    this.range = this.dateService.datesArray(this.startDateFilter,this.endDateFilter, this.weekend)
    this.headerFields = this.dateService.fromDateToDayMonthStringArray(this.range)
    this.headerTable = this.dateService.fromDateToDayMonthStringArrayWithDayName(this.range, this.translateService.currentLang)
    if (event === 'page') {
      this.page++
    }

    const param: InsertControlList = {
      employeeIds: this.usersSelected,
      startDate: this.dateService.fromDateToString(this.startDateFilter, '-', 'yyyy/MM/dd'),
      endDate: this.dateService.fromDateToString(this.endDateFilter, '-', 'yyyy/MM/dd'),
      page: this.page,
      pageSize: 15,
      taskIds: this.selectedProject ,
      projectIds: this.selectedAgendaType, 
      weekend: this.weekend
    }

    this.calendarService.getInsertControlList(param).subscribe((result: any) => {
      if (result.length > 0) {
        if (this.page > 1) {
            const newPage: any[]= Object.entries(this.groupByUser(result,'employeeId'))
            newPage.map( x => x.endDate = this.dateService.fromDateToDayMonthStringWithDayName(x.endDate, this.translateService.currentLang))
            this.insertControlList = this.insertControlList.concat(newPage)
        } else {
          this.insertControlList = Object.entries(this.groupByUser(result,'employeeId'))
          this.insertControlList.map( x => x.endDate = this.dateService.fromDateToDayMonthStringWithDayName(x.endDate, this.translateService.currentLang))
        }
      } else if (this.page === 1) {
        this.insertControlList = []
      }
      this.loadForm = true
      this.loading = false
      this.chDef.detectChanges()
    })
  }

  getTotal(event: any): number {
    let counter = 0
    event.forEach(e => {
      counter += e.loggedHours
    })
    return counter
  }


  goToAgenda(employeeId: number): void {
    console.log(employeeId[0].userId);
    this.router.navigate(['/home'],  { state: { insertControl: Number(employeeId['1'][0].userId) } } )
    
  }

  resetFilter(): void {
    this.usersSelected = []
    const date = new Date()
    this.startDateFilter = new Date(date.getFullYear(), date.getMonth(), 1)
    this.endDateFilter = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    this.selectedAgendaType = []
    this.selectedProject = []
    this.updateRange()
  }

  setLabels(): void {
    if (this.usersSelected && this.usersSelected.length > 0) {
      this.labelUserMultiSelect = String((this.usersSelected.length) + ' ' + this.translateService.instant('agenda.selectedUser'))
    }
    if (this.selectedProject && this.selectedProject.length > 0) {
      this.selectedItemsLabelProjectForCalendar = String((this.selectedProject.length) + ' ' + this.translateService.instant('agenda.selectedProject'))
    }
    if (this.selectedAgendaType && this.selectedAgendaType.length > 0) {
      this.selectedItemsLabelAgendaType = String((this.selectedAgendaType.length) + ' ' + this.translateService.instant('agenda.selectedAgendaType'))
    }
    this.chDef.detectChanges()
  }

  checkFilters(): boolean {
    const date = new Date()
    const start = new Date(date.getFullYear(), date.getMonth(), 1)
    const end  = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    return this.usersSelected.length === 0 && start.getTime() === this.startDateFilter.getTime() && end.getTime() === this.endDateFilter.getTime() && this.selectedAgendaType.length === 0 && this.selectedProject.length === 0
  }

  groupByUser(list: any, key: string = 'employeeId') {
    return list.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

}
