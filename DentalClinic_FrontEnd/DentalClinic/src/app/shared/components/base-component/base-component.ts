import { ChangeDetectorRef, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-base-component'
})
export class BaseComponent  {

   constructor(protected cdref: ChangeDetectorRef,
    protected route: ActivatedRoute,
    protected title: Title) {
  }

  ngAfterContentInit() {
    this.cdref.detectChanges();
    this.route.data.subscribe(data => this.title.setTitle(data.title));
  }
}
