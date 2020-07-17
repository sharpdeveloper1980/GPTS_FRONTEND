import { Component, OnInit, AfterViewInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Options } from 'ng5-slider';

// Services
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, AfterViewInit {

  minValue: number;
  maxValue: number;
  options: Options;
  value1: number;
  options1: Options;
  userTypeList: Array<any>;
  studentList: any;
  studentModalInfo: Array<any> = [];


  constructor(private modalService: NgbModal, private apiService: ApiService) {
    
  }

  ngOnInit() {
    setTimeout(()=>{
      this.minValue = 0;
      this.maxValue = 0;
      this.options = {
        floor: 0,
        ceil: 100,
        step: 1,
      };
  
      this.value1 = 10;
      this.options1 = {
        ceil: 100,
        showSelectionBar: true,
      };
    },10);
    this.userTypeList = [
      { 'id': 1, 'name': 'Student' },
      { 'id': 2, 'name': 'Institute' },
      { 'id': 3, 'name': 'School' }]

      document.body.classList.add("search-result-body");

      this.apiService.getStudentList().subscribe(val=>{
        let studentList = val.data;
        this.studentList = studentList;

      })

  }

  ngOnDestroy() {
    document.body.classList.remove("search-result-body");
  }

  ngAfterViewInit() {
    
    
  }

  openStudentModal(content, index) {
    this.modalService.open(content);
    this.studentModalInfo   = this.studentList[index];
  }
}