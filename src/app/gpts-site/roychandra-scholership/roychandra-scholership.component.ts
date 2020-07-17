import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HeaderService } from '../../shared/services/header.service';
import { ApiService } from '../../core/api.service';
import { NgForm } from '@angular/forms';

declare var $: any;
declare var jquery: any;
declare var AOS: any;

@Component({
  selector: 'app-roychandra-scholership',
  templateUrl: './roychandra-scholership.component.html',
  styleUrls: ['./roychandra-scholership.component.scss']
})
export class RoychandraScholershipComponent implements OnInit {

  registeredCheck: boolean = false;
  loggedIn: boolean = false;
  startDate: any = {
    year: 1980,
    month: 1,
    day: 1
  };
  todayObj: Date = new Date();
  today: any;
  countries: any;
  states: Array<any> = [];
  statesVar:string = 'Please select country first';
  standard:any;
  dobValue:any;
  currDate:any;
  dob:any;
  @ViewChild(NgForm) rcRegform: NgForm; 
  

  constructor(private headerService: HeaderService, public router: Router,public apiService: ApiService) { }

  ngOnInit() {
    setTimeout(()=>{
      this.headerService.loaderFunction(false);
      AOS.init();
    }, 2000);
    this.getUserInfo();
    this.today = {
      year: this.todayObj.getUTCFullYear(),
      month: this.todayObj.getUTCMonth() + 1,
      day: this.todayObj.getUTCDay()
    }
    
    this.getCountries();

  }

  roychandReg() {
    $("#roychandScholarshipReg").modal('show');
    
  }
  removeBootstrapModal() {
    $("#roychandScholarshipReg").modal('hide');
    this.rcRegform.resetForm();
   }

  openSignupModal() {
    if (this.registeredCheck) {
      this.router.navigate(['/user-signup'])
    } else {
      $("#signupModal").modal('show');
    }

  }
  getUserInfo() {
    this.headerService.userInfoLsObservable().subscribe(user => {
      if (typeof user != undefined && typeof user != 'string') {
        this.registeredCheck = true;
        this.loggedIn = user.is_eligible_for_dashboard;
      }
    })
  }
 getCountries() {
    this.apiService.getCountries().subscribe(val => {
      this.countries = val.data;
    })
  }
  getStates(data) {
    this.standard = data;
  }
  select(dob){  
    this.currDate = dob.year+'-'+String('00' + dob.month).slice(-2)+'-'+String('00' + dob.day).slice(-2);
    console.log(this.currDate);
  }

  roychandScholarshipReg(data){
  
    this.apiService.royalChandNotify({ "full_name" : data.fName, "email" : data.email, "contact_no" : data.contactno, "dob":this.currDate, "school":data.currSchool, "standard":this.standard}).subscribe(res => {
      if(res['status_code']==200){
        
         alert(res['message']);
         this.rcRegform.resetForm();
         $("#roychandScholarshipReg").modal('hide');
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


}
