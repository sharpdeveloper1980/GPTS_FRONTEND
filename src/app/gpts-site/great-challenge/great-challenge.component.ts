import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';
import { NgForm } from '@angular/forms';

declare var $: any;
declare var AOS: any;

@Component({
  selector: 'app-great-challenge',
  templateUrl: './great-challenge.component.html',
  styleUrls: ['./great-challenge.component.scss']
})
export class GreatChallengeComponent implements OnInit {
  
  notify_for:any;
  @ViewChild(NgForm) chregform: NgForm;

  constructor(private headerService: HeaderService, public router: Router,public apiService:ApiService) { }
  
  ngOnInit() {
    setTimeout(()=>{
      this.headerService.loaderFunction(false);
    }, 2000);
  }

  callregModal(notify_for) {
    this.notify_for=notify_for;
    $("#greatChallengeNotify").modal('show');
    
  }
  
  greatChallengeNotify(notify_for,data){
    this.apiService.greatChallengeNotify({"notify_for":notify_for,"name" : data.name, "email" : data.email, "contact_no" : data.contact_no}).subscribe(res => {
      if(res['status_code']==200){
         alert(res['message']);
         this.chregform.resetForm();
         $("#greatChallengeNotify").modal('hide');
      }else
      if(res['status_code']==400){
        var msg="Please fix the below errors messages:\n\n";
        for(var i=0;i<res['message'].length;i++){
          msg+=i+1+".) "+res['message'][i]+"\n";
        }
        alert(msg);
      }
    });
  }

  removeBootstrapModal() {
    $("#greatChallengeNotify").modal('hide');
   
    
  }

}