import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  
  constructor(private router: Router, private ngZone: NgZone , private service:AuthService) { }

  public logout() {
    this.service.signOutExternal();
    this.ngZone.run(() => {
      this.router.navigate(['/']).then(() => window.location.reload());
    });
  }
}

