import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from '../../shared/services/header.service';
import { ApiService } from '../../core/api.service';
declare var $: any;
declare var jquery: any;
declare var AOS: any;

@Component({
  selector: 'app-university-list',
  templateUrl: './university-list.component.html',
  styleUrls: ['./university-list.component.scss']
})
export class UniversityListComponent implements OnInit {
  dreamConfig:any;
  clusters: Array<any> = [];
  universityList:Array<any>=[];
  universityListVideo:Array<any>;
  clustersData:Array<any>=[];
  clusterdetail:Array<any>=[];
  collegelist:Array<any>=[];
  clusterList:Array<any>=[];
  universityVideoThumb:string;
  universityVideoVideo:string;
  firstClusterName:string;
  stickyPosition: boolean = false
  stopScrollTop: any;
  removeSticky: boolean = false;
  @ViewChild('pageFooter') pageFooter: ElementRef;
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  @ViewChild('subCourseContainer') subCourseContainer: ElementRef;
  signedUp: boolean = false;
  loggedIn: boolean = false;

  constructor(private headerService: HeaderService, private activatedRoute: ActivatedRoute,private apiService:ApiService,config: NgbCarouselConfig) { }

  ngOnInit() {
    setTimeout(()=>{
      this.headerService.loaderFunction(false);
      AOS.init();
    }, 2000);


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
this.clusterList=[
  {
    id:0,
    name:'All',
    slug:'all'
  },
  {
    id:1,
    name:'Media & Broadcasting',
    slug:'media'
  },
  {
    id:2,
    name:'Marketing, Advertising & Public Relations',
    slug:'marketAdvertise'
  },
  {
    id:3,
    name:'Industrial Design & Architecture',
    slug:'one'
  },
  {
    id:4,
    name:'Computers & Information Technology',
    slug:'compoterInfo'
  },
  {
    id:5,
    name:'Engineering / Technical',
    slug:'engineering'
  },
  {
    id:6,
    name:'Architecture Colleges',
    slug:'architectureColleges'
  },
  {
    id:7,
    name:'Armed Forces & Security',
    slug:'armedForce'
  },
  {
    id:8,
    name:'Public Policy, Politics & Law',
    slug:'publicPolicyLaw'
  },
  {
    id:9,
    name:'Finance',
    slug:'finance'
  },
]

// console.log(this.clusterList);

  }
  
getData(){
  this.apiService.getdiscoverCollege().subscribe(val=>{
    this.clusters = val.clusters;
    this.firstClusterName=this.clusters[0].name;
  });
  this.apiService.universityList().subscribe(val=>{
    this.universityList=val.institutes;
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
      $("#dreamVideoPopup").modal('show');
    },1000);   
  }
  
  removeBootstrapModal(id) {
    $("#dreamVideoPopup").modal('hide'); 
    $('#clusterVideoPopup').modal('hide');
    $.each($("video"), function () {
      if ($(this).get(0).id === id) {
      } else {
       $(this).get(0).pause();
        $(this).get(0).suspend;
      }
    });
  }
  
  courseSectionMenu($event){    
    let heartElement: HTMLElement = $event.currentTarget;
    $(heartElement).toggleClass('active');
    $('.clusterMenu').toggleClass('show');
  }
  
  
  universityData($event) {
    let heartElement: HTMLElement = $event.currentTarget;
    let currText = $(heartElement).text();
    let dreamInstituteHeight = $('.dream-institute').height();
    console.log(currText);
    $('.mobile-select-grop').removeClass('active');
    $('.clusterMenu').removeClass('show')
    $('.mobile-select-grop span').html(currText);
    $('html, body').animate({
      scrollTop: $('.tab-content .tab-pane').offset().top+dreamInstituteHeight+200
    },1000);
 }

 
 changeUI(event) {
  this.stickyPosition = event;
}

stopScroll(event) {
  this.removeSticky = event;
  let dreamInstituteVideoHeight=$('#dreamInstituteVideo').height;
  this.stopScrollTop = this.pageFooter.nativeElement.offsetTop - (this.scrollContainer.nativeElement.scrollHeight+1000);
  console.log(this.stopScrollTop);
}

searchCollege(slug){
  //alert(slug);
  $(".tab-pane").removeClass('active');
  let dreamInstituteHeight = $('.dream-institute').height();
  $('.tab-pane').removeClass('active');
  if(slug == 'all'){
    $(".head_college").addClass('d-none'); 
    $(".tab-pane").addClass('active');
  }else{
    $('#'+slug).addClass('active');
  }
  $('html, body').animate({
    scrollTop: $('.tab-content .tab-pane').offset().top+dreamInstituteHeight+150
  },1000);
}

  getUserInfo() {
    this.headerService.userInfoLsObservable().subscribe(user => {
      if (typeof user != undefined && typeof user != 'string') {
        this.signedUp = true;
        this.loggedIn = user.is_eligible_for_dashboard;
      }
    });
  }

}
