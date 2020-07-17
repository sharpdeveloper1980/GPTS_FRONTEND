import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-selection-progress',
  templateUrl: './selection-progress.component.html',
  styleUrls: ['./selection-progress.component.scss']
})
export class SelectionProgressComponent implements OnInit {
  todo:any = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done:any = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  processList: Array<any> = ['Incoming Applications', 'Shortlist', 'Process 1', 'Process 2', 'Final Status'];

  shortlistArray: any = [];
  processList1: any = [];
  processList2: any = [];
  finalList: any = [];

  constructor() { }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  ngOnInit() {
  }

  processClicked(event){
    let processClicked = event.target.attributes.id.nodeValue;
  }

}
