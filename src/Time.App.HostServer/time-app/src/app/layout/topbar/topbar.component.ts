import { registerLocaleData } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import localeIt from '@angular/common/locales/it';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ActiveLinkENUM } from 'src/app/common/enum/sidebar.enum';
import { User } from 'src/app/models/user.models';
import { NameCode } from 'src/app/models/general.models';
registerLocaleData(localeIt, 'it');


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopBarComponent implements OnInit {
  /*
  * View Child of Sidebar
  */
  @ViewChild(SidebarComponent, {static : true}) child : SidebarComponent;
  /*
  * Active link to select
  */
  @Input() activeLink: ActiveLinkENUM
  /*
  * User logged
  */
  user: User
  /*
  * Date of today
  */
  todayDate: Date = new Date()
  /*
  * Lang used
  */
  language: string
  /*
  * Active Sidebar
  */
  visibleSidebar: boolean = false
   /*
  * Open Submenu Overlay
  */
  openUserSubmenu: boolean = false

  languages: NameCode[] = [
    {
      code: 'it',
      name: 'Italiano'
    },
    {
      code: 'en',
      name: 'English'
    },
]

selectedLanguage: NameCode

  constructor(private router: Router,
    private translateService: TranslateService) {
      this.checkLogin()
    }

  ngOnInit(): void {
    this.language = this.translateService.currentLang
    this.selectedLanguage = {
      code: 'it',
      name: 'Italiano'
    }
  }


  goTo(link: string): void {
    this.router.navigateByUrl('/' + link);
  }

  checkLogin(): void {
    const user = localStorage.getItem('user')
    if (user) {
      this.user = JSON.parse(user)
    } else {
      this.router.navigateByUrl('login')
    }
  }

  translate(selectedLanguage: NameCode): void {
    this.translateService.use(selectedLanguage.code)
    this.language = selectedLanguage.code
  }

  setStatus(event: boolean):void {
    this.visibleSidebar = event
  }

  userInitial(): string {
    const userInitial = this.user.name.split(' ')
    return userInitial[0].substring(0, 1) + userInitial[1].substring(0, 1)
  }

  openJira(): void {
    window.open('https://retailitalia12.atlassian.net/jira/projects', '_blank')
  }

  changeLanguage(lang: string):void {
    this.translateService.use(lang)
    this.language = lang
  }

  checkLanguage(): string {
    return this.translateService.currentLang === 'it' ? 'it' : 'en' 
  }


  openSidebar(): void {
    this.visibleSidebar = true
    //this.child.setStatus(this.visibleSidebar)
  }


  logout(): void {
    localStorage.removeItem('user')
    this.router.navigateByUrl('login')
  }




}
