import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-query-modal',
  templateUrl: './query-modal.component.html',
  styleUrls: ['./query-modal.component.scss']
})
export class QueryModalComponent implements OnInit {
  queryForm: FormGroup;
  emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  mobilePattern: RegExp = /^[0-9]{10}$/;

  @ViewChild('queryModal') queryModal: ElementRef;

  constructor(private modalService:NgbModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.queryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.emailPattern)
      ])],
      hear_about: [null, Validators.required],
      solution: [null, Validators.required],
      message: ['', Validators.required],
      contact_number: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.mobilePattern)
      ])]
    })
  }

  openModal() {
    this.modalService.open(this.queryModal);
  }
}
