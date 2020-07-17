import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';
// import * as $ from 'jquery';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-newstudent-dashboard',
  templateUrl: './newstudent-dashboard.component.html',
  styleUrls: ['./newstudent-dashboard.component.scss']
})
export class NewstudentDashboardComponent implements OnInit, AfterViewInit {
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
  studentName:string;

  @ViewChild('objectiveEl') objectiveEl: ElementRef;

  constructor(private calendar: NgbCalendar, public ngbDatepickerI18n: NgbDatepickerI18n, public apiService: ApiService, public headerService: HeaderService,
    public router: Router) {
  }

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
    let userIdObj = {
      "user_id": this.userDetails.user_id
    }
    this.apiService.ssoStatus(userIdObj).subscribe(val => {
      let status = val.data.status
      if (status != 3) {
        this.tteTestTaken = false;
      } else {
        this.tteTestTaken = true;
      }
    });
  }

  ngAfterViewInit() {
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
}
