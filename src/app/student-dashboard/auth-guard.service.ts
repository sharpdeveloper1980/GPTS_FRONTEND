import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';

import { ApiService } from '../core/api.service';
import { HeaderService } from '../shared/services/header.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  userDetails: any;
  tteTestTaken: boolean;
  profileStatus: any;

  constructor(private router: Router, private apiService: ApiService, private headerService: HeaderService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.userDetails = JSON.parse(localStorage.getItem('userGpts'));
    console.log(this.userDetails);
    if (this.userDetails != null) {
      let userDetailsReq = { 'user_id': this.userDetails.user_id, 'usertype': this.userDetails.usertype };
      this.apiService.getStudentProfileInfo(userDetailsReq).subscribe(val => {
        this.profileStatus = val.profile_info.student_complete_status;
        console.log(this.profileStatus);
        if (this.profileStatus == '100%') {
          setTimeout(() => {
            this.headerService.loaderFunction(false);
            this.router.navigate(['/', 'student-dashboard', 'career-discovery-test']);
            return true;
          }, 1000);
        } else {
          this.router.navigate(['/', 'student-dashboard', 'home']);
          if (this.router.url === '/student-dashboard/home') {
            setTimeout(() => {
              this.headerService.loaderFunction(false);
              return false;
            }, 1000)
          }
        }
      },
        error => {
          console.log(error);
        }
      );
      return true;
    }else{
        this.router.navigate(['/', 'home']);
    }
  }
}
