import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { forkJoin } from 'rxjs';
import { ActiveLinkENUM } from 'src/app/common/enum/sidebar.enum';
import { PersonalCosts } from 'src/app/models/cost-item-types.models';
import { SearchIdNameStaffPrice, StaffPrice } from 'src/app/models/employees-yearly-cost.models';
import { firstEventForPagination, IdName, IdNameLevel } from 'src/app/models/general.models';
import { PaginatedResponse } from 'src/app/models/paginated-response.model';
import { SignleRole } from 'src/app/models/role.models';
import { User } from 'src/app/models/user.models';
import { CalendarService } from 'src/app/services/calendar.service';
import { RegistryService } from 'src/app/services/registry.service';
import { StaffPriceService } from 'src/app/services/staff-price.service';

@Component({
  selector: 'app-staff-price',
  templateUrl: './staff-price.component.html',
  styleUrls: ['./staff-price.component.css']
})
export class StaffPriceComponent implements OnInit {

  /*
  * ViewChild of table 
  */
  @ViewChild('myTable', { static: false }) table: Table;
  /*
  * Active link in Sidebar
  */
  activeLink: ActiveLinkENUM
  /*
  * ENUM for activeLink in sidebar
  */
  activeLinkENUM = ActiveLinkENUM
  /*
  * Object of user logged 
  */
  user: User
  /*
  * Staff price list Object
  */
  staffPriceList: StaffPrice[]
  /*
  * Boolean for form ready or not
  */
  loadForm: boolean = false
  /*
  * Array of years
  */
  yearsList: number[]
  /*
  * Array for selected Year to send to backend
  */
  userYearSelected: number[]
  /*
  * List of users
  */
  userList: IdName[]
  /*
  * List of users to send to backend
  */
  usersSelected: IdNameLevel[]
  /*
  * List of roleId
  */
  roleList: SignleRole[] = []
  /*
  * List of cost items
  */
  costItemList: PersonalCosts[]
    /*
  * List of cost items
  */
  costItemSelected: IdName[]
  /*
  * Label in language onChange Filter User
  */
  labelUserMultiSelect: string
  /*
  * Label in language onChange Filter Year 
  */
  labelYearMultiSelect: string
  /*
  * Label in language onChange Filter cost item 
  */
  labelCostItemMultiSelect: string
  /*
  * Object of StaffPrice on focus for check if the value is dirty or not
  */
  oldValue: string
  /*
  * Boolean for loading spinner table
  */
  loading: boolean = true
  /*
  * Year for importer excel
  */
  yearForImporter: number
  /*
  * boolean for modificable cost or not
  */
  changeableCosts: boolean = false
  page: number = 1

  totalRecords: number = 0



  constructor(
    private staffPriceService: StaffPriceService,
    private calendarService: CalendarService,
    private router: Router,
    private translateService: TranslateService,
    private messageService: MessageService,
    private chDef: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private registryService: RegistryService
  ) {
    this.checkLogin();
  }

  ngOnInit(): void {
    this.activeLink = this.activeLinkENUM.COSTOPERSONALE
    this.setYears(true)
    this.loadList()
    this.usersSelected = []
    this.costItemSelected = []
    const eventDefault = new firstEventForPagination()
    this.updateStaffPriceList(eventDefault)
  }

  getUsersList(): void {
    this.calendarService.getEmployerList(1,1000).subscribe((result: PaginatedResponse<IdName>) => {
      this.userList = result.list
    })
  }


  importExcel(event: any): void {
    const file = event.currentTarget.files[0];
    const message = this.translateService.instant('staffPrice.loadExcel', {name: file.name, year:this.yearForImporter })
    const header = this.translateService.instant('general.attention')
    this.confirmationService.confirm({
      message,
      key: 'confirmationExcel',
      header,
      accept: () => {
        this.staffPriceService.uploadExcel(this.yearForImporter, file, this.user).subscribe( 
          (result: any) => {
           this.messageService.add({ 
              severity: 'success', summary: this.translateService.instant('general.request'), 
              detail: this.translateService.instant('general.saveOk'), life:2000 
            })
           const excel = document.querySelector('#excel') as any
           excel.value = ''
           const eventDefault = new firstEventForPagination()
           this.updateStaffPriceList(eventDefault)
         },
          (error: any) => {
           const excel = document.querySelector('#excel') as any
           excel.value = ''
           this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorExcel'), life:2000 })
          })
      },
      reject: () => {
        const excel = document.querySelector('#excel') as any
        excel.value = ''
      }

    }) 
  }

  goToAgenda(item: number): void {
      this.router.navigate(['/home'],  { state: { userSelected: item } } );
  }

  getCostiItemList(query: any): any {
    this.staffPriceService.getCostItemTypesList(1,1000).subscribe((result: PaginatedResponse<PersonalCosts>) => {
      this.costItemList = result.list
      if (this.changeableCosts) {
        this.costItemList = this.costItemList.filter(e => e.canModifyForWorker || e.canModifyForThirdPart)
      }
    })
  }


  changeTypeCost(event: { checked: boolean; }): void {
    this.changeableCosts = event.checked
    this.costItemSelected = []
    this.getCostiItemList('')
    const eventDefault = new firstEventForPagination()
    this.updateStaffPriceList(eventDefault)
  }

  loadList(): void {
    forkJoin(
      {
        users: this.calendarService.getEmployerList(1,1000),
        costItem: this.staffPriceService.getCostItemTypesList(1,1000),
        roleList: this.registryService.getEmployeesList(1, 1000) 
      }
    ).subscribe(
      (result: any) => {
        this.userList = result.users
        this.costItemList = result.costItem.list
        result.roleList.list.forEach((element: { role: { roleId: number; name: string; }; }) => {
          const singleRole: SignleRole = {
            roleId: element.role.roleId,
            name: element.role.name
            }
            this.roleList.push(singleRole)
        });
        this.roleList = this.roleList.filter((v,i,a)=>a.findIndex(v2=>(v2.roleId===v.roleId))===i)       
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorText') })
      },
    )
  }

  updateStaffPriceList(event: LazyLoadEvent): void {
    this.loading = true
    const filter: SearchIdNameStaffPrice = {
      years: this.userYearSelected,
      employeeIds: this.usersSelected,
      costItemTypeIds: this.costItemSelected
    }
    this.staffPriceService.getStaffPriceList(filter).subscribe( (result: StaffPrice[])  => {
      this.staffPriceList = result
      if (this.changeableCosts) {
        this.staffPriceList = this.staffPriceList.filter(e => e.canModifyForWorker || e.canModifyForThirdPart)
      }
      this.loadForm = true
      this.loading = false
    })
  }



  updateFromFilter(): void {
    const eventDefault = new firstEventForPagination()
    this.updateStaffPriceList(eventDefault)
    this.setLabels()
  }

  getTotal(item:any): number {
    return item.january + item.february +
    item.march + item.april + item.may +
    item.july + item.june + item.august +
    item.september + item.october + item.november + item.december
  }

  resetFilter(): void {
    this.setYears(true)
    this.usersSelected = []
    this.costItemSelected = []
    this.changeableCosts = false
    const eventDefault = new firstEventForPagination()
    this.updateStaffPriceList(eventDefault)
  }

  getCostItemTypesList(): void {
    this.staffPriceService.getCostItemTypesList(1,1000).subscribe( (result: PaginatedResponse<PersonalCosts>) => {
      this.costItemList = result.list
    })
  }

  setLabels(): void {
    if (this.userYearSelected && this.userYearSelected.length > 0) {
      this.labelYearMultiSelect = String((this.userYearSelected.length) + ' ' + this.translateService.instant('staffPrice.selectedYear'))
    }
    if (this.usersSelected && this.usersSelected.length > 0) {
      this.labelUserMultiSelect = String((this.usersSelected.length) + ' ' + this.translateService.instant('agenda.selectedUser'))
    }
    if (this.costItemSelected && this.costItemSelected.length > 0) {
      this.labelCostItemMultiSelect = String((this.costItemSelected.length) + ' ' + this.translateService.instant('staffPrice.selectedCost'))
    }
    this.chDef.detectChanges()
  }

  checkInfo(item: StaffPrice): void {
    this.oldValue = JSON.stringify(item)    
  }

  setYears(firstLoad: boolean = false): void {
    const date = new Date()
    const currentYear = date.getFullYear()  
    this.yearsList = []
    for (let i = 2021; i <= currentYear + 10;i++) {
      this.yearsList.push(i)
    }
    if (firstLoad) {
      this.userYearSelected = [currentYear]
    }
  }

  updateStaffPrice(item: StaffPrice): void {
    if (JSON.stringify(item) !== this.oldValue) {
      this.staffPriceService.updateStaffPrice(item, this.user).subscribe(result => {
        this.messageService.add({ severity: 'success', summary: this.translateService.instant('general.request'), detail: this.translateService.instant('general.saveOk'), life:2000 });
        const eventDefault = new firstEventForPagination()
        this.updateStaffPriceList(eventDefault)
      })
    } 
  }

  checkFilters(): boolean {
    const year = new Date().getFullYear()
    return this.costItemSelected.length === 0 && this.usersSelected.length === 0 && this.userYearSelected.includes(year) && this.userYearSelected.length === 1 && !this.changeableCosts
  }

  checkLogin(): void {
    const user = localStorage.getItem('user')
    if (user) {
      this.user = JSON.parse(user)
    } else { 
      this.router.navigateByUrl('login')
    }
  }


}
