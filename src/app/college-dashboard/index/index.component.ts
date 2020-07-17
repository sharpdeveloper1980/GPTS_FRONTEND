import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { HeaderService } from '../../shared/services/header.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(public router: Router) {
    this.checkUserAllowed();
  }

  ngOnInit() {

  }

  checkUserAllowed() {
    let user = JSON.parse(localStorage.getItem('userGpts'));
    if (user == null) {
      this.router.navigate(['/', 'home']);
      return;
    } else if (user.usertype != 2 || user.is_eligible_for_dashboard === undefined) {
      this.router.navigate(['/', 'home']);
    }

  }

}
