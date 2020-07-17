import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

declare var $: any;
declare var jquery: any;
declare var AOS: any;

@Component({
  selector: 'app-our-solution',
  templateUrl: './our-solution.component.html',
  styleUrls: ['./our-solution.component.scss']
})
export class OurSolutionComponent implements OnInit {
  certifiedSchool: any;
  seriesName: Array<any> = [];
  @ViewChild('content') content: ElementRef;
  videoSrc: SafeUrl = '';
  videoName: string = '';
  show: number = 3;

  constructor(public apiService: ApiService, private modal: NgbModal, public headerService: HeaderService, public router: Router,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.headerService.loaderFunction(false);
    this.getCertifiedSchool();
  }


  getCertifiedSchool() {
    this.apiService.getCertifiedSchool().subscribe(val => {
      let data = val.data;
      let dataArray: Array<any> = data.Daycare.concat(data.Residential);
      dataArray = dataArray.concat(data.ResidentialDaycare);
      data.All = dataArray;
      data.Residential = data.Residential.concat(data.ResidentialDaycare);
      data.Daycare = data.Daycare.concat(data.ResidentialDaycare);
      delete data['ResidentialDaycare'];
      this.certifiedSchool = data;
      
    });

    this.apiService.featuredInst().subscribe(val => {
      let video = val.data;
      this.seriesName = video;
      
    })
  }
  showContent($event,id){
    let kpiElement: HTMLElement = $event.currentTarget;
    $('.s-row').removeClass('active');
    $(kpiElement).addClass('active');
    $(kpiElement).parents('.solutionScrollContent').removeClass('show');
    setTimeout(function(){
      $('#solutionScrollContent'+id).addClass('show');
    },0);
    
  }
  hoverClass($event){
    let kpiElement: HTMLElement = $event.currentTarget;
    $('.s-row').removeClass('active');
    $(kpiElement).addClass('active');
  }
  closeBox(id){
    setTimeout(function(){
      $('#solutionScrollContent'+id).removeClass('show');
      $('.s-row').removeClass('active');
    },0);
  }



  openVideoModal(videoLink: string, videoName: string) {
    this.modal.open(this.content);
    let url = videoLink.split("v=")[1].substring(0, 11);
    url = "https://www.youtube.com/embed/" + url;
    this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.videoName = videoName;
  }
}
