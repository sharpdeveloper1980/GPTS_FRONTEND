import { Component, OnInit } from '@angular/core';

import { HeaderService } from '../../shared/services/header.service';
@Component({
  selector: 'app-dalham',
  templateUrl: './dalham.component.html',
  styleUrls: ['./dalham.component.scss']
})
export class DalhamComponent implements OnInit {
  dalhamConfig: any;

  constructor(private headerService: HeaderService) { }

  ngOnInit() {
    document.body.classList.add("dalham-body");
    setTimeout(() => {
      this.headerService.loaderFunction(false);
    });
    this.dalhamConfig = {
      grabCursor: true,
      slidesPerView: 'auto',
      direction: 'horizontal',
      speed: 500,
      spaceBetween: 25,
      // Navigation arrows
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
    }
  }

  ngOnDestroy() {
    document.body.classList.remove("dalham-body");
  }

}
