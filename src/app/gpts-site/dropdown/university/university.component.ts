import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// Services
import { ApiService } from '../../../core/api.service';
import { SwiperDirective } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class UniversityComponent implements OnInit {
  @ViewChild('instituteName') instituteName: ElementRef;
  @ViewChild('wordsCarousel') wordsCarousel: SwiperDirective;
  aboutUnivCarousel: any = [
    { 'data': 'blah blah' },
    { 'data': 'blah blah1' },
    { 'data': 'blah blah2' },
    { 'data': 'blah blah3' },
    { 'data': 'blah blah4' },
  ];
  aboutUnivConfig: any;
  wordsConfig: any;
  recomCourseConfig: any;
  aboutUnivText: String;
  coverLogoImg: String;
  college_type: String;
  location: String;
  logo: String;
  average_package_offer: String;
  collegeName: String;
  facilityName: String;
  facilityImage: String;
  prominentCompanyName: String;
  prominentCompanyImage: String;
  whychooseData: Array<any>;
  whychooseTitle: String;
  whychooseDesc: String;
  satisfaction_report: Array<any>;
  alumniTestimonial: Array<any>;

  constructor(private apiService: ApiService) {
    this.reInitializeCarousel();
  }

  ngOnInit() {
    document.body.classList.add("universityBody");
    this.getUniversityDetails();
  }

  getUniversityDetails() {
    let data = { "slug": "delhi-collage-of-art" };
    this.apiService.getUniversityDetails(data).subscribe(val => {
      let collegeData = val.data;
      this.aboutUnivText = collegeData.basic_info.about;
      this.coverLogoImg = collegeData.basic_info.cover_logo;
      this.logo = collegeData.basic_info.logo;
      this.collegeName = collegeData.basic_info.name;
      this.college_type = collegeData.basic_info.college_type;
      this.facilityName = collegeData.facilities.fac_name;
      this.facilityImage = collegeData.facilities.icon;
      this.prominentCompanyName = collegeData.prominent.compy_name;
      this.prominentCompanyImage = collegeData.prominent.img;
      this.whychooseData = collegeData.whychoose;
      this.satisfaction_report = collegeData.satisfaction_report;
      this.alumniTestimonial = collegeData.alumini;
      this.reInitializeCarousel();
    });
  }

  changeUI(event) {
    if (event) {
      this.instituteName.nativeElement.classList.add('scrolled-over');
    } else {
      this.instituteName.nativeElement.classList.remove('scrolled-over');
    }
  }

  reInitializeCarousel() {
    this.aboutUnivConfig = {
      direction: 'horizontal',
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.swiper-button-next-about',
        prevEl: '.swiper-button-prev-about',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
    };

    this.wordsConfig = {
      direction: 'horizontal',
      slidesPerView: 1,
      navigation: 'false',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
    };

    this.recomCourseConfig = {
      direction: 'horizontal',
      slidesPerView: 'auto',
      spaceBetween: 30,
    };
  }


  ngOnDestroy() {
    document.body.classList.remove("universityBody");
  }

}
