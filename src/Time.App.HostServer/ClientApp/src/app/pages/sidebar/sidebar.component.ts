import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveLinkENUM } from 'src/app/common/enum/sidebar.enum';
import { User } from 'src/app/models/user.models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  /*
  * Active link to select
  */
  @Input() sidebarStatus: boolean
  /*
  * Active link to select
  */
  @Input() activeLink: ActiveLinkENUM
  /*
  * Emit updateStatus
  */
  @Output() updateStatus = new EventEmitter<boolean>()
  /*
  * ENUM of active link
  */
  activeLinkENUM = ActiveLinkENUM
  /*
  * User logged Object
  */
  user: User

  constructor(private router: Router) {
      this.checkLogin()
    }


  ngOnInit(): void {
  }

  checkLogin(): void { 
    const user = localStorage.getItem('user')
    if (user) {
      this.user = JSON.parse(user);
    } else {
      this.router.navigateByUrl('login');
    }
  }

  goTo(page: string) {
    this.router.navigateByUrl('/' + page);
  }

  setStatus(event: boolean) {
    this.sidebarStatus = event
    this.updateStatus.emit(this.sidebarStatus)
  }

}
