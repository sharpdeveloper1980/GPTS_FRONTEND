import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {HeaderService} from '../shared/services/header.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  loggedIn: boolean = false;
  constructor(public headerService: HeaderService) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.loggedIn){
      return true
    } else{
      return false
    }
  }
}
