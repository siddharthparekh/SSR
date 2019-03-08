import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { IProfesional } from '../../../../_models/Profesional';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-name-location',
  templateUrl: './name-location.component.html',
  styleUrls: ['./name-location.component.css']
})
export class NameLocationComponent implements OnInit {
  @Input() isRanking = true;
  @Input() hasAccess = false;
  @Input() abogado: any;

  @Output() onClickBlock = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }


  plan() {
    this.onClickBlock.emit();
  }
}
