import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { HeaderService } from '../../shared/services/header.service';
import { ApiService } from '../../core/api.service';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  contactForm: FormGroup;
  emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  contactType: Array<any>;
  mobilePattern: RegExp = /^[0-9]{10}$/;
  message: String;
  signedUp: boolean = false;
  loggedIn: boolean = false;

  @ViewChild('successModal') successModal: ElementRef

  constructor(private headerService: HeaderService, private fb: FormBuilder, private apiService: ApiService,
    public modalService: NgbModal, private route:Router) { }

  ngOnInit() {
    document.body.classList.add("contactus-body");
    this.createForm();
    setTimeout(() => {
      this.headerService.loaderFunction(false);
    });
  }

  createForm() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.emailPattern)
      ])],
      contact_type: [null, Validators.required],
      message: ['', Validators.required],
      contact: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.mobilePattern)
      ])]
    });

    this.contactType = [
      { 'name': 'Student' },
      { 'name': 'Institute' },
      { 'name': 'School' },
    ]
  }

  sendContactQuery() {
    if (this.contactForm.valid) {
      this.apiService.sendContactQuery(this.contactForm.value).subscribe(val => {
        if (val.code == 200) {
          this.message = val.message;
          this.openModal();
        }
      },
        error => {
          console.log(error);
        }
      )
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

  openSignupModal() {
    if (this.signedUp) {
      this.route.navigate(['/user-signup']);
    } else {
      $("#signupModal").modal('show');
    }
  }



  openModal() {
    this.modalService.open(this.successModal);
  }

  ngOnDestroy() {
    document.body.classList.remove("contactus-body");
  }

}
