import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ActiveLinkENUM } from 'src/app/common/enum/sidebar.enum';
import { TableTypeENUM } from 'src/app/common/enum/table.enum';
import { PersonalCosts } from 'src/app/models/cost-item-types.models';
import { EmployeesType } from 'src/app/models/employees-type.models';
import { Employees } from 'src/app/models/employees.models';
import { PaginatedResponse } from 'src/app/models/paginated-response.model';
import { Roles } from 'src/app/models/role.models';
import { Sites } from 'src/app/models/sites.models';
import { RegistryTask, TasksType } from 'src/app/models/task.models';
import { RegistryService } from 'src/app/services/registry.service';
import { finalize, take } from 'rxjs/operators';
import { getCurrentPage, round } from 'src/app/common/functions';
import { firstEventForPagination } from 'src/app/models/general.models';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-registry-tables',
  templateUrl: './registry-tables.component.html',
  styleUrls: ['./registry-tables.component.css']
})

export class RegistryTablesComponent implements OnInit {

  @ViewChild('employee') tt: Table;
  /* 
  * Array for table "Impiegati"
  */
  //employees:Employees = []
        employees: PaginatedResponse<Employees>
  /* 
  * Array for table "Tipo impiegati"
  */
        employeesType: EmployeesType[] = []
  /* 
  * Array for table "Ruoli"
  */
        roles: Roles[] = []
  /* 
  * Array for table "Sedi"
  */
        sites: Sites[] = []
  /* 
  * Array for table "TaskType"
  */
        tasksType: TasksType[] = []
  /* 
  * String that decide which form to load 
  */
  tableType: any
  /* 
  * Boolean for ready to show/hidden table
  */
  loadForm: boolean = false
  /*
  * Active link in Sidebar
  */
  activeLink: ActiveLinkENUM
  /*
  * Active link ENUM
  */
  activeLinkENUM = ActiveLinkENUM
  /*
  * Boolean for open/close child form component
  */
  activeForm: boolean = false
  /*
  * Boolean for see list of roleNames
  */
  roleNameActiveForm: boolean = false
  /*
  * General object to edit (object for single form)
  */
  objectToEdit: any
  /*
  * Update or create mode (true = update, false = create)
  */
  isEditMode: boolean = false
  /*
  * ENUM for TableType (registry links to table) 
  */
  tableTypeENUM = TableTypeENUM
  /*
  * List of name with one role
  */
  roleListNames: string[]
  /*
  * String for filter table for name
  */
  searchString: string = ''
  /* 
  * Array for table "Costi"
  */
        personalCosts: PersonalCosts[] = []


  page: number = 1

  totalRecords: number = 0


  loading: boolean


  datasource: PaginatedResponse<Employees | EmployeesType | TasksType | RegistryTask | Roles | Sites | PersonalCosts>

  constructor(
    private location: Location,
    private registryService: RegistryService,
    private router: Router,
    private messageService: MessageService,
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
  ) {
  }

  ngOnInit(): void {
    this.activeLink = this.activeLinkENUM.ANAGRAFICHE
    this.tableType = this.location.getState()
    this.tableType = this.tableType.tableType 
    this.loadForm = true;
  }





  setTable(event: LazyLoadEvent) {
    if (this.searchString === '') {
      this.totalRecords = this.datasource ? this.datasource.count : 0;
      let page = this.totalRecords === 0 ? 1 : getCurrentPage(event.rows, event.first);
      page = round(page, 0);
      if (page == 0 || isNaN(page))
        page = 1;
      this.loading = true;
      switch (this.tableType) {
        case this.tableTypeENUM.USERS:
          this.registryService.getEmployeesList(page, event.rows).pipe(take(1), finalize(() => this.loading = false))
          .subscribe((result: PaginatedResponse<Employees>) => {
            this.datasource = result
            this.totalRecords = result.count;
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorGeneral'), life:2000 });
            this.router.navigate(['/registry'])
          } )
          break;
        case this.tableTypeENUM.USERTYPE:
           this.registryService.getEmployeesTypeList(page, event.rows).pipe(take(1), finalize(() => this.loading = false))
           .subscribe((result: PaginatedResponse<EmployeesType>) => {
            this.datasource = result
            this.totalRecords = result.count;
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorGeneral'), life:2000 });
            this.router.navigate(['/registry'])
          } ) 
        break;
        case this.tableTypeENUM.TASK:
          this.registryService.getTasksList(page, event.rows).pipe(take(1), finalize(() => this.loading = false))
          .subscribe((result: PaginatedResponse<RegistryTask>) => {
            this.totalRecords = result.count;
            this.datasource =  result
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorGeneral'), life:2000 });
            this.router.navigate(['/registry'])
          })
        break;  
        case this.tableTypeENUM.TASKTYPE:
          this.registryService.getTasksType(page, event.rows).pipe(take(1), finalize(() => this.loading = false))
          .subscribe((result: PaginatedResponse<TasksType>) => {
           this.totalRecords = result.count;
           this.datasource = result
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorGeneral'), life:2000 });
            this.router.navigate(['/registry'])
          } )
        break;
        case this.tableTypeENUM.ROLES:
          this.registryService.getRoleList(page, event.rows).pipe(take(1), finalize(() => this.loading = false))
          .subscribe(
            (result: PaginatedResponse<Roles>) => {
              this.totalRecords = result.count;
              this.datasource = result
            },
            (error: any) => {
            this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorGeneral'), life:2000 });
            this.router.navigate(['/registry'])
          } )
        break;
        case this.tableTypeENUM.SITE:  
        this.registryService.getSiteList(page, event.rows).pipe(take(1), finalize(() => this.loading = false))
        .subscribe((result: PaginatedResponse<Sites>) => {
          this.totalRecords = result.count;
          this.datasource = result
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorGeneral'), life:2000 });
          this.router.navigate(['/registry'])
        } )
        break;
        case this.tableTypeENUM.PERSONALCOST:  
        this.registryService.getPersonalCostList(page, event.rows).pipe(take(1), finalize(() => this.loading = false))
        .subscribe((result: PaginatedResponse<PersonalCosts>) => {
          this.totalRecords = result.count;
          this.datasource = result
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorGeneral'), life:2000 });
          this.router.navigate(['/registry'])
        } )
        break;
        default:
          this.router.navigate(['/registry'])
        break;
      }
    }
  }


  getRoleListNames(roleId: number):void {
    this.registryService.getEmployeesByRole(roleId).subscribe( (result: string[]) => {
      this.roleListNames = result.sort(function(a, b){
        if(a < b) { return -1; }
        if(a > b) { return 1; }
        return 0;
    })
      this.roleNameActiveForm = true
    })
  }

  openForm(info: any): void {
    this.objectToEdit = info
    this.isEditMode = true
    this.activeForm = true;
  }
  
  openNewForm(): void {
    this.objectToEdit = null
    this.isEditMode = false
    this.activeForm = true;
  }

  closeForm(event: any): void {
    this.activeForm = false
    if (event) {
      this.messageService.add({ severity: 'success', summary: this.translateService.instant('general.request'), detail: this.translateService.instant('general.saveOk'), life:2000 });
    }
    const eventDefault = new firstEventForPagination()
    this.setTable(eventDefault)
  }

  deleteEmployes(info: any): void {
    const message = this.translateService.instant('registry.wantDelete')
    const header = this.translateService.instant('general.attention')
    const icon = "pi pi-exclamation-triangle"
    this.confirmationService.confirm({
      message,
      key: 'delete',
      header,
      icon,
      accept: () => {
        switch (this.tableType) {
          case this.tableTypeENUM.USERS:
            this.registryService.deleteEmployee(info).subscribe(result => {
              this.messageService.add({ severity: 'success', summary: this.translateService.instant('general.request'), detail: this.translateService.instant('general.saveOk'), life:2000 });
              const eventDefault = new firstEventForPagination()
              this.setTable(eventDefault)
            },
            (error: any) => {
              this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.usedYet'), life:2000 });
            } )
            break;
          case this.tableTypeENUM.USERTYPE:
            this.registryService.deleteEmployeeType(info).subscribe(result => {
              this.messageService.add({ severity: 'success', summary: this.translateService.instant('general.request'), detail: this.translateService.instant('general.saveOk'), life:2000 });
              const eventDefault = new firstEventForPagination()
              this.setTable(eventDefault)
            },
            (error: any) => {
              this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.userTypeYet'), life:2000 });
            } )
            break;
          case this.tableTypeENUM.TASK:
            this.registryService.deleteTask(info).subscribe(result => {
              this.messageService.add({ severity: 'success', summary: this.translateService.instant('general.request'), detail: this.translateService.instant('general.saveOk'), life:2000 });
              const eventDefault = new firstEventForPagination()
              this.setTable(eventDefault)
            },
            (error: any) => {
              this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.taskYet'), life:2000 });
            } )
            break;  
          case this.tableTypeENUM.ROLES:
            this.registryService.deleteRole(info).subscribe(result => {
              this.messageService.add({ severity: 'success', summary: this.translateService.instant('general.request'), detail: this.translateService.instant('general.saveOk'), life:2000 });
              const eventDefault = new firstEventForPagination()
              this.setTable(eventDefault)
            },
            (error: any) => {
              this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.rolesYet'), life:2000 });
            } )
            break;  
            case this.tableTypeENUM.TASKTYPE:
              this.registryService.deleteTaskType(info).subscribe(result => {
                this.messageService.add({ severity: 'success', summary: this.translateService.instant('general.request'), detail: this.translateService.instant('general.saveOk'), life:2000 });
                const eventDefault = new firstEventForPagination()
                this.setTable(eventDefault)
              },
              (error: any) => {
                this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.tasktypeYet'), life:2000 });
              } )
              break;
              case this.tableTypeENUM.SITE:
                this.registryService.deleteSite(info).subscribe(result => {
                  this.messageService.add({ severity: 'success', summary: this.translateService.instant('general.request'), detail: this.translateService.instant('general.saveOk'), life:2000 });
                  const eventDefault = new firstEventForPagination()
                  this.setTable(eventDefault)
                },
                (error: any) => {
                  this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.siteYet'), life:2000 });
                } )
                break;
                case this.tableTypeENUM.PERSONALCOST:
                this.registryService.deletePersonalCost(info).subscribe(result => {
                  this.messageService.add({ severity: 'success', summary: this.translateService.instant('general.request'), detail: this.translateService.instant('general.saveOk'), life:2000 });
                  const eventDefault = new firstEventForPagination()
                  this.setTable(eventDefault)
                },
                (error: any) => {
                  this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.personalCostYet'), life:2000 });
                } )
                break;
          default:
            break;
        }
      },
      reject: () => {
      }
    })

   
  }



  back(): void {
    this.router.navigateByUrl('/registry')
  }


  applyFilterGlobal($event, stringVal) {
    this.tt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

}
