import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dots',
  templateUrl: './dots.component.html',
})
export class DotsComponent implements OnInit {
   totalElements = 0;

  /**
   *
   * @param notificationsServices NotificationsServices
   * @param loanSharedService SharedService
   * @param devToolsServices AcmDevToolsServices
   * @param customerServices CustomerServices
   * @param router Router
   * @param loanManagementService LoanManagementService
   */
  constructor(private router: Router) {
  }

  ngOnInit() {
    // get first 10 new notif
    this.loadNewNotif();
    // find total new notif
    this.loadTotalNumber();
  }

  loadNewNotif() {
    // this.notificationsServices.getNewNotification().subscribe(
    //   (data) => {
    //     this.notifications = data;
    //     this.notifications.forEach((customer) => {
    //       if (customer.loanDTO != null) {
    //         customer.loanDTO.customerNameNoPipe = this.loanSharedService.getCustomerName(customer.loanDTO.customerDTO);
    //       }
    //     });
    //   });
  }

  loadTotalNumber() {
    // this.notificationsServices.countNotifForUser().subscribe(
    //   (data) => {
    //     this.totalElements = data;
    //   });
  }

  
}
