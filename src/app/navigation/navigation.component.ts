import {Component, OnInit, ElementRef, Renderer2} from '@angular/core';
import {UserAccount} from "fusio-sdk/dist/src/generated/consumer/UserAccount";
import {ConsumerService, UserService} from "ngx-fusio-sdk";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isAuthenticated = true;
  isMenuCollapsed = true;
  account?: UserAccount;

  constructor(private consumer: ConsumerService, private user: UserService<UserAccount>, private elem: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.isAuthenticated = this.consumer.hasValidToken();
    this.account = this.user.get();
  }

  setActive(ind: string) {
    const rows = this.elem.nativeElement.querySelectorAll('.nav-link.custom-link-style')
    for (const row of rows) {
      row.classList.remove('active');
    }
    const row = this.elem.nativeElement.querySelector(`.nav-link-${ind}-js`)
    if (row) {
      row.classList.add('active');
    }
  }
}
