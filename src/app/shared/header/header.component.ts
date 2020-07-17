import { Component, OnInit, ViewChild, ElementRef, Renderer2, Inject, AfterViewInit } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute, NavigationEnd } from '@angular/router';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';
import { FormGroup, FormControl, Validators,FormArray } from '@angular/forms';

import { ApiService } from '../../core/api.service';
import { Interceptor } from '../../core/interceptor/interceptor';
import { HeaderService } from '../services/header.service';

declare var $: any;
declare var google: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('headerSidebar', [
      state('true',
        style({ opacity: 1, width: '400px' }),
      ),
      transition('false => true', [
        animate('.6s ease-in', keyframes([
          style({ opacity: 1, width: '400px' }),
        ])),
      ]),
      transition('true => false', [
        animate('.6s ease-in', keyframes([
          style({ opacity: 1, width: '0px' }),
        ])),
      ])
    ]),
    trigger('searchBar', [
      state('true',
        style({ opacity: 1, height: '500px', overflow: 'auto' }),
      ),
      state('false',
        style({ opacity: 1, height: '0px', overflow: 'hidden' }),
      ),
      transition('false => true', [
        animate('.6s ease-in', keyframes([
          style({ opacity: 1, height: '500px' }),
        ])),
      ]),
      transition('true => false', [
        animate('.6s ease-in', keyframes([
          style({ opacity: 0, height: '0px', }),
        ])),
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;
  signUpForm: FormGroup;
  instituteLoginForm: FormGroup;
  CounselorLoginForm:FormGroup;
  instituteSignupForm: FormGroup;
  schoolSignupForm: FormGroup;
  schoolLoginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  sidenavShow: boolean = false;
  sidebarShow: boolean = false;
  headerSidebar: ElementRef;
  loginModal: ElementRef;
  errorVar: boolean = false;
  errorMessage: any;
  loggedIn: boolean = false;
  userName: any = "";
  viewMenu: boolean = true;
  activeLinkValue: string;
  studentLoggedIn = false;
  studentRegistred: boolean = false;
  signup: boolean = false;
  lastname: string;
  contact: string;
  emailId: string;
  signupFormVar: boolean = false;
  routeActive: string;
  skype: string;
  InstitutionTypeList: Array<any>;
  instituteSignupVar: boolean = false;
  userType: any;
  usertype:any;
  formError: Array<any> = [];
  dashboardRoutes: any;
  dashboardRouteAray: Array<any> = [
    '/student-dashboard/home',
    '/college-dashboard/home',
    '',
    '',
    '/counselor-dashboard/home'
  ];
  showMenu: boolean = false;
  careerList: Array<any>;
  videoSerachList: any;
  forgotPasswordShow: boolean = false;
  forgotPassMsg: string = '';
  schoolDrop: Array<any> = [];
  changePasswordForm: FormGroup;
  userId: any;
  confirmErr: string = '';
  scrolledOver: boolean;
  msgOne : '';
  errorOne : '';
  msgTwo : '';
  errorTwo : '';
  status: any;
  path: any;
  selected: any;

  constructor(private route: ActivatedRoute, private router: Router,
    public apiService: ApiService, public renderer: Renderer2,
    public headerService: HeaderService, private interceptor: Interceptor) {   
    this.path = this.router.url;
    console.log("Path : "+this.path); 
    if(this.path == '/home' || this.path == '/CDAP'){
      this.selected = 'Career Discovery';
    }else
    if(this.path == '/careerdiscovery'){
      this.selected = 'Career Assessment';
    }else
    if(this.path == '/knowledge-webinar'){
      this.selected = 'Knowledge Studio';
    }else
    if(this.path == '/edieo'){
      this.selected = 'Common Application';
    }else{
      this.selected = 'Career Discovery';
    }
  }
  @ViewChild('headerSidebar') set headerSidebarValue(headerSidebar: ElementRef) {
    this.headerSidebar = headerSidebar;
  };
  @ViewChild('loginModal') set loginModalValue(loginModal: ElementRef) {
    this.loginModal = loginModal;
  }
  ngOnInit() {
    // localStorage.removeItem('userGpts');
    this.checkUrl();
    this.getUserName();
    this.checkUrl();
    this.createLoginFrom();
    this.checkLogin();
    this.getUserInfo();
    this.getCareerList();
    this.getSchoolList();
    this.InstitutionTypeList = [
      { 'id': 2, 'name': 'College' },
      { 'id': 3, 'name': 'University' }
    ];

  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.googleTranslateElementInit();
    // }, 3000);
    // this.router.events.forEach((event) => {
    //   if (event instanceof NavigationEnd) {
    //     setTimeout(() => {
    //       this.googleTranslateElementInit();
    //     }, 10000);
    //   }
    // });
  }

  // googleTranslateElementInit() {
  //   console.log('translate inside')
  //   new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
  // }

  sidenavToggle() {
    this.sidenavShow = !this.sidenavShow;
  }

  sidebarToggle() {
    this.sidebarShow = !this.sidebarShow;
  }

  checkUrl() {
    this.headerService.routeObservable().subscribe(val => {
      this.activeLinkValue = val;
    })
    // this.router.events.subscribe((val) => {
    //   if (val instanceof ActivationEnd) {
    //     this.activeLinkValue = val.snapshot.url[0].path;
    //     console.log(this.activeLinkValue);
    //   }
    // });
  }

  getCareerList() {
    this.apiService.getCareerList().subscribe(val => {
      this.careerList = val.data;
    });
  }

  getUserName() {
    this.headerService.usernameHeaderObservable().subscribe(name => {
      if (name.length) {
        this.userName = name;
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    })
  }

  toogleMenu() {
    this.headerService.toggleSideMenu(this.viewMenu);
    this.viewMenu = !this.viewMenu;
  }

  emptyError() {
    this.formError = [];
  }

  logOut() {
    
    this.apiService.logOut().subscribe(val => { }, error => {
    });
    this.headerService.logOut(true);
    localStorage.removeItem('userGpts');
    this.userName = "";
    this.loggedIn = false;
    this.headerService.userInfoLs('');
    this.headerService.userNameHeader('');
    
    this.router.navigate(['/', 'home']);
    //window.location.reload();
  }

  openModal() {
    $("#exampleModal").modal('show');
    this.forgotPasswordShow = false;
  }

  openSignupModal() {
    $("#signupModal").modal('show');
  }

  openChangePasswordModal() {
    $("#changePassword").modal('show');
  }

  showSignInModal() {
    $("#signupModal").modal('hide');
    this.forgotPasswordShow = false;
    $("#exampleModal").modal('show');
    this.emptyError();

  }

  showSignUpModal() {
    $("#exampleModal").modal('hide');
    $("#signupModal").modal('show');
    this.emptyError();
  }

  // Signup/ LOgin

  createLoginFrom() {
    // Login for student form
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required, Validators.email
      ])),
      password: new FormControl('', Validators.required),
      type: new FormControl('1', Validators.required)
    });
    // Login for institute form
    this.instituteLoginForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required, Validators.email
      ])),
      password: new FormControl('', Validators.required)
    });
//counselor login form
this.CounselorLoginForm = new FormGroup({
  email: new FormControl('', Validators.compose([
    Validators.required, Validators.email
  ])),
  password: new FormControl('', Validators.required),
  type: new FormControl('5', Validators.required)
})
    //school login form
    this.schoolLoginForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required, Validators.email
      ])),
      password: new FormControl('', Validators.required)
    });
    // Login for student form
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required, Validators.email
      ])),
      school: new FormControl(null, Validators.required),
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required),
      licence_code: new FormControl('', Validators.required),
      usertype: new FormControl('1')
    });

    this.instituteSignupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required, Validators.email
      ])),
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required),
      usertype: new FormControl(null, Validators.required)
    });

    this.schoolSignupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required, Validators.email
      ])),
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required),
      usertype: new FormControl('4', Validators.required)
    });

    // forgot password form
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required, Validators.email
      ]))
    });

    this.changePasswordForm = new FormGroup({
      current_password: new FormControl('', Validators.compose([
        Validators.required
      ])),
      new_password: new FormControl('', Validators.compose([
        Validators.required
      ])),
      confirm_password: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  //  check if user is logged in or not before
  checkLogin() {
    if (localStorage.getItem('userGpts') !== null) {
      this.loggedIn = true;
      let userInfo = JSON.parse(localStorage.getItem('userGpts'));
      this.userName = userInfo.display_name;
      this.lastname = userInfo.lastname;
      this.emailId = userInfo.email;
      this.contact = userInfo.contact;
      this.userId = userInfo.user_id;
      this.usertype = userInfo.usertype
      console.log('usertype1',this.usertype)
    }
  }

  afterLogin(user) {
    this.apiService.loginData(user);
    this.headerService.routeData(user);
    let userString = JSON.stringify(user);
    localStorage.setItem('userGpts', userString);
    this.userName = user.display_name;
    this.lastname = user.lastname;
    this.userType = user.usertype;
    this.emailId = user.email;
    this.contact = user.contact;
    this.userId = user.user_id;
    this.headerService.userNameHeader(this.userName);
    this.studentLoggedIn = true;
    this.signup = true;
    this.headerService.userSignup(this.signup);
    this.studentRegistred = user.is_eligible_for_dashboard;
    this.headerService.userRegistered(this.studentRegistred);
    this.headerService.userInfoLs(user);
  }


  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.apiService.login(this.loginForm.value).subscribe(user => {
        this.afterLogin(user);
        this.removeBootstrapModal();
      },
        error => {
          this.formError = error.error.message;
          this.formError = this.formError;
          setTimeout(() => {
            this.formError = [];
          }, 3000);
        }
      );
    }
  }
  counselorLogin(){
    if(this.CounselorLoginForm.valid){
      this.apiService.login(this.CounselorLoginForm.value).subscribe(user=>{
        this.afterLogin(user);
        this.removeBootstrapModal();
      },
      error=>{
        this.formError = error.error.message;
        this.formError = this.formError;
        setTimeout(()=>{
          this.formError=[];
        },3000);
      }
      )
    }
  }

  signUp() {
    if (this.signUpForm.valid) {
      let signUpInfo = this.signUpForm.value;

      signUpInfo.base_url = window.location.origin;
      // if (this.signUpForm.controls.password.value === this.signUpForm.controls.confirm_password.value) {
      this.apiService.userSignUp(signUpInfo).subscribe(user => {
        this.afterLogin(user);
        this.removeBootstrapModal();
        this.router.navigate(['/user-signup']);
      },
        error => {
          this.formError = error.error.message;
          this.formError = this.formError;
          setTimeout(() => {
            this.formError = [];
          }, 3000);
        }
      );
      // }
    }
  }

  // Institute signup
  institueSignup() {
    if (this.instituteSignupForm.valid) {
      if (this.instituteSignupForm.controls.password.value === this.instituteSignupForm.controls.confirm_password.value) {
        this.apiService.userSignUp(this.instituteSignupForm.value).subscribe(user => {
          console.log(user);
          this.afterLogin(user);
          this.removeBootstrapModal();
        },
          error => {
            this.formError = error.error.message;
          }
        );
      }
    }
  }

  institueLogin() {
    if (this.instituteLoginForm.valid) {
      this.apiService.login(this.instituteLoginForm.value).subscribe(user => {
        this.afterLogin(user);
        this.removeBootstrapModal();
      },
        error => {
          this.formError = error.error.message;
        }
      );
    }
  }

  // School dashboard
  schoolSignup() {
    if (this.schoolSignupForm.valid) {
      this.apiService.userSignUp(this.schoolSignupForm.value).subscribe(user => {
        this.afterLogin(user);
        this.removeBootstrapModal();
      },
        error => {
          this.formError = error.error.message;
        }
      );
    }
  }

  schoolLogin() {
    if (this.schoolLoginForm.valid) {
      this.apiService.login(this.schoolLoginForm.value).subscribe(user => {
        this.afterLogin(user);
        this.removeBootstrapModal();
      },
        error => {
          this.formError = error.error.message;
        }
      );
    }
  }

  changeUI(event) {
    this.scrolledOver = event;
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      let data = this.changePasswordForm.value;
      data.user_id = this.userId;
      this.apiService.changePassword(data).subscribe(val => {
        if (val.code === '200') {
          this.removeBootstrapModal();
        } else {
          this.confirmErr = val.msg
        }
      });
    }
  }

  removeBootstrapModal() {
    $("#exampleModal").modal('hide');
    $("#signupModal").modal('hide');
    $("#changePassword").modal('hide');
    $("#greatChallengeroboHumanReg").modal('hide');
    $("#greatChallengeArtEntReg").modal('hide');
    this.emptyError();
  }

  // Get the info based on local storage
  getUserInfo() {
    this.headerService.userInfoLsObservable().subscribe(user => {
      if (typeof user != undefined && typeof user != 'string') {
        this.signup = true;
        this.headerService.userSignup(this.signup);
        this.studentRegistred = user.is_eligible_for_dashboard;
        // set dashboard link
        let index = user.usertype - 1;
        console.log('test',index);
        this.dashboardRoutes = this.dashboardRouteAray[index];
      }
    })
  }


  errorHandling(error) {
    let messageError = error.error.message;
    let key = Object.keys(messageError[0]);
    this.formError = messageError[0][key[0]];
  }

  searchVideo(event) {
    this.router.navigate(['/course', event]);
    this.showMenu = false;
  }

  forgotPassword() {
    if (this.forgotPasswordForm.valid) {
      this.formError = [];
      this.apiService.forgotPassword(this.forgotPasswordForm.value).subscribe(val => {
        if (val.code != 200) {
          this.formError.push(val.msg);
          setTimeout(() => {
            this.formError = [];
          }, 3000);
        } else {
          this.forgotPassMsg = val.msg;
          setTimeout(() => {
            this.forgotPassMsg = '';
          }, 3000);
        }
      }, error => {
      });
    }
  }

  getSchoolList() {
    this.apiService.getSchoolList().subscribe(val => {
      this.schoolDrop = val.data;
    })
  }

  closeHeader() {
    $(".scholar_head").remove();
    $(".top_on_top").css('top', '0');
    $('.dynheader').css('margin-top',0);
  }

  toggleHeader() {
    this.showMenu = !this.showMenu;
    if ($(".scholar_head").length == 0) {
      setTimeout(function () {
        $('.dropdown-menu-large').attr('style', 'top: 47px !important');
      }, 1);
    }
  }
  openSolution(){
    this.router.navigate(['/solution']);
  }
  summerSchool(){
    alert('Coming Soon...')
  }
  trending(){
    setTimeout(function(){
      $('html, body').animate({
         scrollTop: $('#trendingSection').offset().top-60
      },'slow');
 },0);
  }
}
