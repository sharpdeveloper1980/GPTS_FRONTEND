import { Component, OnInit, AfterViewInit,HostListener,Inject  } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { DOCUMENT } from "@angular/platform-browser";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewInit {
  routeData:any;
  noFooter:boolean = true;
  windowScrolled: boolean;
  

  constructor(public router:Router, public activatedRoute: ActivatedRoute,@Inject(DOCUMENT) private document: Document) { }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (document.documentElement.scrollTop > 200) {
        this.windowScrolled = true;
        $('.scroll-to-top').fadeIn();
       
     
    } 
   else if (this.windowScrolled && window.pageYOffset < 10) {
        this.windowScrolled = false;
        $('.scroll-to-top').fadeOut();
        //$('.scroll-to-top').animate({  scrollTop: 0,  bottom:'150px', });
        
    }
}
scrollToTop() {
  (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
     // $('.scroll-to-top').animate({  scrollTop: 0,  bottom:'95%', })
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
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.routeData = data.url;
        console.log(this.routeData );
        let split = this.routeData.split("/");
        if(split[1]=='student-dashboard' || split[1] == 'college-dashboard' || split == "school-dashboard") {
         this.noFooter = true;
        } else {
          this.noFooter = false;
        }
      }
    });
  }
 

  ngAfterViewInit() {
    
  }
}