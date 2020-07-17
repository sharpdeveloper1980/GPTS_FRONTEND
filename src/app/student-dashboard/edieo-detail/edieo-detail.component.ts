import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HeaderService } from '../../shared/services/header.service';
import { ApiService } from '../../core/api.service';
import { Router, ActivatedRoute } from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-edieo-detail',
  templateUrl: './edieo-detail.component.html',
  styleUrls: ['./edieo-detail.component.scss']
})
export class EdieoDetailComponent implements OnInit {
  public data;
  config: any;
  leadership:  Array<any> = [];
  team: Array<any> = [];
  ebanner: any;
  bvideo : any;
  btittle : string;
  bdescp : string;
  bid : any;
  bthumb : string;
  bdate : any;
  tabone : string;
  tabtwo : string;
  tabthree:string;
  tabfour:string;
  tababout:string;
  resultOne:Array<any> = [];
  resultTwo:Array<any> = [];
  registeredCheck: boolean = false;
  loggedIn: boolean = false;
  userid : any;
  clusters:Array<any> = [];
    btype : string;
    careerId: String;
    careerName: String;
    careerNameSneak:string;
    careerBanner: String;
    careerAbout: String;
    careerIcon: String;
    careerVideo: Array<any> = [];
    careeVidConfig: any;
    showVideo: boolean = true;
    careerExam: Array<any> = [];
    careerPro: String;
    careerCon: String;
    salary: String;
    careerLadder: Array<any> = [];
    competencies: Array<any>;
    relatedCareer: Array<any>;
    futureProspect: String;
    areaCovered: Array<any>;
    careerJobs: Array<any>;
    psychology: String;
    courseSlug:any;
    id:number;
    slug:any;
    allcareer:any;
    discoverCollege: Array<any> = [];
    expVideo: Array<any>;
    doYouKnow: Array<any> = [];
    bannerTitle: String;
    expVidThumb: string;
    subCareerListAll: Array<any> = [];
    subCareerList: Array<any> = [];
    expVideoDes: String;
    expVideoName: String;
    expThumb: string;
    contentLoaded: boolean = false;
    show:number=6;
    aboutLength: number = 500;
    careerVideoSneak:Array<any>=[];
    careerBannerSneak:string;
  careerAboutSneak:string;
  pslug:any;
  slug2:any;


  constructor(public headerService: HeaderService, public apiService:ApiService, public route: Router, public activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    document.body.classList.add("about-body");

    setTimeout(()=>{
      this.headerService.loaderFunction(false);
    }, 2000);

    this.getUserInfo();
    this.getSingleEdieo(this.activatedRoute.snapshot.paramMap.get("id"), '');
    this.getRequiredEdieo(this.activatedRoute.snapshot.paramMap.get("type"), this.activatedRoute.snapshot.paramMap.get("id"));
    this.getData();
  } 

  getSingleEdieo(id, type) {
    this.apiService.getSingleEdieo({'id':id, 'type':type}).subscribe(val=>{
      this.data = val.data;
        this.bthumb = val.data[0].video_thumb;
        this.bvideo = val.data[0].video;
        this.btittle = val.data[0].title;
        this.bid = val.data[0].id;
        this.slug = val.data[0].slug;  
        this.pslug = val.data[0].pslug; 
        if(type == 'cluster'){this.btype = 'cluster'; }else{this.btype = val.data[0].type; }
        this.bdescp = val.data[0].descp;
        this.bdate = val.data[0].created_at;
        if(type){
          window.scrollTo({
            top: 10,
            behavior: 'smooth'
          });
        }

         // this.courseSlug = this.activatedRoute.snapshot.paramMap.get('id');
         let data = {
          "id":this.bid,
          'slug': this.slug
        }

        console.log(data);
            this.apiService.getSubCourse(data).subscribe(val => {
              val = val.data;
              this.careerBanner = val.career_banner;
              this.careerAbout = val.about;
              this.careerName = val.name;
              this.careerVideo = val.career_video;
              this.careerExam = val.career_entrance_exam;
              this.careerCon = val.cons;
              this.careerPro = val.pros;
              this.salary = val.salary;
              this.careerLadder = val.career_ladder;
              this.competencies = val.competencies;
              this.relatedCareer = val.related_career;
              this.futureProspect = val.future_prospect;
              this.areaCovered = val.area_cover;
              this.careerJobs = val.career_jobs;
              this.psychology = val.key_psychology;
              this.showVideo = true;  
            });

            //sneak in information section
let dataSneak = {
  'user_id': id,
  'slug': this.pslug
}
this.apiService.getCourseInfo(dataSneak).subscribe(val => {
  val = val.data;
  this.slug2= val.slug;
  this.careerAboutSneak = val.about;
  this.careerBannerSneak = val.career_banner; 
  this.expVideo = val.exp_video;
  this.expVidThumb = val.exp_video_thumb
  this.doYouKnow = val.do_you_know;
  this.careerIcon = val.career_icon;
  this.careerVideoSneak = val.career_video;
  this.subCareerListAll = val.sub_career_list;
  //if (this.subCareerListAll.length > 8) {
   // this.subCareerList = this.subCareerListAll.slice(0, 8);
 // } else {
    this.subCareerList = this.subCareerListAll;
  //}
  this.careerNameSneak = val.name;
  this.bannerTitle = val.banner_title;
  this.showVideo = true;
  this.expVideoDes = val.exp_video_designation;
  this.expVideoName = val.exp_video_name;
  this.expThumb = val.exp_video_thumb;
  this.contentLoaded = true
console.log(val);
});

        
    })
  }


  getRequiredEdieo(type, id) {
    if(type == 'career'){
      this.tababout = "About";
      this.tabone = 'Related Careers';
      this.tabtwo = 'Master Stories';
      this.tabthree = "Sneak-In";
      this.tabfour = "Colleges";
    }else if(type == 'mustknow'){
      this.tabone = 'Related Videos';
    }
    else if(type == 'college'){
      this.tabone = 'Related College';
      this.tabtwo = 'Similar Careers';
    }else{
      this.tabone = 'View Other Countries';
      this.tabtwo = '';
    }
   this.apiService.getRequiredEdieo({'type':type, 'id':id}).subscribe(val=>{
      this.resultOne = val.data['firsttab'];
      this.clusters = val.data['clusters'];
      this.resultTwo = val.data['secondtab'];
   })
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

  myFavEdieo(id, type) {
   this.apiService.myFavEdieo({'id':id, user_id:this.userid, type:type}).subscribe(val=>{ 
      alert(val.msg);
    })
 }

  ngOnDestroy() {
    document.body.classList.remove("about-body");
  }
  ngAfterViewInit() {
    this.jqueryFunctions();
    // this.getUserProfileData(this.userDetails);
  }

  jqueryFunctions() {

  }


  checkLoggedIn($event,idStatic) {
    if (!this.loggedIn) {
      $event.preventDefault();
      $event.stopPropagation();
      let vid = $event.currentTarget.querySelector('video');
      vid.pause();
      vid.src = vid.src;
      this.openSignupModal();
    } else {
      $.each($("video"), function () {
        if ($(this).get(0).id === idStatic) {
          return;
        } else {
          $(this).get(0).pause();
          $(this).get(0).suspend;
        }
      });
    }
  }
  playCondition(idStatic){
    $.each($("video"), function () {
      if ($(this).get(0).id === idStatic) {
        return;
      } else {
        $(this).get(0).pause();
        $(this).get(0).suspend;
      }
    });
  }
  openSignupModal() {
    $("#signupModal").modal('show');
  }

//all colleges data
getData() {
  this.apiService.getdiscoverCollege().subscribe(val=>{
    this.discoverCollege = val.clusters;
  });
 
}

}