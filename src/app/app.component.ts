import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
// import * as $ from 'jquery';
declare var jquery: any;
declare var $: any;
import { HeaderService } from './shared/services/header.service';
import { ApiService } from './core/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('headerSidebar', [
      state('true',
        style({ opacity: 1, width: '400px' }),
      ),
      transition('false => true', [
        animate('.6s ease-in', keyframes([
          style({ opacity: 1, width: '400px' }),
        ])),
      ]),
      transition('true => false', [
        animate('.6s ease-in', keyframes([
          style({ opacity: 1, width: '0px' }),
        ])),
      ])
    ])
  ]
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'gpts';
  viewMenu: boolean = false;
  loggedIn: boolean = false;
  useLoader: boolean = true;

  constructor(public headerService: HeaderService, public apiService: ApiService, public router: Router) {

  }
  ngOnInit() {
    this.logout();
    this.headerService.loaderFunction(true);
    this.headerService.toggleSideMenuObservable().subscribe(val => {
      this.viewMenu = val;
    });
    let userInfo: any = localStorage.getItem('userGpts');
    if (userInfo != null) {
      userInfo = JSON.parse(userInfo);
      this.headerService.userInfoLs(userInfo);
      this.headerService.userNameHeader(userInfo.display_name);
      this.headerService.userRegistered(userInfo.is_eligible_for_dashboard);
    }
    this.headerService.userSignupObservable().subscribe(val => {
      if (val) {
        this.loggedIn = true;
      }
    });
  }

  logout() {
    this.headerService.logOutObservable().subscribe(val => {
      if (val) {
        this.loggedIn = false;
      }
    });
    this.headerService.loaderObservable().subscribe(val => {
      this.useLoader = val;
    });
  }

  ngAfterViewInit() {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.headerService.loaderFunction(true);
      }
      if (event instanceof NavigationEnd) {
        let url = event.url.split('/');
        if (url[1] === 'student-dashboard') {
          return
        } else {
          // setTimeout(() => {
          //   this.headerService.loaderFunction(true);
          // }, 500);

          // Code for saving previously videos where ever they are
          setTimeout(() => {
            let vgPlayerList = document.querySelectorAll('vg-player');
            for (let index = 0; index < vgPlayerList.length; index++) {
              const element = vgPlayerList[index];
              element.addEventListener('click', (event) => {
                let userInfo: any = JSON.parse(localStorage.getItem('userGpts'));
                if (userInfo != null) {
                  let videoId = (<HTMLElement>event.currentTarget).id;

                  let data = {
                    "user_id": userInfo.user_id,
                    "video_id": videoId
                  };
                  this.apiService.savePrevVideo(data);
                }
              });
            }

          }, 2000);
        }
        window.scrollTo(0, 0);
      }

    });
  }
  // show hide menu

}
