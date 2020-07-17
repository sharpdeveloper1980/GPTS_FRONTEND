import { Injectable } from '@angular/core';
import { Router, NavigationEnd, RoutesRecognized, RouterState } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumService {
  routeName: any;
  routInfo: RoutesRecognized;
  constructor(private route: Router) {
    this.route.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.routeName = event.url;
      } else if (event instanceof RoutesRecognized) {
        this.routInfo = event;
      }
    });
  }
}
