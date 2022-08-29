import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { apiUrl } from '../globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /*
  * API url for servicess
  */
  apiUrl: string = apiUrl;
  /*
  * Current lang (IT in default)
  */
  currentLang: string;

  constructor(
    private router: Router,
    private titleService: Title,
    private primengConfig: PrimeNGConfig,
    private translate: TranslateService
  ) {

    this.translate.setDefaultLang('it');
    this.translate.use('it');
    this.currentLang = this.translate.currentLang;
  }

  
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.router.navigate(['./dashboard']);
  }

  setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

}
