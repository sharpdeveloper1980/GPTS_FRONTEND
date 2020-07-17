import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { productsCarousel } from './home-carousel-data';
import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';

declare var $: any;
declare var jquery: any;
declare var AOS: any;
@Component({
  selector: 'app-home-four',
  templateUrl: './home-four.component.html',
  styleUrls: ['./home-four.component.scss']
})
export class HomeFourComponent implements OnInit {
  productsCarouselConfig: any;
  blogsConfig: any;
  productsCarousel: any = productsCarousel;
  blogsCarousel: any;
  randomCareer: any;
  homeCareerVideoTitle: String;
  homeCareerVideoUrl: String;
  homeCareerVideoThumb: String;
  homeCollegeVideoTitle: String;
  homeCollegeVideoUrl: String;
  homeCollegeVideoThumb: String;
  homeNanoVideoTitle: String;
  homeNanoVideoUrl: String;
  homeNanoVideoThumb: String;
  scrolledOver: boolean = false;
  homeVideoTitle: String;
  homeVideoUrl: String;
  homeVideoThumb: String;
  videoLoad: boolean = false;
  registeredCheck: boolean = false;
  blogList: any;
  blogListVar: boolean = false;
  aboutGptsConfig: any;
  showMoreInnovations: boolean = false;
  loggedIn: boolean = false;
  showMenu: boolean = false;
  careerList: Array<any>;
  

  @ViewChild('headerElement') headerElement: HTMLElement;
  @ViewChild('homeVideo') homeVideo: ElementRef;
  @ViewChild('playIcon') playIcon: ElementRef;

  constructor(public apiService: ApiService, public headerService: HeaderService, public router: Router) { }

  ngOnInit() {
    this.getCareerList();
    document.body.classList.add("homethree-body");
    this.carouselInitialization();
    this.getUserInfo();
    this.getRandomCareerVideo();
    this.getBlogs()
    let vidData = {
      "type": 1
    }
    this.apiService.getHomeVideo(vidData).subscribe(val => {
      this.homeVideoTitle = val.data.title;
      this.homeVideoUrl = val.data.video;
      this.homeVideoThumb = val.data.video_thumb;
      //alert(this.homeVideoThumb);
      setTimeout(() => {
        this.videoLoad = true;
        this.headerService.loaderFunction(false);
        AOS.init();
      }, 1000);
     
    });

  }

  ngAfterViewInit() {
    $("div.bhoechie-tab-menu>div.list-group>a").click(function (e) {
      e.preventDefault();
      $(this).siblings('a.active').removeClass("active");
      $(this).addClass("active");
      var index = $(this).index();
      $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
      $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });
  }

  carouselInitialization() {
    this.productsCarouselConfig = {
      // Optional parameters
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      direction: 'horizontal',
      loop: 'true',
      speed: 1500,
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      autoplay: {
        delay: 2000,
        reverseDirection: true,
      },

      // And if we need scrollbar
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: false,
      },
      breakpoints: {
        700: {
          slidesPerView: 1,
          centeredSlides: true
        },
        992: {
          slidesPerView: 2,
          centeredSlides: true
        }
      }

      // autoplay:{
      //   delay: 3000,
      //   disableOnInteraction:true
      // }
    }

    this.blogsConfig = {
      grabCursor: true,
      slidesPerView: 'auto',
      direction: 'horizontal',
      speed: 500,
      spaceBetween: 25,
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next-blogs',
        prevEl: '.swiper-button-prev-blogs',
      },
      autoplay: {
        delay: 4000,
      },
    }

    this.aboutGptsConfig = {
      grabCursor: true,
      slidesPerView: 'auto',
      direction: 'horizontal',
      speed: 500,
      spaceBetween: 25,
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 4000,
      },
      centeredSlides: true,
      loop: true
    }
  }

  changeUI(event) {
    this.scrolledOver = event;
  }

  playVideo() {
    let video = this.homeVideo.nativeElement;
    let playIcon = this.playIcon.nativeElement;
    if (video.paused) {
      playIcon.classList.add('hide');
      video.play();
    } else {
      playIcon.classList.remove('hide');
      video.pause();
    }
  }

  openSignupModal() {
    if (this.registeredCheck) {
      this.router.navigate(['/user-signup'])
    } else {
      $("#signupModal").modal('show');
    }

  }

  videoEnded(playIcon) {
    playIcon.classList.remove('hide');
  }

  getUserInfo() {
    this.headerService.userInfoLsObservable().subscribe(user => {
      if (typeof user != undefined && typeof user != 'string') {
        this.registeredCheck = true;
        this.loggedIn = user.is_eligible_for_dashboard;
      }
    })
  }

  getBlogs() {
    this.apiService.getAllBlogs().subscribe(val => {
      this.blogsCarousel = val.data;
      this.blogListVar = true;
    });
  }

  getRandomCareerVideo() {
    this.apiService.getRandomCareerVideo().subscribe(val => {
      //this.getRandomCareerVideo = val.data;

      this.homeNanoVideoTitle = val.data[0].title;
      this.homeNanoVideoUrl = val.data[0].video;
      this.homeNanoVideoThumb = val.data[0].video_thumb;

      this.homeCareerVideoTitle = val.data[1].title;
      this.homeCareerVideoUrl = val.data[1].video;
      this.homeCareerVideoThumb = val.data[1].video_thumb;

      this.homeCollegeVideoTitle = val.data[2].title;
      this.homeCollegeVideoUrl = val.data[2].video;
      this.homeCollegeVideoThumb = val.data[2].video_thumb;
      
    });
  }

  ngOnDestroy() {
    document.body.classList.remove("homethree-body");
  }

  stopAllVid(idStatic) {
    //alert(idStatic)
    $.each($("video"), function () {
      if ($(this).get(0).id === idStatic) {
        return;
      } else {
        $(this).get(0).pause();
        $(this).get(0).suspend;
      }
    });
  }
  
  searchVideo(event) {
   // alert(1);
    this.router.navigate(['/course', event]);
    this.showMenu = false;
  }
  getCareerList() {
    this.apiService.getCareerList().subscribe(val => {
      this.careerList = val.data;
    });
  }
  toggleHeader() {
    this.showMenu = !this.showMenu;
    if ($(".scholar_head").length == 0) {
      setTimeout(function () {
        $('.dropdown-menu-large').attr('style', 'top: 52px !important');
      }, 1);
    }

  }

}
