import { Injectable, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class NotificationService {

  constructor(private toastr: ToastsManager) { }

  init(vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Success!');
  }

  showError(message: string) {
    this.toastr.error(message, 'Error!');
  }

  showWarning(message: string) {
    this.toastr.warning(message, 'Warning!');
  }

  showInfo(message: string) {
    this.toastr.info(message);
  }
}
