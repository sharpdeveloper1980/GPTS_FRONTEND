import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { HeaderService } from '../../shared/services/header.service';
import { ApiService } from '../../core/api.service';

declare var $: any;

@Component({
  selector: 'app-discover-colleges',
  templateUrl: './discover-colleges.component.html',
  styleUrls: ['./discover-colleges.component.scss']
})
export class DiscoverCollegesComponent implements OnInit {
  random: Array<any> = [];
  clusters: Array<any> = [];
  clusterdetail:Array<any>=[];
  collegelist:Array<any>=[];
  browseListConfig: any;
  
  constructor(private headerService: HeaderService,private apiService:ApiService) { }

  ngOnInit() {
    this.getData();

    this.browseListConfig = {
      grabCursor: true,
      slidesPerView: 'auto',
      direction: 'horizontal',
      speed: 500,
      spaceBetween: 25,
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next-browse',
        prevEl: '.swiper-button-prev-browse',
      }
    }
  }

  getData() {
    this.apiService.getdiscoverCollege().subscribe(val=>{
      this.random = val.random;
      this.clusters = val.clusters;
    });
    
    setTimeout(()=>{
      this.headerService.loaderFunction(false);
    }, 2000);
  }

  scrollToDiv(event,tte_career_id){
    
    $("#scroll_div").show();
    $('html, body').animate({
      scrollTop: $('#scroll_div').offset().top-130
    },1000);
    
    this.apiService.clusterDetail(tte_career_id).subscribe(val => {
      
      this.clusterdetail = val.cluster;
      this.collegelist = val.collegelist;      
      
      //console.log(val.cluster[0].college_no);
    });
  }

  stopAllVid(idStatic) {
   // alert(idStatic)
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
