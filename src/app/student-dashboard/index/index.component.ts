import { DOCUMENT } from "@angular/platform-browser";

import { Component, OnInit, AfterViewInit, OnDestroy,Renderer2,Inject,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';

declare var $: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit, OnDestroy {
  sidebarToggle: boolean = true;
  
  windowScrolled: boolean;


  
  constructor(
    
    public router: Router, public apiService: ApiService, public headerService: HeaderService,private renderer: Renderer2,@Inject(DOCUMENT) private document: Document) {
    let user = JSON.parse(localStorage.getItem('userGpts'));
    if (user == null) {
      this.router.navigate(['/', 'home']);
      return;
    } else if (user.usertype != 1) {
      this.router.navigate(['/', 'home']);
      return;
    }
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (document.documentElement.scrollTop > 200) {
        this.windowScrolled = true;
        $('.scroll-to-top').fadeIn();
       
     
    } 
   else if (this.windowScrolled && window.pageYOffset < 10) {
        this.windowScrolled = false;
        $('.scroll-to-top').fadeOut();
  // $('.scroll-to-top').animate({  scrollTop: 0,  bottom:'95px', });
        
    }
}
scrollToTop() {
  (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    //  $('.scroll-to-top').animate({  scrollTop: 0,  bottom:'95%', })
      if (currentScroll > 200) {
          //window.requestAnimationFrame(smoothscroll);
         // window.scrollTo(0, currentScroll - (currentScroll / 8));
          $('body,html').animate({
            scrollTop: 0
          });
      }
      return false;
  })();
}


  ngOnInit() {
    this.renderer.addClass(this.document.body, 'studentDashboard-body');
  }

  ngAfterViewInit() {
   $('app-footer').css('display', 'none');
}
  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'studentDashboard-body');
    $('app-footer').css('display', 'block');
  }

}
