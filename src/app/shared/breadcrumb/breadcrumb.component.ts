import { Component, OnInit } from '@angular/core';
import { BreadcrumService } from "../services/breadcrum.service";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  routeInfo: string;
  arrayOfRoutes: Array<any> = [];
  numberOfRoutes: number;

  constructor(private breadcrum: BreadcrumService) { }

  ngOnInit() {
    this.routeInfo = this.breadcrum.routeName;

    this.arrayOfRoutes = this.routeInfo.split("/");
    this.numberOfRoutes = this.arrayOfRoutes.length;
  }

  makeLink(val, index) {
    if (val == this.arrayOfRoutes[index + 1]) {
      return '/' + val;
    } else {
      return '/' + this.arrayOfRoutes[index + 1] + '/' + val;
    }
  }

  getName(val: string) {
    return val.replace("-", " ");
  }

}
