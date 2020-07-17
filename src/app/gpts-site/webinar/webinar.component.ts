import { Component, OnInit, ViewChild} from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';

declare var $: any;
declare var jquery: any;
declare var AOS: any;
@Component({
  selector: 'app-webinar',
  templateUrl: './webinar.component.html',
  styleUrls: ['./webinar.component.scss']
})
export class WebinarComponent implements OnInit {

  webinarName:number;
  webinarId:number;
  preWebinar:any;

  @ViewChild('cityReg,webinarRegistration') formValues; // Added this
  @ViewChild('webEmail') formValues2;
  
  msg : '';
  error : '';
msgEmail:'';
errorEmail:'';
  msgNew : '';
  errorNew :'';
  loading:boolean=false;

  constructor(private apiService: ApiService, private headerService: HeaderService, public route: Router,config: NgbCarouselConfig) {
    config.interval = 2500;
    config.wrap = true;
    config.keyboard = false;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
    config.pauseOnHover = true;
    
  }

  ngOnInit() {

    setTimeout(()=>{
      this.headerService.loaderFunction(false);
      AOS.init();
    }, 2000);

    //carousel function
    this.preWebinar = {
      grabCursor: true,
      slidesPerView:4,
      direction: 'horizontal',
      speed: 500,
      spaceBetween: 40,
      autoplay:true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        },
        breakpoints: {
          480:{
            slidesPerView: 1,
          },
          767: {
            slidesPerView: 2,
          
          },
          992: {
            slidesPerView: 2,
          
          },

          1100: {
            slidesPerView: 3,
          
          },
         
        },
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    }
  }
  topRegistration(){
    setTimeout(function(){
      $('html, body').animate({
         scrollTop: $('#scheduled').offset().top
      },'slow');
 },0);
  
}
  cityTourRegistration(data) {
    $("#ctregbtn").attr("disabled", true);
    $("#ctregbtn").val("Registering...");

    this.apiService.cityTourRegistration({"city" : data.city, "noofguest" : data.noofguest,"contact" : data.contact,"school" : data.school,"name" : data.name, "email" : data.email}).subscribe(val => {

      $("#ctregbtn").attr("disabled", false);
      $("#ctregbtn").val("Register Now");

      this.error = val.error;
      if(!this.error){
        this.msg = val.msg;
        this.formValues.resetForm();
        
        setTimeout(function(){
          $('html, body').animate({
             scrollTop: $('#contactForm').offset().top-60
          },'slow');
     },0);
      }
    });
  }
  webinarReg(data,id){
    this.loading=true;
    this.apiService.webinarRegistration({
      "registered":id,
      'email_id':data.email,
      'full_name':data.fName,
      'school':data.sName,
      'phone':data.phone,
      'class':data.class,
      'type':data.status,
      'webinar_id':this.webinarId

    }).subscribe(val=>{ 
         
      this.errorNew = val.error;
      if(!this.errorNew){  
        $('.alert.alert-success').show();
        this.msgNew = val.msg;
        this.formValues.resetForm();
        this.loading=false;
        setTimeout(function(){
          $('html, body').animate({
             scrollTop: $('#registerForm').offset().top-100
          },'slow');
     },0);
     } else{
      this.loading=false;
      $('.alert.alert-success').hide();
      setTimeout(function(){
        $('html, body').animate({
           scrollTop: $('#registerForm').offset().top-100
        },'slow');
   },0);
     }
    })
  }

  webinarEmailReg(data,id){  
    this.loading=true;
    this.apiService.webinarRegistration({
      "registered":id,
      'email_id':data.email,
      'webinar_id':this.webinarId

    }).subscribe(val=>{
      
      this.errorEmail = val.error;
      if(!this.errorEmail){    
        $('.alert.alert-success').show();   
        this.msgEmail = val.msg;
        this.formValues2.resetForm(); 
        this.loading=false;
        
      }else{
        this.loading=false;
        $('.alert.alert-success').hide();
        
      }
    })
  }

  // webinarEmailReg(data){

  // }
  registration(webinar,id){
     setTimeout(function(){
      $('html, body').animate({
         scrollTop: $('#contactForm').offset().top-0
      },'slow');
 },0);
 this.webinarName= webinar;
 this.webinarId=id;
 console.log('webinar name and id', this.webinarName+' '+this.webinarId);
 $('.alert.alert-success').hide();
}

showSpeaker($event,id){
  let heartElement: HTMLElement = $event.currentTarget;
  $('.clickable').removeClass('active');
  $(heartElement).addClass('active');
  $('.speakers').hide();
  $('#speaker'+id).show();
  setTimeout(function(){
    $('html, body').animate({
       scrollTop: $('#speaker'+id).offset().top-120
    },'slow');
},0);
}
showForm(id){
  $('.form-show').hide()
   $('#'+id).show();
}

}
