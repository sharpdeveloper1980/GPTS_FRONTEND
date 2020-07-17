import { Component, OnInit, ViewChild} from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';
import { NgForm } from '@angular/forms';

declare var $: any;
declare var jquery: any;
declare var AOS: any;
@Component({
  selector: 'app-summer-school',
  templateUrl: './summer-school.component.html',
  styleUrls: ['./summer-school.component.scss']
})
export class SummerSchoolComponent implements OnInit {
  notify_for:any;
  @ViewChild(NgForm) chregform: NgForm;
  constructor(private apiService: ApiService, private headerService: HeaderService, public route: Router,config: NgbCarouselConfig) { }

  ngOnInit() {
    setTimeout(()=>{
      this.headerService.loaderFunction(false);
      AOS.init();
    }, 2000);
  }

  callregModal() {
    $("#greatChallengeNotify").modal('show');
    
  }

  greatChallengeNotify(data){
    this.apiService.summerSchoolRegis({"first_name" : data.first_name,"last_name":data.last_name, "email" : data.email, "contact_no" : data.contact_no, 'course':data.course}).subscribe(res => {
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
