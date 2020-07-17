import { Component, OnInit } from '@angular/core';

import { HeaderService } from '../../shared/services/header.service';
import { ApiService } from '../../core/api.service';

declare var $: any;
declare var jquery: any;
declare var AOS: any;
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  config: any;
  leadership:  Array<any> = [];
  team: Array<any> = [];
  gptsProduct:any;
  blogsCarousel: Array<any> = [];

  constructor(private headerService: HeaderService, private apiService:ApiService) { 
    this.config = {
      direction: 'horizontal',
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    };
    
    
  }

  ngOnInit() {
    AOS.init();
    document.body.classList.add("about-body");
    this.getOurTeam();
     //carousel function
     this.gptsProduct = {
      grabCursor: true,
      slidesPerView:3,
      direction: 'horizontal',
      speed: 500,
      spaceBetween: 30,
      centeredSlides:true,
      initialSlide:1,
      loop:true,
      //autoplay: {
      //  delay: 5000,
      //},
     
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 1,
          spaceBetween: 30
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 3,
          spaceBetween: 40
        }
    }
  }

  this.getBlogs();
}
teamVideoPopup(){  
  setTimeout(function(){
    $("#teamVideoPopup").modal('show');
  },1000);
}
removeBootstrapModal(id) {
  $("#teamVideoPopup").modal('hide');    
  $.each($("video"), function () {
    if ($(this).get(0).id === id) {
    } else {
     $(this).get(0).pause();
      $(this).get(0).suspend;
    }
  });
}

  getOurTeam() {
    this.apiService.getOurTeam().subscribe(val=>{
        this.team = val.data.team;
        this.leadership = val.data.leadership;
    })
    setTimeout(()=>{
      this.headerService.loaderFunction(false);
    }, 2000);
  }

  ngOnDestroy() {
    document.body.classList.remove("about-body");
  }

  getBlogs() {
    this.apiService.getLatestBlogs().subscribe(val => {
      this.blogsCarousel = val.data;
    });
  }
 

}
