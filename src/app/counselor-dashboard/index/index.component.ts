import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';

declare var $: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit, OnDestroy {
  sidebarToggle: boolean = true;

  constructor(public router: Router, public apiService: ApiService,public headerService: HeaderService) {
    let user = JSON.parse(localStorage.getItem('userGpts'));
    console.log("index",user);
    if (user == null) {
      this.router.navigate(['/', 'home']);
      return;
    } else if (user.usertype != 5) {
      this.router.navigate(['/', 'home']);
      return;
    }

   }

  ngOnInit() {
  }

  ngAfterViewInit() {
    
    $('app-footer').css('display', 'none');
 
   }
   ngOnDestroy() {
     $('app-footer').css('display', 'block');
   }
}
