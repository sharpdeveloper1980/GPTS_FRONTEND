import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../shared/services/header.service';
import { ApiService } from '../../core/api.service';


declare var $: any;
declare var AOS: any;
@Component({
  selector: 'app-design-college',
  templateUrl: './design-college.component.html',
  styleUrls: ['./design-college.component.scss']
})
export class DesignCollegeComponent implements OnInit {
  data: Array<any> = [];
  colleges: Array<any> = [];
  
  constructor(private headerService: HeaderService,private apiService:ApiService) { }

  ngOnInit() {
  //  this.getData();
  setTimeout(()=>{
    this.headerService.loaderFunction(false);
  }, 2000);
  }

  // getData() {
  //   this.apiService.getDesign().subscribe(val=>{
  //     this.data = val.data;
  //     this.colleges = val.collegeslist;
  //   });
    
   
  // }
 

//   callregModal() {
//     $("#greatChallengeNotify").modal('show');
//     }

//     removeBootstrapModal() {
//   $("#greatChallengeNotify").modal('hide');
 
  
// }
}
