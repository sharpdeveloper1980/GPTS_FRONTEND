import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

//Services
import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';

declare var $: any;
@Component({
  selector: 'app-must-watch',
  templateUrl: './must-watch.component.html',
  styleUrls: ['./must-watch.component.scss']
})
export class MustWatchComponent implements OnInit, AfterViewInit {
  videoSrc: string = '';
  expertLevel: string = '';
  videoArray: Array<any> = [];
  recVidArray: Array<any> = [];
  videoName: string;
  videoTitle: string;
  heartActive: boolean = false;
  careerList: Array<any>;
  videoLoad: boolean = false;
  videoSerachList: any;
  userData: any;
  userId: any;
  tteTestTaken: boolean = false;
  careerSlug: string;
  recArray: Array<any> = [];
  noVideo: string = '';

  constructor(private apiService: ApiService, public headerService: HeaderService, public router: Router) {
    this.headerService.loaderFunction(true);
  }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('userGpts')).user_id;
    let userIdObj = {
      "user_id": this.userId
    }
    this.apiService.ssoStatus(userIdObj).subscribe(val => {
      let status = val.data.status
      if (status != 3) {
        this.tteTestTaken = false;
        this.headerService.loaderFunction(false);
      } else {
        this.tteTestTaken = true;
        this.getVids();
        this.apiService.getCareerList().subscribe(val => {
          this.careerList = val.data;
        });
      }
    });
  }

  ngAfterViewInit() {
  }

  addToFav(id, $event) {
    let data = {
      "user_id": this.userId,
      "career_video_id": id,
      "type": "add"
    }
    let heartElement: HTMLElement = $event.currentTarget;

    if (heartElement.classList.contains('inactive')) {
      heartElement.classList.remove('inactive');
      this.apiService.addFavVideo(data).subscribe(val => {
        if (val.code != 200) {
          heartElement.classList.add('inactive');
        }
      });
    } else {
      data.type = "delete";
      heartElement.classList.add('inactive');
      this.apiService.addFavVideo(data).subscribe(val => {
        if (val.code != 200) {
          heartElement.classList.remove('inactive');
        }
      });
    }
  }

  searchVideo(value) {
    let data = {
      "career_id": value.career_id,
      "user_id": this.userId,
      "type": 1
    }
    this.careerSlug = value.slug;
   
    this.apiService.getMustWatch(data).subscribe(val => {
      let videoData = val.data.subcareer_video;
      console.log(val.total);
      if (val.total == 0) {
        this.noVideo = val.msg;
        this.videoArray = [];
      } else {
        this.noVideo = ''
        this.videoArray = videoData;
        this.videoLoad = true;
      }
      
    });
  }


  // Stop video functions
  stopAllVid(val, idStatic) {
    $.each($("video"), function () {
      if ($(this).get(0).id === idStatic + val) {
        return;
      } else {
        $(this).get(0).pause();
        $(this).get(0).suspend;
      }
    });
  }

  getVids() {
    let dataId = {
      "user_id": this.userId
    }
    let careerId;
    this.apiService.getResult(dataId).subscribe(val => {
      careerId = val.data.assessments[0];
      this.getRecVids();
      careerId = careerId.results.ranked_occupations[0];
      careerId = careerId.id;
      this.headerService.loaderFunction(false);
    });
  }

  getRecVids() {
    let data = {
      "user_id": this.userId
    }
    this.apiService.getRecommVideos(data).subscribe(val => {
      console.log(val);
      this.recVidArray = val.data;
      this.videoLoad = true;
    });

    // let tempRecArray = value.split(0,5);

    // let data = {
    //   "career_id": 2,
    //   "user_id": this.userId
    // };

    // this.apiService.getMustWatch(data).subscribe(val => {
    //   this.recVidArray = val.data;
    // });
  }

}
