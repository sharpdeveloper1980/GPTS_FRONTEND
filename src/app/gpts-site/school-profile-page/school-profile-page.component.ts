import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-school-profile-page',
  templateUrl: './school-profile-page.component.html',
  styleUrls: ['./school-profile-page.component.scss']
})
export class SchoolProfilePageComponent implements OnInit {
  @ViewChild('instituteName') instituteName: ElementRef;
  circleSlideConfig: any;
  constructor() {
    this.circleSlideConfig = {
      dots: false
      , infinite: false
      , speed: 300
      , slidesToShow: 1
      , slidesToScroll: 1
      , responsive: [
        {
          breakpoint: 1024
          , settings: {
            slidesToShow: 3
            , slidesToScroll: 3
            , infinite: true
            , dots: true
          }
        }
        , {
          breakpoint: 600
          , settings: {
            slidesToShow: 2
            , slidesToScroll: 2
          }
        }
        , {
          breakpoint: 480
          , settings: {
            slidesToShow: 1
            , slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    };
   }

  ngOnInit() {
    document.body.classList.add("school-body");
  }

  ngOnDestroy() {
    document.body.classList.remove("school-body");
  }

  changeUI(event){
    if(event){
      this.instituteName.nativeElement.classList.add('scrolled-over');
    } else {
      this.instituteName.nativeElement.classList.remove('scrolled-over');
    }
  }
}
