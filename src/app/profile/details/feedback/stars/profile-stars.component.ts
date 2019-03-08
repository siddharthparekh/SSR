import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-stars',
  templateUrl: './profile-stars.component.html',
  styleUrls: [
    './stars.css',
  ],
})
export class ProfileStarsComponent implements OnInit {
  @Input() large = false;
  @Input() value = 0;
  workingValue: number;

  ngOnInit() {
    this.workingValue = Math.floor(this.value);
  }

  createRangeFilled(){
    const items: number[] = [];
    for (let i = 1; i <= this.workingValue; i++){
       items.push(i);
    }
    return items;
  }

  createRangeEmpty(){
    const items: number[] = [];
    for (let i = 1; i <= (5 - this.workingValue); i++){
       items.push(i);
    }
    return items;
  }
}
