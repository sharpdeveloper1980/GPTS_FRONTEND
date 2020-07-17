import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../shared/services/header.service';
import { Router, ActivatedRoute } from "@angular/router";
declare var $: any;
declare var AOS: any;

@Component({
  selector: 'app-getdiscover',
  templateUrl: './getdiscover.component.html',
  styleUrls: ['./getdiscover.component.scss']
})
export class GetdiscoverComponent implements OnInit {

  homeVideoThumb  : string;
  homeVideoUrl    : string;
  homeVideo       : string;
  
  constructor(private headerService: HeaderService,public router: Router) { }
  registeredCheck: boolean = false;
  ngOnInit() {
    setTimeout(() => {
      this.headerService.loaderFunction(false);
    }, 2000);
  }

  openSignupModal() {
    if (this.registeredCheck) {
      this.router.navigate(['/user-signup'])
    } else {
      $("#signupModal").modal('show');
    }

  }

}
