import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";

import { HeaderService } from '../../shared/services/header.service';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var $: any;
@Component({
  selector: 'app-sfi',
  templateUrl: './sfi.component.html',
  styleUrls: ['./sfi.component.scss'],
})
export class SfiComponent implements OnInit {
  sfiConfig: any;
  signedUp:boolean = false;
  loggedIn: boolean = false;
  queryForm: FormGroup;

  @ViewChild('queryModal') queryModal: ElementRef ;

  constructor(private headerService: HeaderService, public modalService:NgbModal, public route: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    document.body.classList.add("sfi-body");
    setTimeout(() => {
      this.headerService.loaderFunction(false);
    });
    this.getUserInfo();
    this.sfiConfig = {
      grabCursor: true,
      slidesPerView: 'auto',
      direction: 'horizontal',
      watchOverflow: true,
      speed: 500,
      spaceBetween: 25,
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay	: {
        delay:2000,
        disableOnInteraction: true
      }
    }
  }

  // openModal() {
  //   this.modalService.open(this.queryModal);
  // }


  openSignupModal() {
    if (this.signedUp) {
      this.route.navigate(['/user-signup']);
    } else {
      $("#signupModal").modal('show');
    }
  }

  getUserInfo() {
    this.headerService.userInfoLsObservable().subscribe(user => {
      if (typeof user != undefined && typeof user != 'string') {
        this.signedUp = true;
        this.loggedIn = user.is_eligible_for_dashboard;
      }
    });
  }

  ngOnDestroy() {
    document.body.classList.remove("sfi-body");
  }

}
