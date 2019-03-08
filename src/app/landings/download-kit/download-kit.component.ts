import { Component, OnInit } from '@angular/core';
import { NosotrosService } from './nosotros.service';
import * as FileSaver from 'file-saver';

@Component({
   selector: 'app-download-kit',
   templateUrl: './download-kit.component.html',
   styleUrls: ['./download-kit.component.css'],
   providers: [NosotrosService]
})
export class DownloadKitComponent implements OnInit {

   downloading: boolean = true;
   hasError = false;

   constructor(
      private nosotrosService: NosotrosService
   ) { }

   ngOnInit() {
      this.download();
   }

   download() {
      this.nosotrosService.downloadKitPrensa().subscribe((data) => {
         FileSaver.saveAs(data.body, "kit-prensa.zip");
         this.downloading = false;
      }, err => {
         this.hasError = true;
      });
   }
}
