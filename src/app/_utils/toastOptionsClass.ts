import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

export class ToastOptionsClass {
   toastOptions: ToastOptions;

   constructor() {
      this.toastOptions = {
         title: "Error",
         showClose: true,
         theme: "default"
      };
   }
}