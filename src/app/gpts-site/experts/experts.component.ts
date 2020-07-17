import { Component, OnInit,AfterViewInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from '../../shared/services/header.service';
import { ApiService } from '../../core/api.service';
import { Router } from '@angular/router';

declare var $: any;
declare var jquery: any;
declare var AOS: any;

@Component({
  selector: 'app-experts',
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.scss']
})
export class ExpertsComponent implements OnInit,AfterViewInit {
// slick data 
careeerConfig: any;
listCareer: Array<any> = [];
registeredCheck: boolean = false;
clusterSlug:any;
getCareerInfo : Array<any> = [];
getInterviewVideo:Array<any>=[];
sub_career_slug:string;
careerVideo: Array<any> = [];
interviewList:Array<any>=[];
data:any;
userId: any = 0;
selectedAccount :string;
videoUrl:string;
videoThumb:string;
userid : any;
idValue:number;
loggedIn: boolean = false;
aboutLength: number = 100;

  constructor(private headerService: HeaderService, private apiService:ApiService,config: NgbCarouselConfig,public router: Router) { }

  ngOnInit() {
    setTimeout(()=>{
      this.headerService.loaderFunction(false);
      AOS.init();
    }, 2000);
    this.getUserInfo();
   // this.userId = JSON.parse(localStorage.getItem('userGpts')).user_id;

//carousel slider code start
    this.careeerConfig = {
      grabCursor: false,
      direction: 'horizontal',
      speed: 500,
      spaceBetween: 30,
      infinite: false,
      pagination: false,
    a11y: false,   
    loop: false,
    autoplay: 5000,
    slidesPerView: 1,
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    navigation: false,
    breakpoints: {
      // when window width is <= 1920px
      1920:{
        slidesPerView: 1,
      } }
    
    }
    //carousel slider code end    
    this.getClusterInterview();
  }
  ngAfterViewInit(){
   
  }
    
 

  getClusterInterview(){
    this.apiService.getCareerList().subscribe(val => {
      this.listCareer = val.data;
      //this.selectedAccount=this.listCareer[4].name;
      this.selectedAccount='All';
      console.log('list interviewList',this.listCareer);
     this.apiService.getInterviewListAll().subscribe(val=>{
      this.interviewList = val.data;       
  })
     
     });
  }
  destinyVideo(){
    $("#distinyVideoPopup").modal('show');
  }
  clusterInterviewVideo(id){
    this.apiService.getInterviewList(id).subscribe(val=>{
        this.interviewList = val.data;
    })
    
     }

     expertVideoPopup(id){
       this.idValue=id;     
       
     // alert(id);
      if ((!this.loggedIn && id==0)|| (!this.loggedIn && id==1)) {
        setTimeout(function(){
          $("#expertVideoPopup").modal('show');
        },1000);
      
      } else if(this.loggedIn){
        setTimeout(function(){
          $("#expertVideoPopup").modal('show');
        },1000);
      }else {
        this.openSignupModal();
      }

      // this.apiService.clusterDetail(tte_career_id).subscribe(val => {
        
      //   this.clusterdetail = val.cluster;
      //   this.collegelist = val.collegelist;      
        
      //   //console.log(val.cluster[0].college_no);
      // });
    }
    openSignupModal() {
      $("#signupModal").modal('show');
    }


  
  
  removeBootstrapModal(id) {
    $("#expertVideoPopup").modal('hide');  
    $("#distinyVideoPopup").modal('hide');  
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
        this.userid = user.user_id;
        this.registeredCheck = true;
        this.loggedIn = user.is_eligible_for_dashboard;
      }
    })
  }



}
