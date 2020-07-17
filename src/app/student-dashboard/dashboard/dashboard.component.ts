import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';
// import * as $ from 'jquery';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  model: NgbDateStruct;
  date: { year: number, month: number };
  displayMonths = 1;
  selectedMonth: any;
  selectedDate: any;
  selectedYear: any;
  showSelectedDate: boolean = false;
  userDetails: any;
  today = this.calendar.getToday();
  contact_number: string;
  email_id: string;
  gender: string;
  allowSubmit: boolean = false
  tteTestTaken: boolean;
  inspiringvideo: any;
  profileStatus: string;
  profileStatusWithSop: string;
  studentName:string;
  pdfUrl: String = '';
  userIdObj: any;
  occupationArray: Array<any> = [];
  normedFactors: Array<any> = [];
  currentDate = new Date();

  @ViewChild('objectiveEl') objectiveEl: ElementRef;

  constructor(private calendar: NgbCalendar, public ngbDatepickerI18n: NgbDatepickerI18n, public apiService: ApiService, public headerService: HeaderService,
    public router: Router) {}

  // slick data 
  slideConfig = {
    dots: false
    , infinite: false
    , speed: 300
    , slidesToShow: 3
    , slidesToScroll: 1
    , responsive: [


      {
        breakpoint: 1025
        , settings: {
          slidesToShow: 2
          , slidesToScroll: 1
          , infinite: true
          , dots: true
        }
      }
      , {
        breakpoint: 600
        , settings: {
          slidesToShow: 1
          , slidesToScroll: 1
        }
      }
      , {
        breakpoint: 480
        , settings: {
          slidesToShow: 1
          , slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };

  circleSlideConfig = {
    dots: false
    , infinite: false
    , speed: 300
    , slidesToShow: 5
    , slidesToScroll: 1
    , responsive: [
      {
        breakpoint: 1024
        , settings: {
          slidesToShow: 3
          , slidesToScroll: 3
          , infinite: true
          , dots: true
        }
      }
      , {
        breakpoint: 600
        , settings: {
          slidesToShow: 2
          , slidesToScroll: 2
        }
      }
      , {
        breakpoint: 480
        , settings: {
          slidesToShow: 1
          , slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };

  inpisringConfig: any = {
    grabCursor: true,
    slidesPerView: 'auto',
    direction: 'horizontal',
    speed: 500,
    spaceBetween: 25,
    // centeredSlides: true,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next-inspir',
      prevEl: '.swiper-button-prev-inspir',
    }
  }

  ngOnInit() {

    this.userDetails = JSON.parse(localStorage.getItem('userGpts'));
    // this.headerService.dashboardHomeObservable().subscribe(val => {
    //   if (!val) {
    //     this.router.navigate(['student-dashboard', 'student-profile']);
    //   }
    // });
    this.userIdObj = {
      "user_id": this.userDetails.user_id
    }
    this.apiService.ssoStatus(this.userIdObj).subscribe(val => {
      let status = val.data.status
      console.log(status);
      if (status != 3) {
        this.tteTestTaken = false;
      } else {
        this.tteTestTaken = true;
        this.getResult();
      }
    });
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
    this.getUserProfileData(this.userDetails);
  }

  getClickedDay(date) {
    this.selectedMonth = this.ngbDatepickerI18n.getMonthFullName(date.month);
    this.selectedDate = date.day;
    this.selectedYear = date.year;
    this.showSelectedDate = true;
  }

  //   Get User details fro display information
  getUserProfileData(userDetails) {
    let userDetailsReq = { 'user_id': userDetails.user_id, 'usertype': userDetails.usertype };
    this.apiService.getStudentProfileInfo(userDetailsReq).subscribe(val => {
      this.studentName = val.user_info.student_fname;
      this.contact_number = val.user_info.contact;
      this.email_id = val.user_info.email;
      this.gender = val.profile_info.gender;
      this.profileStatus = val.profile_info.student_complete_status;
      if(val.profile_info.student_complete_status == '0%'){
        this.profileStatus = '15%';
      }else{
        this.profileStatus = val.profile_info.student_complete_status;
      }
      

      console.log("percent profile : "+this.profileStatus);

      this.headerService.loaderFunction(false);
    },
      error => {
        console.log(error);
      }
    );

    // Get Objective 
    let userId = { 'user_id': userDetails.user_id };
    // this.apiService.displayObjective(userId).subscribe(val => {
    //   console.log(val);
    //   this.objectiveEl.nativeElement.value = val.data.objective;
    // },
    //   error => {
    //     console.log(error);
    //   }
    // )
    this.apiService.getInspiringVideos().subscribe(val => {
      this.inspiringvideo = val.data.inspiringvideo;
    });
  }

  objectiveSubmit() {
    this.allowSubmit = false;
    if (this.objectiveEl.nativeElement.value) {
      let data = new FormData;
      data.append('objective', this.objectiveEl.nativeElement.value);
      data.append('user_id', this.userDetails.user_id);
      this.apiService.objectiveSubmit(data).subscribe(val => { },
        error => {
          console.log(error);
        }
      )
    }
  }

  addToFav(id, $event, fav) {
    let data = {
      "user_id": this.userDetails.user_id,
      "career_video_id": id,
      "type": "add"
    }
    let heartElement: HTMLElement = $event.currentTarget;

    if (heartElement.classList.contains('activeHeart')) {
      data.type = "delete";
      heartElement.classList.remove('activeHeart');
      this.apiService.addFavVideo(data).subscribe(val => {
        if (val.code != 200) {
          heartElement.classList.add('activeHeart');
        }
      });
    } else {
      heartElement.classList.add('activeHeart');
      this.apiService.addFavVideo(data).subscribe(val => {
        if (val.code != 200) {
          heartElement.classList.remove('activeHeart');
        }
      });
    }
  }

  // Stop video functions
  stopAllVid(idStatic) {
    console.log(idStatic);
    $.each($("video"), function () {
      if ($(this).get(0).id === idStatic) {
        return;
      } else {
        $(this).get(0).pause();
        $(this).get(0).suspend;
      }
    });
  }

  getResult() {
    this.apiService.getResult(this.userIdObj).subscribe(val => {
      // Career result
      let tempArray = val.data.assessments[0];
      let careerResultErr = tempArray.results.ranked_occupations;
      this.occupationArray = careerResultErr.slice(0, 5);
      //Normed factors
      let tempNormedFactors = tempArray.results.normed_factors;
      this.normedFactors = tempNormedFactors;
      this.normedFactors.forEach(element => {
        element.value = element.value / 5;
      });
      //this.scoresReady = true;

      //setTimeout(() => {
      //  this.jqueryFunctions();
      //}, 500);

      //setTimeout(() => {
      //  this.careerDataVar = true;
      //  this.headerService.loaderFunction(false);
      //}, 1000);
    });
    
    this.apiService.tteReport(this.userIdObj).subscribe(val => {
      console.log("PDF :" + JSON.stringify(val.data));
      if (val.data.status) {
        this.pdfUrl = val.data.url;
      }
       console.log(val.data.url);
    });
  }
  
}
