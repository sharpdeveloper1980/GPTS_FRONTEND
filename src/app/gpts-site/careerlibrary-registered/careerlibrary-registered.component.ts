import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';
@Component({
  selector: 'app-careerlibrary-registered',
  templateUrl: './careerlibrary-registered.component.html',
  styleUrls: ['./careerlibrary-registered.component.scss']
})
export class CareerlibraryRegisteredComponent implements OnInit {
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
  userId: any;
  prevVidArr: Array<any> = [];
  recomVidArr: Array<any> = [];
  recomVar: boolean = false;
  prevVar: boolean = false;
  browseListConfig: any;
  scrollbarOptions: any = { axis: 'y', theme: 'dark' };
  contentLoaded: boolean = false;
  listCareer: Array<any> = [];

  @ViewChild('videoSetContainer') videoSetContainer: ElementRef;


  constructor(private apiService: ApiService, private headerService: HeaderService) { }

  ngOnInit() {
    this.getUserInfo();
    document.body.classList.add("careerlibrary-body");

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

    this.getCareerData();
    this.getPrevVids();
  }

  getCareerData() {

    let data = {
      "user_id": this.userId
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
    });

    this.apiService.getRecommVideos(data).subscribe(val => {
      this.recomVidArr = val.data;
      this.recomVar = true;
    });

    this.apiService.getCareerList().subscribe(val => {
      this.listCareer = val.data;
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
        this.userId = user.user_id
        this.loggedIn = user.is_eligible_for_dashboard;
      }
    })
  }


  getPrevVids() {
    let data = {
      "user_id": this.userId
    }
    this.apiService.getPrevVideo(data).subscribe(val => {
      this.prevVidArr = val.data;
      if (this.prevVidArr.length) {
        this.prevVar = true;
      }
    });
  }

  addToFav(id, $event, fav) {
    let data = {
      "user_id": this.userId,
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

  ngOnDestroy() {
    document.body.classList.remove("careerlibrary-registered-body");
  }

}
