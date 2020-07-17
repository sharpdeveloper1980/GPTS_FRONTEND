import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

//homepage data
import { productsCarousel } from './home-carousel-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  config: any;
  testimonialCarousel: any;
  productsCarousel: any;
  careerCarousel:any;
  @ViewChild('homePageSecondSec') homePageSecondSec: ElementRef;

  constructor() {
    this.config = {
      direction: 'horizontal',
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.swiper-button-next-products',
        prevEl: '.swiper-button-prev-products',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
    };

    this.testimonialCarousel = {
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 1,
      direction: 'horizontal',
      pagination: 'true',
      // loop: 'false',
      speed: 500,
      initialSlide: 2, // put the middle number of total slides
      loop: 'true',
      spaceBetween: 15,
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    }

    this.careerCarousel = {
      // Optional parameters
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      direction: 'horizontal',
      loop: 'true',
      speed: 500,
      // Navigation arrows
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      coverflowEffect: {
          rotate: 0,
          stretch: 10,
          depth: 1180,
          modifier: 1,
          slideShadows: false,
      },

      // autoplay:{
      //   delay: 3000,
      //   disableOnInteraction:true
      // }
    }
  }

  ngOnInit() {
    document.body.classList.add("hometwo-body");
    this.productsCarousel = productsCarousel;
  }

  scrollDown(el: HTMLElement){
    el.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnDestroy() {
    document.body.classList.remove("hometwo-body");
  }

}