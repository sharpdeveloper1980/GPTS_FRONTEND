import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.body.classList.add("pricing-body");
  }

  ngOnDestroy() {
    document.body.classList.remove("pricing-body");
  }

}
