import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderService } from '../../shared/services/header.service';

@Component({
  selector: 'app-my-fav-videos-up',
  templateUrl: './my-fav-videos-up.component.html',
  styleUrls: ['./my-fav-videos-up.component.scss']
})
export class MyFavVideosUpComponent implements OnInit {
  currentJustify = 'center';
  constructor(public headerService:HeaderService, public router: Router) { }

  ngOnInit() {
    // this.headerService.dashboardHomeObservable().subscribe(val => {
    //   if (!val) {
    //     this.router.navigate(['student-dashboard', 'student-profile']);
    //   }
    // });
  }

  ngAfterViewInit() {

  }


}
