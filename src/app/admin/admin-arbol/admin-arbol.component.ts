import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import { IOption } from 'ng-select';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import { Subject } from 'rxjs';

import { RightService } from '../../_services/right.service';
import { ToastOptionsClass } from './../../_utils/toastOptionsClass';

@Component({
  selector: "app-admin-arbol",
  templateUrl: "./admin-arbol.component.html",
  styleUrls: ["./admin-arbol.component.css"],
  providers: [RightService]
})
export class AdminArbolComponent implements OnInit {
  arbol: any = [];
  parents = [];
  children = [];
  derechos: Array<IOption>;
  curve: any = shape.curveBasis;
  update$: Subject<any> = new Subject();
  center$: Subject<any> = new Subject();
  zoomToFit$: Subject<any> = new Subject();

  constructor(
    private rightService: RightService,
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.theme = "default";
  }

  ngOnInit() {
    this.arbol.nodos = [];
    this.arbol.links = [];
  }

  getProfile(selected) {
    this.arbol.nodos = [];
    this.arbol.links = [];
    this.arbol.nodos.push({
      id: selected.value.toString(),
      label: selected.label
    });
  }

  getParents($event) {
    this.parents = [];
    let id = $event.item.id;
    this.rightService.getParents(id).subscribe(
      resPadre => {
        this.parents = resPadre.map(element => {
          return { id: element.Padre.id, nombre: element.Padre.nombre };
        });
        for (let parent of this.parents) {
          if (this.searchNodo(parent.id) == undefined) {
            this.arbol.nodos.push({
              id: parent.id.toString(),
              label: parent.nombre
            });
          }
          if (this.searchLink(parent.id, id) == undefined) {
            this.arbol.links.push({
              source: parent.id.toString(),
              target: id.toString(),
              label: ""
            });
          }
        }
        this.arbol.links = [...this.arbol.links];
        this.arbol.nodos = [...this.arbol.nodos];
      },
      err => {
        var toast: ToastOptions = this.toastOptionsClass.toastOptions;
        toast.msg = err;
        this.toastyService.error(toast);
      }
    );
  }

  getChildren($event) {
    this.children = [];
    let id = $event.item.id;
    this.rightService.getChildren(id).subscribe(
      resHijo => {
        this.children = resHijo.map(element => {
          return { id: element.Nodo.id, nombre: element.Nodo.nombre };
        });
        for (let child of this.children) {
          if (this.searchNodo(child.id) == undefined) {
            this.arbol.nodos.push({
              id: child.id.toString(),
              label: child.nombre
            });
          }
          if (this.searchLink(id, child.id) == undefined) {
            this.arbol.links.push({
              source: id.toString(),
              target: child.id.toString(),
              label: ""
            });
          }
        }
        this.arbol.links = [...this.arbol.links];
        this.arbol.nodos = [...this.arbol.nodos];
      },
      err => {
        var toast: ToastOptions = this.toastOptionsClass.toastOptions;
        toast.msg = err;
        this.toastyService.error(toast);
      }
    );
  }

  private cloneOptionsFromSQL(options: Array<any>): Array<IOption> {
    return options.map(option => ({
      value: option.id,
      label: option.nombre
    }));
  }

  searchRight(term: string) {
    this.rightService.findRights(term).subscribe(res => {
      this.derechos = this.cloneOptionsFromSQL(res);
    });
  }

  searchNodo(id: number) {
    return this.arbol.nodos.find(element => {
      return element.id == id;
    });
  }

  searchLink(source: number, target: number) {
    return this.arbol.links.find(element => {
      return element.source == source && element.target == target;
    });
  }
}
