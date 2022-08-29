import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { TableTypeENUM } from 'src/app/common/enum/table.enum';
import { PersonalCosts } from 'src/app/models/cost-item-types.models';
import { EmployeesType } from 'src/app/models/employees-type.models';
import { Employees } from 'src/app/models/employees.models';
import { IdName } from 'src/app/models/general.models';
import { PaginatedResponse } from 'src/app/models/paginated-response.model';
import { Roles } from 'src/app/models/role.models';
import { Sites } from 'src/app/models/sites.models';
import { RegistryTask, TasksType } from 'src/app/models/task.models';
import { User } from 'src/app/models/user.models';
import { CalendarService } from 'src/app/services/calendar.service';
import { RegistryService } from 'src/app/services/registry.service';

@Component({
  selector: 'app-registry-tables-form',
  templateUrl: './registry-tables-form.component.html',
  styleUrls: ['./registry-tables-form.component.css']
})
export class RegistryTablesFormComponent implements OnInit {
  /*
  * String to type of table to load
  */
  @Input() tableType: number
  /*
  * Object to edit
  */
  @Input() form: any
  /*
  * Boolean for create/update form
  */
  @Input() isEditMode: boolean
  /*
  * Close form at the end of operation
  */
  @Output() close = new EventEmitter<boolean>()
  /*
  * Boolean for ready form
  */
  loadForm: boolean = false
  /*
  * List of roles (select)
  */
  roleList: Roles[]
  /*
  * List of employeement (select)
  */
  employeementList: EmployeesType[]
  /*
  * List of AgendaType (select)
  */
  agendaTypeList: EmployeesType[]
  /*
  * loading boolean for button save
  */
  loading: boolean = false
  /*
  * User logged object
  */
  user: User
  /*
  * ENUM for TableType (registry links to table) 
  */
  tableTypeENUM = TableTypeENUM
 
  constructor(
    private registryService: RegistryService,
    private router: Router,
    private calendarService: CalendarService,
    private messageService: MessageService,
    private translateService: TranslateService
  ) {
    this.checkLogin();
  }


  checkLogin(): void {
    const user = localStorage.getItem('user')
    if (user) {
      this.user = JSON.parse(user);
    } else {
      this.router.navigateByUrl('login');
    }
  }


  ngOnInit(): void {
    switch (this.tableType) {
      case this.tableTypeENUM.USERS:
        if (this.isEditMode) {
          this.form = Employees.createInstance(this.form)
        } else {
          this.form = Employees.createNewInstance()
        }
         this.registryService.getEmployeesTypeList(1,1000).subscribe((result: PaginatedResponse<EmployeesType>) => {
          this.employeementList = result.list
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorGeneral') })
        })
        this.registryService.getRoleList(1,1000).subscribe((result: PaginatedResponse<Roles>) => {
          this.roleList = result.list
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorGeneral') })
        })
        break;
      case this.tableTypeENUM.USERTYPE:
        if (!this.isEditMode) {
          this.form = EmployeesType.createNewInstance()
        }
        break;  
      case this.tableTypeENUM.TASK: 
      if (this.isEditMode) {
        this.form = RegistryTask.createInstance(this.form)
      } else {
        this.form = RegistryTask.createNewInstance()
      }
      this.calendarService.getAgendaTypeList(1,1000).subscribe( (result:PaginatedResponse<EmployeesType>) => {
        this.agendaTypeList = result.list
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorGeneral') })
      })
      break;
      case this.tableTypeENUM.ROLES:
      if (!this.isEditMode) {
        this.form = Roles.createNewInstance()
      }
      break; 
      case this.tableTypeENUM.TASKTYPE:
      if (!this.isEditMode) {
        this.form = TasksType.createNewInstance()
      }
      break; 
      case this.tableTypeENUM.SITE:
        if (!this.isEditMode) {
          this.form = Sites.createNewInstance()
        }
        break; 
      case this.tableTypeENUM.PERSONALCOST:
          if (!this.isEditMode) {
            this.form = PersonalCosts.createNewInstance()
          }
        break;
      default:
        break;
    }
    this.loadForm = true
  }

  getEmployeesList(event: any): void {
    this.registryService.getEmployeesTypeList(1,1000).subscribe((result: PaginatedResponse<EmployeesType>) => {
      this.employeementList = result.list
    },
    (error: any) => {
      this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorGeneral') })
    })
  }

  getAgendaTypeList(event: any): void {
    this.calendarService.getAgendaTypeList(1,1000).subscribe((result: PaginatedResponse<EmployeesType>) => {
      this.agendaTypeList = result.list
    },
    (error: any) => {
      this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorGeneral') })
    })
  }

  getRoleList(event: any): void {
    this.registryService.getRoleList(1,1000).subscribe((result: PaginatedResponse<Roles>) => {
      this.roleList = result.list
    },
    (error: any) => {
      this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorGeneral') })
    })
  }

  saveEmployee(): void {
    this.loading = true
    switch (this.tableType) {
      case this.tableTypeENUM.USERS:
        if (this.isEditMode) {
          const param = Employees.updateInstace(this.form, this.user)
          this.registryService.updateEmployee(param, this.user).subscribe(result => {
            this.loading = false
            this.close.emit(true)
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorText') })
          })
        } else {
          const param = Employees.createNewInstanceForCreate(this.form)
          this.registryService.createEmployee(param, this.user).subscribe(result => {
            this.loading = false
            this.close.emit(true)
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorText') })
          })
        }
        break;
      case this.tableTypeENUM.USERTYPE: 
      if (this.isEditMode) {
        this.registryService.updateEmployeeType(this.form, this.user).subscribe(result => {
          this.loading = false
          this.close.emit(true)
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorText') })
        })
      } else {
        this.registryService.createEmployeeType(this.form, this.user).subscribe(result => {
          this.loading = false
          this.close.emit(true)
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorText') })
        })
      }
      break;
      case this.tableTypeENUM.TASK:
        this.form = {
          agendaTypeId: this.form.agendaType.id,
          name: this.form.name
        }
        this.registryService.createTask(this.form, this.user).subscribe(result => {
          this.loading = false
          this.close.emit(true)
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorText') })
        })
        break;
      case this.tableTypeENUM.ROLES:
        if (this.isEditMode) {
          const param = Roles.updateNewInstance(this.form)
          this.registryService.updateRole(param, this.user).subscribe(result => {
            this.loading = false
            this.close.emit(true)
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorText') })
          })
        } else {
          this.registryService.createRole(this.form, this.user).subscribe(result => {
            this.loading = false
            this.close.emit(true)
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorText') })
          })
        }
      break;  
      case this.tableTypeENUM.TASKTYPE:
        if (!this.isEditMode) {
          this.registryService.createTaskType(this.form, this.user).subscribe(result => {
            this.loading = false
            this.close.emit(true)
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorText') })
          })
        } else {
          const param = TasksType.createInstanceForUpdate(this.form, this.user)
          this.registryService.updateTaskType(param, this.user).subscribe(result => {
            this.loading = false
            this.close.emit(true)
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorText') })
          })
        }
      break;
      case this.tableTypeENUM.SITE:
        if (!this.isEditMode) {
          this.registryService.createSite(this.form, this.user).subscribe(result => {
            this.loading = false
            this.close.emit(true)
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorText') })
          })
        } else {
          const param = Sites.createInstanceForUpdate(this.form, this.user)
          this.registryService.updateSite(param, this.user).subscribe(result => {
            this.loading = false
            this.close.emit(true)
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorText') })
          })
        }
      break; 
      case this.tableTypeENUM.PERSONALCOST:
          this.registryService.createPersonalCost(this.form, this.user).subscribe(result => {
            this.loading = false
            this.close.emit(true)
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: this.translateService.instant('general.error'), detail: this.translateService.instant('general.errorText') })
          })
      break; 
      default:
        break;
    }
  }
}
