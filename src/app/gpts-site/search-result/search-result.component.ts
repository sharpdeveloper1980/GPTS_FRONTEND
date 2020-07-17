import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  ratingCalculate: any;
  config: any;
  constructor() {
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
    this.ratingCalculate = (4.39 / 5) * 100;
    document.body.classList.add("search-body");
  }

  ngOnDestroy() {
    document.body.classList.remove("search-body");
  }

}
