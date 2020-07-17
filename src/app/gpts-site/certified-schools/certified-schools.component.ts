import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../shared/services/header.service';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-certified-schools',
  templateUrl: './certified-schools.component.html',
  styleUrls: ['./certified-schools.component.scss']
})
export class CertifiedSchoolsComponent implements OnInit {
  certifiedSchool: any;
  dataFetched: boolean = false;
  sliceVar: number = 10;

  constructor(private apiService: ApiService, public headerService: HeaderService) { }

  ngOnInit() {
    document.body.classList.add("certifiedschool-body");
    setTimeout(() => {
      this.headerService.loaderFunction(false);
    });
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
      this.dataFetched = true;
    });
  }

  convertToArray(val: any): any[] {
    return Array(val);
  }

  ngOnDestroy() {
    document.body.classList.remove("certifiedschool-body");
  }

}
