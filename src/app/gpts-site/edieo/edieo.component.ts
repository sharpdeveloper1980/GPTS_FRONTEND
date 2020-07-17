import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HeaderService } from '../../shared/services/header.service';
import { ApiService } from '../../core/api.service';

declare var $: any;
declare var jquery: any;
declare var AOS: any;
@Component({
  selector: 'app-edieo',
  templateUrl: './edieo.component.html',
  styleUrls: ['./edieo.component.scss'],
  
})
 
export class EdieoComponent implements OnInit {
  config: any;
  leadership:  Array<any> = [];
  team: Array<any> = [];
  ebanner: any;
  bvideo : any;
  btittle : string;
  bdescp : string;
  btype : string;
  bid : any;
  show: number = 10;
  career:Array<any> = [];
  college:Array<any> = [];
  country:Array<any> = [];
  mustknow:Array<any> = [];
  listCareer: Array<any> = [];
  subCareerData:Array<any>=[];
  getCareerInfo : string;
  subCareerList : any;
  pname : string;
  pabout : string;
  exp_video_thumb : string;
  exp_video : string;
  careerSlug:string;
  careerAbout: number = 500;
  relatedUniversityConfig:any;
  edieoBanner:any;
  stickyPosition: boolean = false
  stopScrollTop: any;
  removeSticky: boolean = false;
  paboutLength:number;
  defaultCareerId:number;
  dreamConfig: any;
  idValue:number;
  idValues:number;
  institutionList:Array<any>;
  universityList:Array<any>=[];
  universityListVideo:Array<any>;
  clusters: Array<any> = [];
  clusterdetail:Array<any>=[];
  firstClusterName:string;
  universityVideoThumb:string;
  universityVideoVideo:string;
  @ViewChild('pageFooter') pageFooter: ElementRef;
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  signedUp: boolean = false;
  loggedIn: boolean = false;
  forgotPasswordShow: boolean = false;
  formError: Array<any> = [];

  constructor(private headerService: HeaderService, private apiService:ApiService, public router: Router) { 
    this.config = {
      direction: 'horizontal',
      slidesPerView: 'auto',
    };
    
    
  }

  ngOnInit() {
    document.body.classList.add("about-body");

    // Loader
    setTimeout(()=>{
      this.getUserInfo();
      this.headerService.loaderFunction(false);
      this.getEdieoBanner();
      this.getEdieo();
      this.getCareerList();
      this.getData();
      this.getInstituteList();
    }, 3000);
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

    //carousel function
    this.dreamConfig = {
      grabCursor: true,
      slidesPerView: 'auto',
      direction: 'horizontal',
      speed: 500,
      spaceBetween: 20,
      autoplay:false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        },
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    }
this.getData();

this.edieoBanner={
  autoplay: 3000, // Autoplay option having value in milliseconds
  initialSlide: 1, // Slide Index Starting from 0
  slidesPerView: 1, // Slides Visible in Single View Default is 1
 // pagination: '.swiper-pagination', // Pagination Class defined
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  paginationClickable: true, // Making pagination dots clicable
  nextButton: '.swiper-button-next', // Class for next button
  prevButton: '.swiper-button-prev', // Class for prev button
  spaceBetween: 30 // Space between each Item
}
  
  }

  getEdieoBanner() {
    this.apiService.getEdieoBanner().subscribe(val=>{
        this.ebanner = val.data[0];
        this.bvideo = val.data[0].video;
        this.btittle = val.data[0].title;
        this.btype = val.data[0].type;
        this.bid = val.data[0].id;
        this.bdescp = val.data[0].descp;
    })
  }

  getCareerList()
  {
    this.apiService.getCareerList().subscribe(val => {
      this.listCareer = val.data;
      this.careerSlug= val.data[0].slug;
      this.defaultCareerId=val.data[0].career_id;
      console.log('listcareer data',this.listCareer);

      this.apiService.getCourseInfo({'slug' : this.careerSlug}).subscribe(val => {
        this.pname = val.data.name;
        this.pabout = val.data.about; 
        this.paboutLength=val.data.about.length;
        this.exp_video_thumb = val.data.exp_video_thumb;
        this.exp_video = val.data.exp_video;
       
      });

      this.apiService.getEdieoCareer(this.defaultCareerId).subscribe(val=>{
        this.subCareerData=val.data;
        this.subCareerList = val.data.career;
        console.log('Sub career list',this.subCareerList);
      })
      
    });
  }
  getEdieo() {
    this.apiService.getEdieo().subscribe(val=>{
      this.career = val.data['career'];
      console.log('career data', this.career);
      this.college = val.data['college'];
      this.mustknow = val.data['mustknow'];
      this.country = val.data['country'];
    })
  }
  
  searchVideo(event) {
    // alert(1);
      this.router.navigate(['/edieo-detail/career', event]);
     
   }
   
  ngOnDestroy() {
    document.body.classList.remove("about-body");
  }
  
  showClusterDive($event,item,id) {
    //alert(item);
    setTimeout(function(){
      $('html, body').animate({
         scrollTop: $('#careerAsideSection').offset().top-60
      },'');
 },0);
    this.apiService.getCourseInfo({'slug' : item}).subscribe(val => {
      this.getCareerInfo = val.data;
      console.log('careerinfo',this.getCareerInfo)
      this.pname = val.data.name;
      this.pabout = val.data.about; 
      this.paboutLength=val.data.about.length;
      this.exp_video_thumb = val.data.exp_video_thumb;
      console.log('career thumb',this.exp_video_thumb);
      this.exp_video = val.data.exp_video;
     
     })
     
     this.apiService.getEdieoCareer(id).subscribe(val=>{
      this.subCareerData=val.data;
      this.subCareerList = val.data.career;
      console.log('Sub career list',this.subCareerList);
    })
    


     let heartElement: HTMLElement = $event.currentTarget;
    let currText = $(heartElement).text();
    let dreamInstituteHeight = $('.dream-institute').height();
    console.log(currText);
    $('.edieo-section .atricle-menu ul li').removeClass('activeLink');
    $(heartElement).addClass('activeLink');
    $('.mobile-select-grop').removeClass('active');
    $('#careerMenu').removeClass('show')
    $('.mobile-select-grop span').html(currText);
    // $('html, body').animate({
    //   scrollTop: $('.tab-content .tab-pane').offset().top+dreamInstituteHeight+200
    // },1000);



    }

    videoPopup($event){
      setTimeout(function(){
        $("#dreamVideoPopup").modal('show');
      },1000);
    }
    removeBootstrapModal(id) {
      $("#dreamVideoPopup").modal('hide'); 
      $.each($("video"), function () {
        if ($(this).get(0).id === id) {
        } else {
         $(this).get(0).pause();
          $(this).get(0).suspend;
        }
      });
    }
    careerSectionMenu($event){    
      let heartElement: HTMLElement = $event.currentTarget;
      $(heartElement).toggleClass('active');
      $('#careerMenu').toggleClass('show');
    }

 changeUI(event) {
  this.stickyPosition = event;
}

stopScroll(event) {
  this.removeSticky = event;
  this.stopScrollTop = this.pageFooter.nativeElement.offsetTop - (this.scrollContainer.nativeElement.scrollHeight+800);
  console.log(this.stopScrollTop);
}

edeioVideoPopupTop($event,id){
    this.idValue = id;
    
    setTimeout(function(){
      $("#edeioVideoPopup").modal('show');
    },1000);
  }
  edeioVideoPopup($event,id){
    this.idValues = id;
    //alert(this.idValues);
    //console.log($event);
    setTimeout(function(){
      //alert('here');
      $("#edeioVideoPopup2").modal('show');
    },1000);
    // this.apiService.clusterDetail(tte_career_id).subscribe(val => {
      
    //   this.clusterdetail = val.cluster;
    //   this.collegelist = val.collegelist;      
      
    //   //console.log(val.cluster[0].college_no);
    // });
  }
  removeBootstrapModal2(id) {
    $("#edeioVideoPopup2").modal('hide');    
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

  getData(){
  this.apiService.getdiscoverCollege().subscribe(val=>{
    this.clusters = val.clusters;
    this.firstClusterName=this.clusters[0].name;
  });
  this.apiService.universityList().subscribe(val=>{
    this.universityList=val.institutes;
    console.log("univ List : "+this.universityList)
  })
}

InstituteVideoPopup(id){
  this.apiService.universityList().subscribe(val=>{
    //this.universityListVideo=val.institutes[id-1];
    this.universityVideoThumb=val.institutes[id-1].master_cover;
      this.universityVideoVideo=val.institutes[id-1].master_video;
    if(this.universityVideoThumb==''){
    alert('Video is not Available.');
    }else{      
    }
   
  })
    setTimeout(function(){
      $("#dreamuniVideoPopup").modal('show');
    },1000);   
  }
  
  removeDreamBootstrapModal(id) {
    $("#dreamuniVideoPopup").modal('hide'); 
    $('#clusterVideoPopup').modal('hide');
    $.each($("video"), function () {
      if ($(this).get(0).id === id) {
      } else {
       $(this).get(0).pause();
        $(this).get(0).suspend;
      }
    });
  }

  getUserInfo() {
    this.headerService.userInfoLsObservable().subscribe(user => {
      if (typeof user != undefined && typeof user != 'string') {
        this.signedUp = true;
        this.loggedIn = user.is_eligible_for_dashboard;
      }
    console.log("User : "+user);
    });
  }

  emptyError() {
    this.formError = [];
  }

  showSignInModal() {
    $("#signupModal").modal('hide');
    this.forgotPasswordShow = false;
    $("#exampleModal").modal('show');
    this.emptyError();

  }

}
