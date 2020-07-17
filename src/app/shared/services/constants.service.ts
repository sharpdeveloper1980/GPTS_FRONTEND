import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor() { }
  
  //  redirectUrlTTe = "&return_url=http://127.0.0.1:4200/student-dashboard/tte-result?status=ASSESSMENT_STATUS";

  // redirectUrlTTe = "&return_url=http://52.17.229.142/gpts/student-dashboard/tte-result?status=ASSESSMENT_STATUS";
  redirectUrlTTe = "&return_url=https://www.greatplacetostudy.com/student-dashboard/tte-result?status=ASSESSMENT_STATUS";

  //redirectUrlTTe = "&return_url=http://52.17.229.142/student-dashboard/tte-result?status=ASSESSMENT_STATUS";
  //  redirectUrlTTe = "&return_url=https://greatplacetostudy.com/student-dashboard/tte-result?status=ASSESSMENT_STATUS";
}
