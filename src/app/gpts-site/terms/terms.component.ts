import { Component, OnInit } from '@angular/core';

import { HeaderService } from '../../shared/services/header.service';
@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor(private headerService: HeaderService) { }

  ngOnInit() {
    setTimeout(() => {
      this.headerService.loaderFunction(false);
    });
  }

  scrollTo(el) {
    let elTop = el.offsetTop + 250;
    window.scrollTo({
      top: elTop,
      behavior: 'smooth'
    });
  }

}
