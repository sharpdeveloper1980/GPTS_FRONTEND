import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss'],
  providers: [ApiService]
})
export class UserSignupComponent implements OnInit {
  signUpFormStudent: FormGroup;
  regFormInstitue: FormGroup;
  signUpFormUniv: FormGroup;
  signUpFormSchool: FormGroup;
  countries: any;
  states: Array<any> = [];
  userSignUp: boolean;
  errorVar: boolean = false;
  errorMessage: any;
  userGpts: any;
  userType: any;
  collegeTypeList: any;
  departmentList: any;
  todayObj: Date = new Date();
  today: any;
  startDate: any = {
    year: 1980,
    month: 1,
    day: 1
  };
  statesVar:string = 'Please select country first';
  errMessage: string = '';

  @ViewChild('errorContainer') errorContainer: ElementRef;

  constructor(public apiService: ApiService, public headerService: HeaderService, public router: Router) { }

  ngOnInit() {
    this.today = {
      year: this.todayObj.getUTCFullYear(),
      month: this.todayObj.getUTCMonth() + 1,
      day: this.todayObj.getUTCDay()
    }
    console.log(this.today);
    document.body.classList.add("user-signup-body");

    // to check if user has signedup
    this.headerService.userSignupObservable().subscribe(val => {
      this.userSignUp = val;
    });
    if (!this.userSignUp) {
      this.router.navigate(['/', 'home']);
    } else {
      this.userGpts = JSON.parse(localStorage.getItem('userGpts'));
      this.setFormValue(this.userGpts);
    }
    // to check if user has registred
    this.headerService.userRegisteredObservable().subscribe(val => {
      if (val === undefined) {
        return;
      } else if (val && this.userGpts.usertype == 1) {
        this.router.navigate(['/', 'student-dashboard']);
      }
    });



    // Create register form
    this.createForm();

    // Get countries online
    this.getCountries();
  }

  ngOnDestroy() {
    document.body.classList.remove("user-signup-body");
  }

  createForm() {
    this.signUpFormStudent = new FormGroup({
      //student_type: new FormControl('', Validators.required),
      student_type: new FormControl('1'),
      student_dob_dp: new FormControl('', Validators.required),
      student_FirstName: new FormControl('', Validators.required),
      student_LastName: new FormControl('', Validators.required),
      student_address: new FormControl('', Validators.required),
      student_pincode: new FormControl('',
        Validators.compose([
          Validators.pattern('[0-9]*'),
          Validators.required
        ])),
      student_country: new FormControl('', Validators.required),
      student_state: new FormControl('', Validators.required),
      student_contact: new FormControl('', Validators.required),
      // student_collage_year: new FormControl('', Validators.required),
      // student_prefferred_Firstlocation: new FormControl('', Validators.required),
      // student_prefferred_Secondlocation: new FormControl(''),
      // student_prefferred_Thirdlocation: new FormControl(''),
      // student_prefferred_Fourtlocation: new FormControl(''),
      // mail: new FormControl(''),
      // e_mail: new FormControl(''),
      // phone: new FormControl(''),
      // sms: new FormControl(''),
      // any: new FormControl(''),
      // comunication_mail: new FormControl(''),
      // comunication_e_mail: new FormControl(''),
      // comunication_phone: new FormControl(''),
      // comunication_sms: new FormControl(''),
      // comunication_any: new FormControl(''),
      termsandCondition: new FormControl('', Validators.required),
      privacyPolicy: new FormControl('', Validators.required),
      usertype: new FormControl('1')
    });

    this.regFormInstitue = new FormGroup({
      collegeName: new FormControl(''),
      location: new FormControl('', Validators.required),
      university_affiliated: new FormControl('', Validators.required),
      college_type: new FormControl(null, Validators.required),
      dean_name: new FormControl('', Validators.required),
      dean_email_id: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      username: new FormControl('', Validators.required),
      emailId: new FormControl(''),
      phone_no: new FormControl('', Validators.required),
      mobile_no: new FormControl('', Validators.required),
      department: new FormControl(null, Validators.required),
      designation: new FormControl('', Validators.required),
      college_address: new FormControl('', Validators.required),
      college_pincode: new FormControl('', Validators.required),
      college_country: new FormControl('', Validators.required),
      termsandCondition: new FormControl('', Validators.required),
      privacyPolicy: new FormControl('', Validators.required),
    });

    this.signUpFormUniv = new FormGroup({
      univName: new FormControl(''),
      location: new FormControl('', Validators.required),
      year_of_build: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      vc_name: new FormControl('', Validators.required),
      vc_email_id: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      username: new FormControl('', Validators.required),
      univEmail: new FormControl(''),
      department: new FormControl('', Validators.required),
      phone_no: new FormControl('', Validators.required),
      mobile_no: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      website: new FormControl('', Validators.required),
      termsandCondition: new FormControl('', Validators.required),
      privacyPolicy: new FormControl('', Validators.required),
    });

    this.signUpFormSchool = new FormGroup({
      schoolName: new FormControl(''),
      school_year_of_build: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      school_type: new FormControl('', Validators.required),
      school_board_type: new FormControl('', Validators.required),
      school_location: new FormControl('', Validators.required),
      school_head_name: new FormControl('', Validators.required),
      school_head_email_id: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      school_contact: new FormControl('', Validators.required),
      school_email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      school_website: new FormControl('', Validators.required),
      school_admin_name: new FormControl('', Validators.required),
      school_Admin_email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      termsandCondition: new FormControl('', Validators.required),
      privacyPolicy: new FormControl('', Validators.required),
    });

    setTimeout(() => {
      this.headerService.loaderFunction(false);
    }, 1000);
  }

  get errorMessages() {
    return this.errorMessage;
  }

  registerForm() {
    // combine form values to provide data to backend
    //if (this.signUpFormStudent.valid) {
      let formDetails = this.signUpFormStudent.value;
      formDetails.student_dob = new Date(formDetails.student_dob_dp.year, formDetails.student_dob_dp.month, formDetails.student_dob_dp.day);

      // Set user id from localstorage
      formDetails.user_id = this.userGpts.user_id;
      // Add base url
      formDetails.base_url = window.location.origin;


      $("#sinupbtn_stepsec").attr('disabled',true);
      $("#sinupbtn_stepsec").text("Submitting..");

      this.apiService.userRegistration(formDetails).subscribe(user => {
        if (user.code != 500 && formDetails.privacyPolicy != false && formDetails.termsandCondition != false){
            //alert(formDetails.privacyPolicy);
          let userInfo = JSON.parse(localStorage.getItem('userGpts'));
          userInfo.is_eligible_for_dashboard = 1;
          userInfo.contact = user.data.contact;
          localStorage.setItem('userGpts', JSON.stringify(userInfo));
          this.headerService.userInfoLs(userInfo);
          this.headerService.userNameHeader(userInfo.name);
          this.headerService.userRegistered(userInfo.is_eligible_for_dashboard);
          this.router.navigate(['/', 'student-dashboard']);

        } else {

          $("#sinupbtn_stepsec").attr("disabled",false);
          $("#sinupbtn_stepsec").text("Submit");

          // if (formDetails.termsandCondition == false){
          //   user.msg.push('Select terms and conditon.');
          // }
          //   alert(formDetails.privacyPolicy);
          // if (formDetails.privacyPolicy == false){
          //   user.msg.push('Select privacy policy.');
          // }

          this.errMessage = user.msg;

          this.errorContainer.nativeElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      },
        error => {
          $("#sinupbtn_stepsec").attr("disabled",false);
          $("#sinupbtn_stepsec").text("Submit");

          console.log(error);
        });
    //}
  }

  instituteRegForm() {
    if (this.regFormInstitue.valid) {
      let formFields = this.regFormInstitue.value;
      formFields.user_id = this.userGpts.user_id;
      formFields.usertype = this.userGpts.usertype;
      this.apiService.instituteRegForm(formFields).subscribe(user => {
        if (user.code != 500) {
          let userInfo = JSON.parse(localStorage.getItem('userGpts'));
          userInfo.is_eligible_for_dashboard = 1;
          userInfo.contact = user.data.contact;
          localStorage.setItem('userGpts', JSON.stringify(userInfo));
          this.headerService.userInfoLs(userInfo);
          this.headerService.userNameHeader(userInfo.name);
          this.headerService.userRegistered(userInfo.is_eligible_for_dashboard);
          this.router.navigate(['/', 'home']);
        } else {
          console.log(user);
        }

      },
        error => {
          console.log(error);
        });
    }
  }

  unviRegForm() {
    if (this.signUpFormUniv.valid) {
      let formFields = this.signUpFormUniv.value;
      formFields.user_id = this.userGpts.user_id;
      formFields.usertype = this.userGpts.usertype;
      this.apiService.univRegForm(formFields).subscribe(user => {
        if (user.code != 500) {
          let userInfo = JSON.parse(localStorage.getItem('userGpts'));
          userInfo.is_eligible_for_dashboard = 1;
          userInfo.contact = user.data.contact;
          localStorage.setItem('userGpts', JSON.stringify(userInfo));
          this.headerService.userInfoLs(userInfo);
          this.headerService.userNameHeader(userInfo.name);
          this.headerService.userRegistered(userInfo.is_eligible_for_dashboard);
          this.router.navigate(['/', 'home']);
        } else {
          console.log(user);
        }
      },
        error => {
          console.log(error);
        });
    }
  }

  getCountries() {
    this.apiService.getCountries().subscribe(val => {
      this.countries = val.data;
    })
  }

  getStates(data) {
    data = { "country": data };
    this.apiService.getStates(data).subscribe(val => {
      this.states = val.data;
      this.statesVar = 'States';
    });
  }

  setFormValue(userInfo) {
    this.userType = userInfo.usertype;
    setTimeout(() => {
      if (this.userType == 1) {
        let regForm = this.signUpFormStudent.controls;
        regForm.student_FirstName.setValue(userInfo.name);
        regForm.student_LastName.setValue(userInfo.lastname);
      } else if (this.userType == 2) {
        let regForm = this.regFormInstitue.controls;
        regForm.collegeName.setValue(userInfo.name);
        regForm.emailId.setValue(userInfo.email);
        this.apiService.getCollegeType().subscribe(val => {
          this.collegeTypeList = val.data;
        }, error => {
          console.log(error);
        });
        this.apiService.getDepartment().subscribe(val => {
          console.log(val);
          this.departmentList = val.data;
        }, error => {
          console.log(error);
        });
      } else if (this.userType == 3) {
        let regForm = this.signUpFormUniv.controls;
        regForm.univName.setValue(userInfo.name);
        regForm.univEmail.setValue(userInfo.email);
      }
    }, 200)

  }

}
