import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveLinkENUM } from 'src/app/common/enum/sidebar.enum';
import { TableTypeENUM } from 'src/app/common/enum/table.enum';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {
  /* 
  * Boolean for ready form
  */
  loadForm: boolean = false
  /*
  * Active link in Sidebar
  */
  activeLink: ActiveLinkENUM
  /*
  * ENUM for activeLink
  */
  activeLinkENUM = ActiveLinkENUM
  /*
  * ENUM for tableType to send in registry tables
  */
  tableTypeENUM = TableTypeENUM
  
  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activeLink = this.activeLinkENUM.ANAGRAFICHE
    this.loadForm = true;
  }


  goTo(param: number) {
    this.router.navigate(['/registry-tables'],  { state: { tableType: param } } )
  }




}
