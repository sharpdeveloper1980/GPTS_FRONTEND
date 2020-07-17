import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HeaderService } from '../../shared/services/header.service';
import { ApiService } from '../../core/api.service';
import { Router, ActivatedRoute } from "@angular/router";

import { gliBout } from './gli-data';
declare var $: any;
@Component({
  selector: 'app-gli-certification',
  templateUrl: './gli-certification.component.html',
  styleUrls: ['./gli-certification.component.scss']
})
export class GliCertificationComponent implements OnInit, AfterViewInit {
  benifitsGliConfig: any;
  testConfig: any = {
    grabCursor: true,
    slidesPerView: 'auto',
    speed: 500,
    spaceBetween: 25,
    navigation: {
      nextEl: '.swiper-button-next-test',
      prevEl: '.swiper-button-prev-test',
    },
    autoplay: {
      delay: 2000
    }
  };
  popularConfig: any = {
    grabCursor: true,
    slidesPerView: 'auto',
    speed: 500,
    spaceBetween: 25,
    navigation: {
      nextEl: '.swiper-button-next-popular',
      prevEl: '.swiper-button-prev-popular',
    },
    autoplay: {
      delay: 2000
    }
  };
  gliBout: String = gliBout;
  sliceVar: number = 200;
  registeredCheck: boolean = false;
  loggedIn: boolean = false;
  homeVideoUrl: string = '';
  homeVideoThumb: string = '';

  constructor(public headerService: HeaderService, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    document.body.classList.add("glicertification-body");
    this.getUserInfo();
    this.getVideo();
  }

  ngAfterViewInit() {
  }

  getUserInfo() {
    this.headerService.userInfoLsObservable().subscribe(user => {
      if (typeof user != undefined && typeof user != 'string') {
        this.registeredCheck = true;
        this.loggedIn = user.is_eligible_for_dashboard;
      }
    })
  }

  getVideo() {
    let data = {
      'type': 4
    }
    this.apiService.getGLIVideo(data).subscribe(val => {
      this.homeVideoUrl = val.data[0].video;
      this.homeVideoThumb = val.data[0].video_thumb;
      setTimeout(() => {
        this.headerService.loaderFunction(false);
      }, 1000);
    })
  }
  

  openSignupModal() {
    if (this.registeredCheck) {
      this.router.navigate(['/user-signup'])
    } else {
      $("#signupModal").modal('show');
    }
  }

  ngOnDestroy() {
    document.body.classList.remove("glicertification-body");
  }

}
