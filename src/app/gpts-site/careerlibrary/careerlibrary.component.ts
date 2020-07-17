import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';
declare var $: any;
@Component({
  selector: 'app-careerlibrary',
  templateUrl: './careerlibrary.component.html',
  styleUrls: ['./careerlibrary.component.scss']
})
export class CareerlibraryComponent implements OnInit, AfterViewInit {
  greatMindsConfig: any;
  greatMindsArr: any;
  careeListConfig: any;
  inspiringVid: Array<any> = [];
  latestVideo: any;
  careerList: Array<any> = [];
  videoList: Array<any> = [];
  videoListAll: Array<any> = [];
  videoSerachList: any;
  greatMindsArrVal: boolean = false;
  backBtn: boolean = false;
  loggedIn: boolean = false;
  signedUp: boolean = false;
  browseListConfig: any;
  contentLoaded: boolean = false;
  tagsInputEl: ElementRef;
  listCareer: Array<any> = [];
  scrollbarOptions: any = { axis: 'y', theme: 'dark' };
  show: boolean = false;
  getCareerInfo : string;
  parentSlug : string;
  subCareerList : any;
  pname : string;
  pabout : string;
  exp_video_thumb : string;
  exp_video : string;

  @ViewChild('videoSetContainer') videoSetContainer: ElementRef;
  @ViewChild('tagsInputContainer') set tagsInputContainer(tagsInputContainer: ElementRef) {
    if (typeof tagsInputContainer != 'undefined') {
      this.tagsInputEl = tagsInputContainer;
      let width = this.tagsInputEl.nativeElement.offsetWidth;
      // console.log(this.tagsInputEl.nativeElement)
      // console.log(width);
      // console.log($('.ng2-dropdown-menu'));
      $('.ng2-dropdown-menu').width(width);
    }
  };

  constructor(private apiService: ApiService, private headerService: HeaderService, public route: Router) {
  }

  ngOnInit() {
    this.getUserInfo();
    document.body.classList.add("careerlibrary-body");
    this.greatMindsConfig = {
      grabCursor: true,
      slidesPerView: 'auto',
      direction: 'horizontal',
      speed: 500,
      spaceBetween: 25,
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next-inspi',
        prevEl: '.swiper-button-prev-inspi',
      },
      simulateTouch: false,
      breakpoints: {
        992: {
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 0,
        }
      }
    }

    this.careeListConfig = {
      grabCursor: true,
      slidesPerView: 'auto',
      direction: 'horizontal',
      speed: 500,
      spaceBetween: 25,
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next-career',
        prevEl: '.swiper-button-prev-career',
      }
    }

    this.browseListConfig = {
      grabCursor: true,
      slidesPerView: 'auto',
      direction: 'horizontal',
      speed: 500,
      spaceBetween: 25,
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next-browse',
        prevEl: '.swiper-button-prev-browse',
      }
    }

  }

  ngAfterViewInit() {
    this.getCareerData();
  }

  getCareerData() {
    let data = {
      "user_id": 0
    }

    this.apiService.getCareerLibrary(data).subscribe(val => {
      this.latestVideo = val.data.latestcareervideo;
      this.careerList = val.data.careerlist;
      this.videoList = val.data.careervideolist;
      this.videoListAll = this.videoList;
      setTimeout(() => {
        this.contentLoaded = true;
        this.headerService.loaderFunction(false);
        // let width = this.tagsInputEl.nativeElement.width;
        // $('.ng2-dropdown-menu').width(width);
      }, 2000);
    });

    this.apiService.getInspiringVideos().subscribe(val => {
      this.greatMindsArr = val.data.inspiringvideo;
      this.greatMindsArrVal = true;
    })

    this.apiService.getCareerList().subscribe(val => {
      this.listCareer = val.data;
    });
  }

  openSignupModal() {
    if (this.signedUp) {
      this.route.navigate(['/user-signup']);
    } else {
      $("#signupModal").modal('show');
    }
  }

  showClusterDive(item) {

     this.show = true;
     this.parentSlug = item;
     this.apiService.getCourseInfo({'slug' : item}).subscribe(val => {
       this.getCareerInfo = val.data;
       this.pname = val.data.name;
       this.pabout = val.data.about; 
       this.exp_video_thumb = val.data.exp_video_thumb;
       this.exp_video = val.data.exp_video;
       this.subCareerList = val.data.sub_career_list;
      })

     setTimeout(function(){
           $('html, body').animate({
              scrollTop: $('#scrollcluster').offset().top-130
           },'slow');
      },1000);
      

      
  }

  adjustWidth(el: ElementRef) {
    // let width = el.nativeElement.offsetWidth;
    console.log(el);

    // console.log(width);
    console.log($('.ng2-dropdown-menu'));
    // $('.ng2-dropdown-menu').width(width);
    console.log($('.ng2-dropdown-menu').width())
  }


  scrollToCareer(id) {
    let careerID = 'careerId' + id;
    let el = document.getElementById(careerID).offsetTop - 70;
    let elRef = document.getElementById(careerID).offsetTop - this.videoSetContainer.nativeElement.offsetTop
    this.videoSetContainer.nativeElement.scrollTop = elRef;
    window.scrollTo({
      top: el,
      behavior: 'smooth'
    });
  }

  searchVideo(val) {
    let elementId = val.career_id;
    this.focusCareer(elementId);
  }

  focusCareer(id) {
    this.videoList = [];
    let vid = this.videoListAll.find(function (element) {
      return element.career_id === id
    });
    this.videoList.push(vid);
    this.backBtn = true
  }

  videoAll() {
    this.videoList = this.videoListAll;
    this.backBtn = false;
  }

  getUserInfo() {
    this.headerService.userInfoLsObservable().subscribe(user => {
      if (typeof user != undefined && typeof user != 'string') {
        this.signedUp = true;
        this.loggedIn = user.is_eligible_for_dashboard;
      }
    });
  }

  checkLoggedIn($event) {
    if (this.loggedIn || !this.loggedIn) {
      $event.preventDefault();
      $event.stopPropagation();
      let vid = $event.currentTarget.querySelector('video');
      vid.pause();
      vid.src = vid.src;
      this.openSignupModal();
    } else {
      
    }
  }


  // @HostListener('window:resize', ['$event'])
  // onresize(event) {
  //   let width = this.tagsInputEl.nativeElement.width;
  //   console.log(width);
  //   $('.ng2-dropdown-menu').width(width);
  // }
  
  // Stop video functions
  stopAllVid(idStatic) {
    $.each($("video"), function () {
      if ($(this).get(0).id === idStatic) {
        return;
      } else {
        $(this).get(0).pause();
        $(this).get(0).suspend;
      }
    });
  }

  ngOnDestroy() {
    document.body.classList.remove("careerlibrary-body");
  }
}
