import { ChangeDetectorRef, Component } from '@angular/core';
import { RoleEnum } from '../../shared/enum/role.enum';
import { HttpService } from '../../shared/service/http-service';
import { SessionService } from '../../shared/service/session.service';
import { assistantNavItems } from '../assistantNavItems';
import { doctorNavItems } from '../doctorNavItems';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems;
  inProgress: boolean = false;

  constructor(private httpService: HttpService,
    public sessionService: SessionService,
    private cdref: ChangeDetectorRef) {
    this.setNavItems();

    setTimeout(() => {
      this.httpService.inProgressEventEmitter.subscribe(
        res => this.inProgress = res,
                cdref.detectChanges()
      )
    , 2000});

  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  setNavItems() {
    if (this.sessionService.getUserRole() == RoleEnum.Doctor) {
      this.navItems = doctorNavItems;
    }
    else {
      this.navItems = assistantNavItems;
    }
  }

  logout() {
    this.sessionService.signOutWithErrorMessage(null);
  }
}
