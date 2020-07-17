import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HeaderService } from '../../shared/services/header.service';
import { ApiService } from '../../core/api.service';
import { NgForm } from '@angular/forms';

declare var $: any;
declare var jquery: any;
declare var AOS: any;


@Component({
  selector: 'app-faaart',
  templateUrl: './faaart.component.html',
  styleUrls: ['./faaart.component.scss']
})
export class FaaartComponent implements OnInit {
  notify_for:any;
  @ViewChild(NgForm) chregform: NgForm;
  constructor(private headerService: HeaderService, public router: Router,public apiService: ApiService) { }

  ngOnInit() {
    setTimeout(()=>{
      this.headerService.loaderFunction(false);
      AOS.init();
    }, 2000);
  }

  callregModal(notify_for) {
    this.notify_for=notify_for;
    console.log(notify_for);
    $("#greatChallengeNotify").modal('show');
    
  }
  
  greatChallengeNotify(notify_for,data){
    this.apiService.greatChallengeNotify({"notify_for":notify_for,"name" : data.name, "email" : data.email, "contact_no" : data.contact_no, 'school_name':data.school_name,'location':data.location}).subscribe(res => {
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
