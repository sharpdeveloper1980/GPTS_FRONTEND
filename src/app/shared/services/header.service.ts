import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  menuClicked: boolean = false;
  toggleSideMenuBehaviour = new BehaviorSubject(false);
  usernameHeaderBehaviour = new BehaviorSubject('');
  userSignupBehaviour = new BehaviorSubject(false);
  userRegisteredBehaviour = new BehaviorSubject(false);
  userInfoLsBehaviour = new BehaviorSubject('');
  logOutBehaviour = new BehaviorSubject(true);
  routeSubject = new BehaviorSubject('');
  loaderBehaviour = new BehaviorSubject(false);
  dashboardHomeBehaviour = new BehaviorSubject(true);
  userType: any;
  loaderVal: boolean;

  constructor() { }

  routeData(user){
    this.userType = user.usertype;
  }
  // side bar  functions
  toggleSideMenuObservable(): Observable<any> {
    return this.toggleSideMenuBehaviour.asObservable();
  }

  toggleSideMenu(sideMenuView) {
    this.toggleSideMenuBehaviour.next(sideMenuView);
  }

  // User name functions
  usernameHeaderObservable(): Observable<any> {
    return this.usernameHeaderBehaviour.asObservable();
  }

  userNameHeader(userName) {
    this.usernameHeaderBehaviour.next(userName);
  }
  // Check if student has signup 
  userSignupObservable(): Observable<any> {
    return this.userSignupBehaviour.asObservable();
  }

  userSignup(val) {
    this.userSignupBehaviour.next(val);
  }

  // Check if student has registered 
  userRegisteredObservable(): Observable<any> {
    return this.userRegisteredBehaviour.asObservable();
  }

  userRegistered(userRegisteredVar) {
    this.userRegisteredBehaviour.next(userRegisteredVar);
  }

  userInfoLsObservable():Observable<any> {
     return this.userInfoLsBehaviour.asObservable();
  }
  userInfoLs(userInfoVar) {
    this.userInfoLsBehaviour.next(userInfoVar);
  }

  logOutObservable():Observable<any> {
     return this.logOutBehaviour.asObservable();
  }

  logOut(val) {
    this.logOutBehaviour.next(val);
  }

  routeObservable(): Observable<any>{
      return this.routeSubject.asObservable();
  }

  routeFunction(val){
    this.routeSubject.next(val);
  }

  loaderObservable(): Observable<any>{
    return this.loaderBehaviour.asObservable();
  }

  loaderFunction(val:boolean){
    this.loaderBehaviour.next(val);
  }

  dashboardHomeObservable(): Observable<any>{
    return this.dashboardHomeBehaviour.asObservable();
  }

  dashboardCheck(val){
    console.log(val);
    this.loaderVal = val;
    this.dashboardHomeBehaviour.next(val);
  }
}
