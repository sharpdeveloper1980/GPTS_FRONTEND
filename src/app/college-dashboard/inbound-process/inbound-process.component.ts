import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inbound-process',
  templateUrl: './inbound-process.component.html',
  styleUrls: ['./inbound-process.component.scss']
})
export class InboundProcessComponent implements OnInit {
  CardList: Array<any> = ['sdcsd', 'sfdvdfv', 'sdcsdc', 'trguilreg'];
  constructor() { }

  ngOnInit() {
  }

}
