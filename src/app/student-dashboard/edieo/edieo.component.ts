import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderService } from '../../shared/services/header.service';
import { ApiService } from '../../core/api.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-edieo',
  templateUrl: './edieo.component.html',
  styleUrls: ['./edieo.component.scss']
})
export class EdieoComponent implements OnInit {
  career:Array<any> = [];
  college:Array<any> = [];
  country:Array<any> = [];
  mustknow:Array<any> = [];
  ebanner: any;
  bvideo : any;
  btittle : string;
  bdescp : string;
  btype : string;
  bid : any;
  show: number = 12;
  institutionList:Array<any>;
  universityList:Array<any>=[];
  universityListVideo:Array<any>;
  clusters: Array<any> = [];
  clusterdetail:Array<any>=[];
  firstClusterName:string;
  universityVideoThumb:string;
  universityVideoVideo:string;

  constructor(public headerService: HeaderService, public apiService: ApiService, public router: Router) { 
    //this.headerService.loaderFunction(true);
  }
  videoArray: Array<any>;
  ngOnInit() {
    // Loader
    setTimeout(()=>{
      this.headerService.loaderFunction(false);
      this.getEdieoBanner();
      this.getEdieo();
      this.getData();
    }, 3000);
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
//edieo
getEdieo() {
  this.apiService.getEdieo().subscribe(val=>{
    this.career = val.data['career'];
    this.college = val.data['college'];
    this.mustknow = val.data['mustknow'];
    this.country = val.data['country'];
  })
  setTimeout(() => {
    this.headerService.loaderFunction(false);
  }, 500);
}
  ngAfterViewInit() {
    this.jqueryFunctions();
    // this.getUserProfileData(this.userDetails);
  }

  jqueryFunctions() {

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

}


