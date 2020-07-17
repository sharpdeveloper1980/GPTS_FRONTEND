import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderService } from '../../shared/services/header.service';
import { ApiService } from '../../core/api.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-my-favourite-video',
  templateUrl: './my-favourite-video.component.html',
  styleUrls: ['./my-favourite-video.component.scss']
})
export class MyFavouriteVideoComponent implements OnInit, AfterViewInit {
  currentJustify = 'center';
  userId: any;
  videoLoad: boolean = false;
  favVideoExist: boolean = false;

  constructor(public headerService: HeaderService, public apiService: ApiService, public router: Router) { 
    this.headerService.loaderFunction(true);
  }
  videoArray: Array<any>;
  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('userGpts')).user_id;
    // this.headerService.dashboardHomeObservable().subscribe(val => {
    //   if (!val) {
    //     this.router.navigate(['student-dashboard', 'student-profile']);
    //   }
    // });

    this.getMyfavVideos();
  }

  ngAfterViewInit() {
    this.jqueryFunctions();
    // this.getUserProfileData(this.userDetails);
  }

  jqueryFunctions() {

  }

  getMyfavVideos() {
    let data = {
      "user_id": this.userId
    }
    this.apiService.getFavVideo(data).subscribe(val => {
      this.videoArray = val.data;
      if(this.videoArray.length){
        this.favVideoExist = true;
        this.videoLoad = true;
      } else {
        this.favVideoExist = false;
        this.videoLoad = false;
      }
      setTimeout(() => {
        this.headerService.loaderFunction(false);
      }, 500);
    });
  }

  addToFav(videoId, id, $event, vType) {
    let data = {
      "user_id": this.userId,
      "career_video_id": id,
      "type": "delete",
      "vtype": vType,
    }
    let heartElement: HTMLElement = $event.currentTarget;
    heartElement.classList.add('inactive');
    this.apiService.addFavVideo(data).subscribe(val => {
      if (val.code != 200) {
        heartElement.classList.remove('inactive');
      } else {
        let removedVid = "#fav" + videoId;
        $(removedVid).hide();
      }
    });
  }

  checkActiveTab(event) {
    let activeTab = event.nextId;
    console.log(activeTab)
    if (activeTab = "college") {
      setTimeout(() => {
        $('.second').circleProgress({
          startAngle: 90
          , thickness: 13
          , value: 0.8
          , fill: {
            gradient: ['#1c556a', '#55c483'] // or color: '#3aeabb', or image: 'http://i.imgur.com/pT0i89v.png'
          }
          ,
        });
      }, 200)
    }
  }

  stopAllVid(val) {
    $.each($("video"), function () {
      console.log("favideo" + val);
      console.log($(this).get(0).id);
      if ($(this).get(0).id === "favideo" + val) {
        return;
      } else {
        $(this).get(0).pause();
        $(this).get(0).suspend;
      }
    });
  }

}


