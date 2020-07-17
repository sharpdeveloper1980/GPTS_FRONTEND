import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from '../../shared/services/header.service';
import { ApiService } from '../../core/api.service';
import { Router, ActivatedRoute } from "@angular/router";

declare var $: any;
declare var jquery: any;
declare var AOS: any;

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class MicroUniversityComponent implements OnInit {
  aboutUnivConfig: any;
  wordsConfig: any;
  recomCourseConfig: any;
  aboutUnivText: String;
  coverLogoImg: String;
  college_type: String;
  location: String;
  logo: String;
  average_package_offer: String;
  collegeName: String;
  facilityName: String;
  facilityImage: String;
  prominentCompanyName: String;
  prominentCompanyImage: String;
  whychooseData: Array<any>;
  whychooseTitle: String;
  whychooseDesc: String;
  facilitiesList:Array<any>;
  facilitiesListArray:Array<any>;
  satisfaction_report: Array<any>;
  alumniTestimonial: Array<any>;
  universityData:Array<any> = [];
  relatedUniversityConfig:any;
  universityInfo:any;
  whyChooseUs:Array<any>;
  testimonials:Array<any>;
  testimonialsVideo:Array<any>;
  videoLibrary:Array<any>;
  recruiters:Array<any>;
  scholarShips:Array<any>;
  courseStream:Array<any>;
  courseTabContent:Array<any>;
  streamCourseDetail:Array<any>;
  suggestData:Array<any>;
  fac:string;
  aboutLength: number = 700;
  videoContentLength01:number=300;
  whyChooseLength:number = 150;
  videoTestiConfig:any;
  streamName:string;
  settingActive = 1;
  defaulId:number;
  show = false;
  showRec: number = 6;
  testimonialsVideo1:string;
  testimonialsVideo2:string;
  testimonialsVideo3:string;
  

  constructor(private headerService: HeaderService,public router:Router, private apiService:ApiService,config: NgbCarouselConfig,private activatedRoute: ActivatedRoute) {
    // customize default values of carousels used by this component tree
    config.interval = 2500;
    config.wrap = true;
    config.keyboard = false;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
    config.pauseOnHover = true;
    
    // this.reInitializeCarousel();
   }

   
   ngOnInit() {   
    setTimeout(()=>{
      this.headerService.loaderFunction(false);
      AOS.init();
    }, 2000);
    // this.getUniversityDetails();
    //carousel function
    this.relatedUniversityConfig = {
      grabCursor: true,
      slidesPerView: 'auto',
      direction: 'horizontal',
      speed: 500,
      spaceBetween: 20,
      autoplay: {
        delay: 5000,
      },
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    }

     //testimonial video carousel function
     this.videoTestiConfig = {
      grabCursor: false,
      direction: 'horizontal',
      speed: 500,
      spaceBetween: 30,
      infinite: true,
    a11y: true,   
    loop: false,
    slidesPerView: 3,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false,
    breakpoints: {
      // when window width is <= 1024px
      1024: {
        slidesPerView: 2,
      },
      // when window width is <= 1024px
      767: {
        slidesPerView: 1,
      },

    }
    }

  this.getUniversityData();
  
  }
//get data on load
  getUniversityData(){
    let id = this.activatedRoute.snapshot.paramMap.get('id')    
    this.apiService.universityDetails(id).subscribe(val=>{
      this.universityData= val.institutes;
      this.universityInfo=this.universityData['details'];
    this.facilitiesList = this.universityInfo.facilities.split(',');
   this.whyChooseUs=this.universityData['choose_us'];
   this.testimonials=this.universityData['testimonials']['textual'];
   this.testimonialsVideo=this.universityData['testimonials']['video'];
   this.videoLibrary= this.universityData['video_library'];
   this.recruiters=this.universityData['recruiters'];
   console.log('recruiters////////////////////////',this.recruiters.length);
   this.scholarShips=this.universityData['scholarships']; 
   this.testimonialsVideo1=this.testimonialsVideo[0].video;
   this.testimonialsVideo2=this.testimonialsVideo[1].video;
   this.testimonialsVideo3=this.testimonialsVideo[2].video;
   
          
    });

    this.apiService.universityCourseList(id).subscribe(courseVal=>{
      this.courseStream=courseVal.stream;
      console.log('stream data', this.courseStream);
      this.defaulId=this.courseStream[0]['id'];
      console.log('this default id',this.defaulId)
    
     let bothId=id+'/'+this.defaulId;
     this.apiService.universityCourseDetail(bothId).subscribe(val=>{
       this.streamName = val.stream;
       this.streamCourseDetail=val.data;
      //  this.courseTabContent=val.data['courses'];
      //  console.log('courses content', this.courseTabContent);
     })

    });

    this.apiService.getSuggestedInstitution(2).subscribe(val=>{
      this.suggestData=val.data;
      console.log('suggested data',this.suggestData)
    })

  }

  loaderPage(id){
   // alert(id);
    //this.router.navigate(['/university',id]);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
this.router.navigate(['/university',id]));
    
  }
  
//course detail api fetch based on id
  courseDetailTab(courseid){
    let id = this.activatedRoute.snapshot.paramMap.get('id'); 
    let bothId=id+'/'+courseid;
    this.apiService.universityCourseDetail(bothId).subscribe(val=>{
      this.streamName = val.stream;
      this.streamCourseDetail=val.data;
    })
    
  }

  stopAllVid(idStatic){
    $.each($("video"), function () {
      if ($(this).get(0).id === idStatic) {
        return;
      } else {
        $(this).get(0).pause();
        $(this).get(0).suspend;
      }
    });
  }
//    figure = $(".key-performance-video").hover( hoverVideo, hideVideo );
//    hoverVideo(e) {  
//     $('video', this).get(0).play(); 
// }
// hideVideo(e) {
//   $('video', this).get(0).pause(); 
// }

  classAdd($event){
    let kpiElement: HTMLElement = $event.currentTarget;
    $('.key-performance-video').removeClass('show');
    $(kpiElement).addClass('show');
   // $('video', '.key-performance-video').get(0).pause(); 
    //  $('.key-performance-video').find('video').pause();
    // $(kpiElement).find('video').get(idx).play();
    
    $(kpiElement).find('.video-content').css({'height':'auto','overflow':'visible'});
    
    }
    stopOtherVideo($event){   
       
      let kpiElement: HTMLElement = $event.currentTarget;
      $(kpiElement).removeClass('show'); 
      //$(kpiElement).find('video').get(0).pause();
      $(kpiElement).find('.video-content').css({'height':120,'overflow':'hidden'});
      }
    

  courseSectionMenu($event){    
    let heartElement: HTMLElement = $event.currentTarget;
    $(heartElement).toggleClass('active');
    $('#course-section').toggleClass('show');
  }
  closeSubmenu($event){
    //alert('1');
    let heartElement: HTMLElement = $event.currentTarget;
    let currText = $(heartElement).text();
    console.log(currText);
    $('.mobile-select-grop').removeClass('active');
    $('#course-section').removeClass('show')
    $('.mobile-select-grop span').html(currText);
  }
  courseTab(){
    $('#course-section').removeClass('show');
    $('.mobile-select-grop').removeClass('active');
  }
  // getUniversityDetails() {
  //   let data = { "slug": "delhi-collage-of-art" };
  //   this.apiService.getUniversityDetails(data).subscribe(val => {
  //     let collegeData = val.data;
  //     this.aboutUnivText = collegeData.basic_info.about;
  //     this.coverLogoImg = collegeData.basic_info.cover_logo;
  //     this.logo = collegeData.basic_info.logo;
  //     this.collegeName = collegeData.basic_info.name;
  //     this.college_type = collegeData.basic_info.college_type;
  //     this.facilityName = collegeData.facilities.fac_name;
  //     this.facilityImage = collegeData.facilities.icon;
  //     this.prominentCompanyName = collegeData.prominent.compy_name;
  //     this.prominentCompanyImage = collegeData.prominent.img;
  //     this.whychooseData = collegeData.whychoose;
  //     this.satisfaction_report = collegeData.satisfaction_report;
  //     this.alumniTestimonial = collegeData.alumini;
  //     this.reInitializeCarousel();
  //   });
  // }
  // reInitializeCarousel() {
  //   this.aboutUnivConfig = {
  //     direction: 'horizontal',
  //     slidesPerView: 'auto',
  //     navigation: {
  //       nextEl: '.swiper-button-next-about',
  //       prevEl: '.swiper-button-prev-about',
  //     },
  //     pagination: {
  //       el: '.swiper-pagination',
  //       type: 'fraction',
  //     },
  //   };

  //   this.wordsConfig = {
  //     direction: 'horizontal',
  //     slidesPerView: 1,
  //     navigation: 'false',
  //     pagination: {
  //       el: '.swiper-pagination',
  //       type: 'bullets',
  //     },
  //   };

  //   this.recomCourseConfig = {
  //     direction: 'horizontal',
  //     slidesPerView: 'auto',
  //     spaceBetween: 30,
  //   };
  // }

  universityVideoPopup(event){
    setTimeout(function(){
      $("#universityVideoPopup").modal('show');
    },0);
    
    // this.apiService.clusterDetail(tte_career_id).subscribe(val => {
      
    //   this.clusterdetail = val.cluster;
    //   this.collegelist = val.collegelist;      
      
    //   //console.log(val.cluster[0].college_no);
    // });
  }
  
  removeBootstrapModal(id) {
    $("#universityVideoPopup").modal('hide');    
    $.each($("video"), function () {
      if ($(this).get(0).id === id) {
      } else {
       $(this).get(0).pause();
        $(this).get(0).suspend;
      }
    });
  }


  

}
