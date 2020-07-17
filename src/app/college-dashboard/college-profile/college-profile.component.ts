import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-college-profile',
  templateUrl: './college-profile.component.html',
  styleUrls: ['./college-profile.component.scss']
})
export class CollegeProfileComponent implements OnInit {
  currentJustify = 'between';
  userTypeList: Array<any> = [];
  universityList: Array<any>;
  ownershipList: Array<any> = [
    { id: 'public', name: 'Public/ Government' },
    { id: 'private', name: 'Private' },
    { id: 'public_private', name: 'Public Private' },
  ];
  typeOfCollege: Array<any> = [
    { id: 'government', name: 'Government' },
    { id: 'private', name: 'Private' },
    { id: 'autonomous', name: 'Autonomous' },
    { id: 'deemed', name: 'Deemed' },
    { id: 'state', name: 'State' },
  ];
  yearOfEst: Array<any> = [];
  locationList: Array<any> = [
    { id: 'India', name: 'India' },
    { id: 'UK', name: 'UK' },
    { id: 'USA', name: 'State' },
    { id: 'Canada', name: 'Canada' },
    { id: 'UAE', name: 'UAE' },
    { id: 'Germany', name: 'Germany' },
  ];

  recogList: Array<any> = [
    { id: 'NAAC', name: 'NAAC' },
    { id: 'AICTE', name: 'AICTE' },
    { id: 'BCI', name: 'BCI' },
    { id: 'IAP', name: 'IAP' },
    { id: 'UGC', name: 'UGC' },
    { id: 'AIU', name: 'AIU' },
  ];

  accredationList: Array<any> = [
    { id: 'A', name: 'NAAC Grade A' },
    { id: 'A', name: 'NAAC Grade B' },
    { id: 'A', name: 'NAAC Grade B++'},
    { id: 'A', name: 'NAAC Grade A+' },
    { id: 'A', name: 'NAAC Grade B+' },
  ];
  facilitiesList: Array<any> = [];

  constructor(private apiService:ApiService) { }

  ngOnInit() {
    document.body.classList.add("collegeProfile");
    this.getYears();
    this.apiCalls();
  }

  getYears() {
    let currentYear = new Date().getFullYear(), years = [];
    let startYear = 1900;
    for(let i=startYear; currentYear >= i; i++){
      this.yearOfEst.push({ id: i, name: i });
    }
  }

  apiCalls(){
   this.apiService.getFacilities().subscribe(val=>{
      this.facilitiesList = val.data;
   });
  }

  ngOnDestroy() {
    document.body.classList.remove("collegeProfile");
  }

}
