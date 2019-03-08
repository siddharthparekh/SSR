
import {switchMap, tap, distinctUntilChanged, debounceTime, takeUntil} from 'rxjs/operators';
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { IOption } from 'ng-select';
import { Observable ,  Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { SolrService } from './../../_services/solr.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalsService } from './../../_services/modals.service';
import { Meta, Title } from "@angular/platform-browser";

declare var $: any;

@Component({
  selector: 'app-landing-profesionales',
  templateUrl: './landing-profesionales.component.html',
  styleUrls: ['./landing-profesionales.component.css'],
  providers: [SolrService]
})
export class LandingProfesionalesComponent implements OnInit, OnDestroy {
  @ViewChild('template')
  template: TemplateRef<any>;
  searchTerm: string;
  reqInProg: boolean = false;
  modalRef: BsModalRef;
  ngUnsubscribe = new Subject<void>();

  constructor(private solrService: SolrService,
    private meta: Meta, private title: Title,
    private modalService: BsModalService, private modalSharedService: ModalsService,
    private _sanitizer: DomSanitizer, private router: Router) {
    this.searchUser = this.searchUser.bind(this);
  }
  openModal() {
    this.modalRef = this.modalService.show(this.template);
  }
  ngOnDestroy() {
    this.meta.removeTag('name="description"');
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  ngOnInit() {
    this.meta.addTag({
      name: 'description', content: `Entra en la única red de especialistas reales. En Emérita Legal tendrás a los mejores abogados especialistas por materia en cada provincia. Destaca por su calidad legal, transparencia total e innovación legaltech.`
    })
    this.modalSharedService.onClose().pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        if (this.modalRef) { this.modalRef.hide(); }
      });
    this.modalSharedService.onOpen().pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.openModal();
      })
    $("#main").css("min-height", $(window).innerHeight() + 'px');
  }
  searchUser(terms: Observable<string>): Observable<any[]> {
    return terms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.reqInProg = true),
      switchMap(term =>
        this.solrService.findUsersAutocomplete(term)
      ),tap(() => this.reqInProg = false),);


  }
  formatterInput = (x: any) => this.transform(x.value);
  formatter = (x: any) => this.transform(x.value);

  transform(value: any) {
    if (value) {
      value = value.toLowerCase();
      var res = "";
      var arr = value.split(" ");
      for (let i of arr) {
        res += i.charAt(0).toUpperCase() + i.slice(1) + " ";
      }
      return res;
    }
    return value;
  }
  onSelected(lawyer: NgbTypeaheadSelectItemEvent) {
    this.router.navigate(['/profile', lawyer.item.idSolr.replace(/ /g, '_')]);
  }
  onSubmit() {
    this.router.navigate(['/search'], { queryParams: { abogado: this.searchTerm } })
  }

}
