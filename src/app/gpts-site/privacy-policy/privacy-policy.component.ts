import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../shared/services/header.service';
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

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
