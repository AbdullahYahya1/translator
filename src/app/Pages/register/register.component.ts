import { MaterialModule } from '../../material/material.module';
import { Component, NgZone, AfterViewInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../../../services/master.service';
declare const google: any;

@Component({
  selector: 'app-register',
  imports: [MaterialModule, RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',

})
export class RegisterComponent implements AfterViewInit
{
  constructor(
    private router: Router,
    private ngZone: NgZone
  ) { }
  private toastr = inject(ToastrService);
  private authService = inject(AuthService)
  initializeGoogleSignIn(): void
  {
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

  handleCredentialResponse(response: any): void
  {
    // Add registration logic here
  }

  ngAfterViewInit(): void
  {
    const checkGoogleScript = setInterval(() =>
    {
      if (typeof google !== 'undefined')
      {
        clearInterval(checkGoogleScript);
        this.initializeGoogleSignIn();
      }
    }, 100);
  }

  fullName: string = ''
  email: string = '';
  password: string = '';
  password2: string = '';
  register(): void
  {
    if (this.fullName && this.email && this.password && this.password2)
    {
      this.authService.register(this.fullName, this.email, this.password).subscribe(
        {
          next: (next) =>
          {
             (next)
            this.router.navigate(['/login']);
          },
          error:(err)=>{
             (err)
          }
        }
      )
    } else
    {
      this.toastr.error('الرجاء ملء جميع الحقول المطلوبة');
    }
  }

}