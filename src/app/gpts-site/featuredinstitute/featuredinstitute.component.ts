import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HeaderService } from '../../shared/services/header.service';
import { ApiService } from '../../core/api.service';
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';



import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-featuredinstitute',
  templateUrl: './featuredinstitute.component.html',
  styleUrls: ['./featuredinstitute.component.scss']
})
export class FeaturedinstituteComponent implements OnInit {
  featuredConfig: any;
  seriesName: Array<any> = [];
  sc: SwiperComponent;
  show: number = 8;
  videoSrc: SafeUrl = '';
  videoName: string = '';
  firstparam = this.activatedRoute.snapshot.queryParamMap.get('tabparam');
  container: HTMLElement;

  @ViewChild('content') content: ElementRef;

  constructor(public headerService: HeaderService, private apiService: ApiService, private route: Router, private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef, private modal: NgbModal, private sanitizer: DomSanitizer) { }

  ngOnInit() {

    //alert(this.firstparam);
    //this.checkparam = this.activatedRoute.snapshot.paramMap.get('tab');
    //this.checkparam =  this.activatedRoute.snapshot.queryParamMap.get('tab');
  
    this.featuredConfig = {
      grabCursor: true,
      slidesPerView: 'auto',
      direction: 'horizontal',
      speed: 500,
      spaceBetween: 25,

    }
    setTimeout(() => {

      this.headerService.loaderFunction(false);
      if(this.firstparam == 'great-indian-schools'){
            $('html, body').animate({ scrollTop: $('#tabrow0').offset().top-100 },'slow');
      }else if(this.firstparam == 'great-indian-institutes'){
            $('html, body').animate({ scrollTop: $('#tabrow1').offset().top-100 },'slow');
      }else if(this.firstparam == 'education-evangelist-of-india'){
            $('html, body').animate({ scrollTop: $('#tabrow2').offset().top-100 },'slow');
      }else if(this.firstparam == 'tab-2'){
        $('html, body').animate({ scrollTop: $('#tab-2').offset().top-100 },'slow');
      }
      
    }, 2000);

    document.body.classList.add("featuredInsti-body");
    this.getFeaturedVideo();
    // $('html, body').animate({
    //   scrollTop: $('#tabrow1').offset().top-100
    // },'slow');
      
  }

  loadMore() {

  }

  getFeaturedVideo() {
    this.apiService.featuredInst().subscribe(val => {
      let video = val.data;
      this.seriesName = video;
    })
  }

  openVideoModal(videoLink: string, videoName: string) {
    this.modal.open(this.content);
    let url = videoLink.split("v=")[1].substring(0, 11);
    url = "https://www.youtube.com/embed/" + url;
    this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.videoName = videoName;
  }

  ngOnDestroy() {
    document.body.classList.remove("featuredInsti-body");
  }

}
