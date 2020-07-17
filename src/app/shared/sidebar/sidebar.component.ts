import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, RoutesRecognized } from '@angular/router';
import { Router, ActivationEnd } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { Interceptor } from '../../core/interceptor/interceptor';
import { HeaderService } from '../services/header.service';
declare var jquery: any;
declare var $: any;
import { SidebarData } from './sidebar.data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  sidebarData = new SidebarData;
  sidebarDataList: any;
  activeLink: number = 0;
  activeLinkValue: string;
  // Check if student has logged in
  studentLoggedIn = false;
  studentRegistred: boolean = false;
  loginForm: FormGroup;
  signUpForm: FormGroup;
  instituteLoginForm: FormGroup;
  instituteSignupForm: FormGroup;
  forgotPasswordForm: FormGroup;
  loginModal: ElementRef;
  errorVar: boolean = false;
  errorMessage: any;
  loggedIn: boolean = false;
  signup: boolean = false;
  userName: any;
  contact: string;
  emailId: string;
  signupFormVar: boolean = false;
  routeActive: string;
  skype: string;
  InstitutionTypeList: Array<any>;
  instituteSignupVar: boolean = false;
  userType: any;
  profileImgSrc: string;
  profileImageVar: boolean;
  userInfo: any;
  dashboardLink: boolean = false;
  collegeDashboardList: any;
  profileImageChanged: boolean = false;
  defaultProfilePic: string = "assets/images/common/user-menu.png";
  profileComplete: any = 0;
  imageChangeText: string = "Picture";
  
  uploadPic: string = '';
  uploadPicVar:boolean = false;
  uploadLoader: boolean = false;
  
  @ViewChild('loginModal') set loginModalValue(loginModal: ElementRef) {
    this.loginModal = loginModal;
  }
  constructor(private route: ActivatedRoute, private router: Router, public apiService: ApiService, public renderer: Renderer2,
    public headerService: HeaderService, private interceptor: Interceptor) {
    this.sidebarDataList = this.sidebarData.studentDashboard;
    this.collegeDashboardList = this.sidebarData.collegeDashboard;
  }

  


  ngOnInit() {
    this.logOut();
    // get URL
    this.getUserInfo();
    this.InstitutionTypeList = [
      { 'id': 2, 'name': 'College' },
      // { 'id': 3, 'name': 'University' }
    ]
    this.checkProfileStatus(this.userInfo);
    this.checkUrl();
    
  }

  ngAfterViewInit() {
    // jquery functions
    this.jqueryFunctions();
    
  }

  checkProfileStatus(userInfo) {
    let userDetailsReq = { 'user_id': userInfo.user_id, 'usertype': userInfo.usertype };

    if (userInfo.usertype == 1) {
      this.apiService.getStudentProfileInfo(userDetailsReq).subscribe(val => {
        let profileInfo = val.profile_info;
        let activityStatus = profileInfo.activity;
        this.checkProfileComplete(profileInfo);
        this.dashboardLink = true;
        // if (!profileInfo.student_profile_info_status || !profileInfo.student_family_info_status || !profileInfo.student_education_info_status || (activityStatus == null)) {
        //   this.router.navigate(['student-dashboard', 'student-profile']);
        //   setTimeout(() => {
        //     this.headerService.loaderFunction(false);
        //   }, 1000);
        //   this.dashboardLink = false;
        // } else {
        //   this.dashboardLink = true;
        //   setTimeout(() => {
        //     this.headerService.loaderFunction(false);
        //   }, 1000);
        // }
        this.headerService.dashboardCheck(this.dashboardLink);

      },
        error => {
          console.log(error)
        });
    } else {
      this.imageChangeText = "Logo"
    }

  }
 
  checkUrl() {
    this.routeActive = this.router.url;
    this.router.events.subscribe((val) => {
      if (val instanceof ActivationEnd) {
        if (val.snapshot.url.length) {
          this.activeLinkValue = val.snapshot.url[0].path;
          console.log(this.activeLinkValue);
          this.headerService.routeFunction(this.activeLinkValue);
        }
      }
      if (val instanceof RoutesRecognized) {
        this.routeActive = val.state.url;
        // if(!this.dashboardLink && this.routeActive == '/student-dashboard/home'){
        //   this.router.navigate(['student-dashboard', 'student-profile']);
        //   console.log(this.routeActive);
        // }

      }
    });
  }

  jqueryFunctions() {
    // $('.profileimg').circleProgress({
    //   startAngle: -90
    //   , thickness: 15
    //   , value: this.profileComplete
    //   , fill: {
    //     gradient: ['#0f586d', '#2f8aa3'] // or color: '#3aeabb', or image: 'http://i.imgur.com/pT0i89v.png'
    //   }
    //   ,
    // });
  }

  toggleInstituteForm() {
    this.instituteSignupVar = !this.instituteSignupVar;
  }

  get errorMessages() {
    return this.errorMessage;
  }

  // Hide modal after login
  removeBootstrapModal() {
    $("#exampleModal").modal('hide');
    $("#signupModal").modal('hide');
    // this.loginModal.nativeElement.classList.remove("show");
    // this.loginModal.nativeElement.style.display = "none";
    // this.renderer.removeClass(document.body, 'modal-open');
    // this.renderer.setStyle(document.body, 'padding', 0);
    // document.getElementsByClassName('modal-backdrop')[0].remove();
  }

  errorHandling(errObj) {
    this.errorVar = true;
    this.errorMessage = errObj.error.message;
  }

  checkLogin() {
    if (localStorage.getItem('userGpts') !== null) {
      this.loggedIn = true;
      let userInfo = JSON.parse(localStorage.getItem('userGpts'));
      this.userName = userInfo.name;
      this.emailId = userInfo.email;
      this.contact = userInfo.contact;
    }
  }

  logOut() {
    this.headerService.logOutObservable().subscribe(val => {
      this.studentLoggedIn = !val;
      this.studentRegistred = false;
    });
  }

  forgotPassword() {
    if (this.forgotPasswordForm.valid) {
      this.apiService.forgotPassword(this.forgotPasswordForm.value).subscribe(error => {
      });
    }
  }

  signupForm(value) {
    this.signupFormVar = value;
  }

  openSignupModal() {
    this.signupFormVar = true;
  }
  openloginModal() {
    this.signupFormVar = false;
  }

  afterLogin(user) {
    setTimeout(() => {
      this.jqueryFunctions();
    }, 200);
    this.apiService.loginData(user);
    this.headerService.routeData(user);
    let userString = JSON.stringify(user);
    localStorage.setItem('userGpts', userString);
    this.userName = user.display_name;
    this.userType = user.usertype;
    this.emailId = user.email;
    this.contact = user.contact;
    this.profilePictureCheck(user.profilepic);
    this.headerService.userNameHeader(this.userName);
    this.studentLoggedIn = true;
    this.signup = true;
    this.headerService.userSignup(this.signup);
    this.studentRegistred = user.is_eligible_for_dashboard;
    this.headerService.userRegistered(this.studentRegistred);
  }

  //  get user info 
  getUserInfo() {
    this.headerService.userInfoLsObservable().subscribe(user => {
      if (typeof user != undefined && typeof user != 'string') {
        this.userInfo = user;
        this.signup = true;
        this.headerService.userSignup(this.signup);
        this.signup = true;
        this.userName = user.display_name;
        this.userType = user.usertype;
        this.contact = user.contact;
        this.emailId = user.email;
        this.profilePictureCheck(user.profilepic);
        this.studentLoggedIn = true;
        this.studentRegistred = user.is_eligible_for_dashboard;
        this.skype = user.skype_id;
        if (this.studentRegistred) {
          setTimeout(() => {
            this.jqueryFunctions();
          }, 200);
        }
      }
    })
  }
  //  Function to show and hide sidebar menu AKA LOL Custom Accordion
  menuClicked(i) {
    console.log(document.querySelectorAll('.list-drop'));
    let elementsList = [].slice.call(document.querySelectorAll('.list-drop'));
    let selectedId = 'list' + i;
    let selected = '#list' + i;
    let element = document.querySelector(selected);
    let classVar = element.classList.contains('active');
    if (classVar) {
      //element.classList.remove('active');
     element.classList.remove('active');
    } else {
      element.classList.add('active');
      element.scrollIntoView();
    }
    for (let elementItem of elementsList) {
      if (elementItem.getAttribute('id') != selectedId) {
        elementItem.classList.remove('active');
       
      }
    }

  }

  linkClicked(i, $event) {
    if (!this.dashboardLink && i == 0 && this.userType == 1) {
      $event.stopPropagation();
      $event.preventDefault();
    }
  }

  pictureSelected(event) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event: any) => { // called once readAsDataURL is completed
      this.uploadPicVar = true;
      this.uploadPic = event.target.result;
      this.profileImageChanged = true;
    }
  }


  uploadPicture() {
    if (this.profileImageChanged) {
      this.headerService.loaderFunction(true);
      let profileInfo = {
        "user_id": this.userInfo.user_id,
        "file": this.uploadPic,
      }
      this.apiService.updateProfilePic(profileInfo).subscribe(val => {
       
        if (val.code = '200') {
          $('#profilePicModal').modal('hide');
          this.headerService.loaderFunction(false);
          let userGpts = JSON.parse(localStorage.getItem('userGpts'));
          userGpts.profilepic = this.uploadPic;
          this.profileImgSrc = this.defaultProfilePic = this.uploadPic;
          localStorage.setItem('userGpts', JSON.stringify(userGpts));
        }
      });
    }
  }

  profilePictureCheck(profilePicture) {
    if (profilePicture == '' || profilePicture == null) {
      this.profileImageVar = false;
    } else {
      this.profileImageVar = true;
      this.profileImgSrc = profilePicture;
    }
  }

  changeBackProfile() {
    this.profileImgSrc = this.userInfo.profilepic;
  }

  checkProfileComplete(data) {
    if (this.userInfo.usertype == 1) {
      let activityStatus = 0;
      if (data.activity != null) {
        activityStatus = 1;
      }
      let profileComplete = (data.student_profile_info_status + data.student_family_info_status +
        data.student_education_info_status + activityStatus) / 4;
      this.profileComplete = profileComplete.toFixed(2);
      this.jqueryFunctions();
      this.profileComplete = this.profileComplete * 100;
    }
  }
  sidebarToggle():void{
    $('#sidebar-wrapper').toggleClass('toggle-show');
    $('#wrapper').toggleClass('toggle-show');
    $('.work_style_wrapper').toggleClass('toggle-show');
    $('.career_suggestion_wrapper').toggleClass('toggle-show');
    $(this).toggleClass('toggle-show')
  }

}

