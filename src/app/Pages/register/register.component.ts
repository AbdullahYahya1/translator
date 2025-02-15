import { MaterialModule } from '../../material/material.module';
import { Component, NgZone, AfterViewInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
declare const google: any;

@Component({
  selector: 'app-register',
  imports: [MaterialModule ,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css', 
  
})
export class RegisterComponent implements AfterViewInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone
  ) {}

  initializeGoogleSignIn(): void {
    google.accounts.id.initialize({
      client_id: '1097673511412-9626rhs3kbbt5sl425vbennv8j45meok.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      {
        theme: 'outline',
        type: 'standard',
        width: '400',
        text: 'continue_with',
        shape: 'rectangular',
        logo_alignment: 'left'
      }
    );
    google.accounts.id.prompt();
  }

  handleCredentialResponse(response: any): void {
    console.log('✅ Google JWT Token:', response.credential);
    // Add registration logic here
  }

  ngAfterViewInit(): void {
    const checkGoogleScript = setInterval(() => {
      if (typeof google !== 'undefined') {
        clearInterval(checkGoogleScript);
        this.initializeGoogleSignIn();
      }
    }, 100);
  }
}