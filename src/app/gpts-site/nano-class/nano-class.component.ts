import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../shared/services/header.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-nano-class',
  templateUrl: './nano-class.component.html',
  styleUrls: ['./nano-class.component.scss']
})
export class NanoClassComponent implements OnInit {

  firstparam = this.activatedRoute.snapshot.queryParamMap.get('tabparam');
  constructor(private headerService: HeaderService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  
    setTimeout(()=>{
      this.headerService.loaderFunction(false);
    }, 2000);
  }

}
