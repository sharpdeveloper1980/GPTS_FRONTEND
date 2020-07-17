import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { HeaderService } from '../../shared/services/header.service';
import { ApiService } from '../../core/api.service';

declare var $: any;
@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.scss']
})
export class BloglistComponent implements OnInit {
  blogsCarousel: Array<any> = [];
  blogListVar: boolean = false;
  popularBlogs: any;
  page = 1;
  pageSize: number = 18;
  contentLoaded: boolean = false;
  signedUp: boolean = false;
  loggedIn: boolean = false;
  arr1: Array<any> = [];
  arr2: Array<any> = [];
  arr3: Array<any> = [];
  poparr1: Array<any> = [];
  poparr2: Array<any> = [];
  poparr3: Array<any> = [];
  blogCount: number = 0;
  blogFor: number = 0;

  constructor(private headerService: HeaderService, private apiService: ApiService, private route: Router) { }

  ngOnInit() {
    document.body.classList.add("bloglist-body");
    this.getUserInfo();
    this.getBlogs(1);
    this.getPopularBlogs();
  }

  getBlogs(pg) {
    console.log(pg);
    this.page = pg;
    this.apiService.getAllBlogs(pg-1).subscribe(val => {
      this.blogsCarousel = val.data;
      this.blogCount = val.blogCount;
      this.blogFor = val.arr_bl;
      this.blogListVar = true;
      this.arr1 = val.arr1;
      this.arr2 = val.arr2;
      this.arr3 = val.arr3;
    });
  }

  getPopularBlogs() {
    this.apiService.getGetPopularBlog().subscribe(val => {
      this.popularBlogs = val.data;
      setTimeout(() => {
        this.headerService.loaderFunction(false);
      }, 1000);
      this.poparr1 = val.arr1;
      this.poparr2 = val.arr2;
      this.poparr3 = val.arr3;
    });
  }

  paginationClick(n) {
    this.headerService.loaderFunction(true);
    setTimeout(() => {
      this.headerService.loaderFunction(false);
    }, 1000);
  }

  getUserInfo() {
    this.headerService.userInfoLsObservable().subscribe(user => {
      if (typeof user != undefined && typeof user != 'string') {
        this.signedUp = true;
        this.loggedIn = user.is_eligible_for_dashboard;
      }
    });
  }

  openSignupModal() {
    if (this.signedUp) {
      this.route.navigate(['/user-signup']);
    } else {
      $("#signupModal").modal('show');
    }
  }


  ngOnDestroy() {
    document.body.classList.remove("bloglist-body");
  }
}
