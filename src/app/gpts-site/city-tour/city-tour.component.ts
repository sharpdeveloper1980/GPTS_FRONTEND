import { Component, OnInit, ViewChild} from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';

declare var $: any;
declare var jquery: any;
declare var AOS: any;
@Component({
  selector: 'app-city-tour',
  templateUrl: './city-tour.component.html',
  styleUrls: ['./city-tour.component.scss']
})
export class CityTourComponent implements OnInit {
  @ViewChild('cityReg') formValues; // Added this
  msg : '';
  error : '';
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
      }
    });
  }

  registration(){
    setTimeout(function(){
      $('html, body').animate({
         scrollTop: $('#cityTourRegistration').offset().top-60
      },'slow');
 },0);
}


}
