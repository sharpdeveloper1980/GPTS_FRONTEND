import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { HeaderService } from '../../shared/services/header.service';
import { ApiService } from '../../core/api.service';

declare var $: any;
@Component({
  selector: 'app-bloginternal',
  templateUrl: './bloginternal.component.html',
  styleUrls: ['./bloginternal.component.scss']
})
export class BloginternalComponent implements OnInit, AfterViewInit {
  blogSlug: string;
  blogData: any;
  blogVar: boolean = false;
  popularList: Array<any> = [];
  signedUp:boolean = false;
  loggedIn: boolean = false;

  constructor(private headerService: HeaderService, private route: Router, private activatedRoute: ActivatedRoute,
    private apiService: ApiService) { }

  ngOnInit() {
    document.body.classList.add("bloginternal-body");
  }

  ngAfterViewInit() {
    this.activatedRoute.params.subscribe(val => {
      this.getBlog();
    });
  }

  getBlog() {
    this.blogSlug = this.activatedRoute.snapshot.paramMap.get('blogName');
    let data = {
      'slug': this.blogSlug
    }
    this.apiService.getSingleBlog(data).subscribe(val => {
      this.blogData = val.singlepost;
      this.blogVar = true;
      console.log(this.blogData);
    });

    this.apiService.getGetPopularBlog().subscribe(val => {
      this.popularList = val.data;
      setTimeout(() => {
        this.headerService.loaderFunction(false);
      });
    })
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
    document.body.classList.remove("bloginternal-body");
  }

}
