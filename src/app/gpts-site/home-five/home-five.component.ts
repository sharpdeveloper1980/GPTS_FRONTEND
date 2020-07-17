import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { productsCarousel } from './home-carousel-data';
import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';

declare var $: any;
declare var jquery: any;
declare var AOS: any;
@Component({
  selector: 'app-home-five',
  templateUrl: './home-five.component.html',
  styleUrls: ['./home-five.component.scss']
})
export class HomeFiveComponent implements OnInit {
  productsCarouselConfig: any;
  blogsConfig: any;
  upcomingShowcase:any;
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
  selected:any;
  loggedIn: boolean = false;
  showMenu: boolean = false;
  careerList:Array<any>;
  institutionList:Array<any>;
   // slick data 
   careeerConfig: any;
   test34:any;
   circleSlideConfig = {
     slidesPerView: 'auto',
     centeredSlides: false
   };
   topSecVideoUrl:string;
   topSecVideoThumb:string;
   idValue:number;
   homeVideoBg:Array<any>;
   homeVideoBgUlr:string;
   homeTopVideoList:Array<any>;
   idValues:number;

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
    this.getInstituteList();
    this.homeTopVideos();
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

    this.careeerConfig = {
      grabCursor: true,
      slidesPerView: 'auto',
      direction: 'horizontal',
      speed: 500,
      autoplay: {
        delay: 5000,
      },
      spaceBetween: 20,
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    }
    
    //carousel function ['Design college playlist','Humanities Pro','Knowledge Series','India’s //Top-10','Master Stories','The Great Challenge','Great Indian School','Career 
    //Discovery','AAP','Edstead','Summer School']

    let textLink = ['Summer School','Knowledge Webinar','Master Stories','1 App','Great Indian School','Knowledge Studio','Great Challenge','India’s Top-10'];
    this.upcomingShowcase = {
      grabCursor: true,
      slidesPerView: 1,
  slidesPerGroup: 1,
  loopedSlides: 1,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      speed: 500,
      spaceBetween: 20,
      autoplay: {
        delay: 5000,
      },
      // pagination arrows      
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          console.log(index);
          if (index < 8) {
            return '<span class="' + className + '"><img src="assets/images/home-five/plus.png" alt="icon">' + (textLink[index]) + '</span>';
          }
          return '';  
          },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    }
      
    
  }


  homeTopVideos(){
    this.apiService.homeTopVideoList().subscribe(val=>{
      this.homeVideoBg = val.data['bg'];
      this.homeVideoBgUlr=this.homeVideoBg[0].video;
      this.homeTopVideoList=val.data['videos'];
    })
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
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next-blogs',
        prevEl: '.swiper-button-prev-blogs',
      },
      pagination: {
        el: '.swiper-pagination2',
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
    this.router.navigate(['/edieo-detail/career', event]);
    this.showMenu = false;
  }
 test4(){
  this.router.navigate(['/edieo']);
 }
  getCareerList() {
    // this.apiService.getCareerList().subscribe(val => {
    //   this.careerList = val.data;
    // });
    this.apiService.getEdieo().subscribe(val=>{
      this.careerList = val.data['career'];
      console.log('career data', this.careerList);
    
    })
  }
  // onClose(select,searchTerm ) {
  //    if (this.selected) { 
  //     this.router.navigate(['/edieo-detail/career', event]);
  //     } else { 
  //       this.router.navigate(['/edieo']);
  //     } }

  
  toggleHeader() {
    this.showMenu = !this.showMenu;
    if ($(".scholar_head").length == 0) {
      setTimeout(function () {
        $('.dropdown-menu-large').attr('style', 'top: 52px !important');
      }, 1);
    }

  }
  
  homeVideoPopupTop($event,id){
    this.idValue = id;
    
    setTimeout(function(){
      $("#homeVideoPopup").modal('show');
    },1000);
  }
  homeVideoPopup($event,id){
    this.idValues = id;
    //alert(this.idValues);
    console.log($event);
    setTimeout(function(){
      $("#homeVideoPopup2").modal('show');
    },1000);
    // this.apiService.clusterDetail(tte_career_id).subscribe(val => {
      
    //   this.clusterdetail = val.cluster;
    //   this.collegelist = val.collegelist;      
      
    //   //console.log(val.cluster[0].college_no);
    // });
  }
  removeBootstrapModal2(id) {
    $("#homeVideoPopup2").modal('hide');    
    $.each($("video"), function () {
      if ($(this).get(0).id === id) {
      } else {
       $(this).get(0).pause();
        $(this).get(0).suspend;
      }
    });
  }
  removeBootstrapModal(id) {
    $("#homeVideoPopup").modal('hide');    
    $.each($("video"), function () {
      if ($(this).get(0).id === id) {
      } else {
       $(this).get(0).pause();
        $(this).get(0).suspend;
      }
    });
  }

  getInstituteList(){
    this.apiService.getAllInstitutesList().subscribe(val=>{
      this.institutionList = val.data;
      console.log('institutionList', this.institutionList);
    });
  }

}
 