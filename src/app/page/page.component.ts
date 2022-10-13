import {Component, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {Page} from "fusio-sdk/dist/src/generated/consumer/Page";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {ConsumerService, ErrorConverter} from "ngx-fusio-sdk";
import {Router} from "@angular/router";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export abstract class PageComponent implements OnInit {

  response?: Message;
  page?: Page
  content?: SafeHtml

  constructor(private consumer: ConsumerService, protected sanitizer: DomSanitizer, private router: Router) { }

  async ngOnInit(): Promise<void> {
    try {
      if (!this.consumer.hasValidToken()) {
        await this.router.navigate(['/login']);
      }

      const page = await this.consumer.getClientAnonymous().getConsumerPageByPageId(this.getId());
      const response = await page.consumerActionPageGet();

      this.page = response.data;
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.page.content || '');
      this.response = undefined;
    } catch (error) {
      this.response = ErrorConverter.convert(error);
    }
  }

  protected abstract getId(): string;

}
