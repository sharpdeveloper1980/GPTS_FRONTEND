import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.body.classList.add("comparison-body");
  }

  ngOnDestroy() {
    document.body.classList.remove("comparison-body");
  }

}
