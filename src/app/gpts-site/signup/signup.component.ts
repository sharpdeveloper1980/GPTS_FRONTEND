import { Component, OnInit, ViewChild} from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';

declare var $: any;
declare var jquery: any;
declare var AOS: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  gptsProduct:any;
  forgotPasswordShow: boolean = false;
  loggedIn: boolean = false;
  userName: any = "";

  constructor(private headerService: HeaderService,private apiService: ApiService,public route: Router) { }

  ngOnInit() {
    setTimeout(()=>{
      this.headerService.loaderFunction(false);
      AOS.init();
    }, 2000);

     //carousel function
   this.gptsProduct = {
    grabCursor: true,
    slidesPerView:4,
    direction: 'horizontal',
    speed: 500,
    spaceBetween: 10,
    centeredSlides:false,
    autoplay: {
      delay: 5000,
    },
   
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      1100: {
        slidesPerView: 3,
        spaceBetween: 20
      }
  }
}
this.getUserName();
  }
  
  openModal() {
    $("#exampleModal").modal('show');
    this.forgotPasswordShow = false;
  }

  openSignupModal() {
    $("#signupModal").modal('show');
  }
  getUserName() {
    this.headerService.usernameHeaderObservable().subscribe(name => {
      if (name.length) {
        this.userName = name;
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    })
  }

}
