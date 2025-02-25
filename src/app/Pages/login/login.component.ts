import { MaterialModule } from '../../material/material.module';
import { Component, NgZone, AfterViewInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare const google: any;

@Component({
  selector: 'app-login',
  imports: [MaterialModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements AfterViewInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone
  ) {}
  private toastr = inject(ToastrService);

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

  handleCredentialResponse(response: google.accounts.id.CredentialResponse): void {
    this.authService.LoginWithGoogle(response.credential).subscribe({
      next: (data) => {
        localStorage.setItem('accessToken', data.result.accessToken);  
        localStorage.setItem('refreshToken', data.result.refreshToken);  
        this.ngZone.run(() => {
          this.router.navigate(['/home']);
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  ngAfterViewInit(): void {
    const checkGoogleScript = setInterval(() => {
      if (typeof google !== 'undefined') {
        clearInterval(checkGoogleScript);
        this.initializeGoogleSignIn();
        
      }
    }, 100);
  }

  email: string = '';
  password: string = '';
  
  login(): void {
    if (this.email && this.password) {
      this.authService.login( this.email, this.password).subscribe(
        {
          next: (res) =>
          {
            if(res.isSuccess){
            localStorage.setItem('accessToken', res.result.accessToken);
            localStorage.setItem('refreshToken', res.result.refreshToken);
            this.router.navigate(['/home/Text']);
            }
            else{
              this.toastr.error('حدث خطاء');
              
            }
          },
          error:(err)=>{
            console.log(err)
          }
        }
      )
    } else {
      this.toastr.error('الرجاء ملء جميع الحقول المطلوبة');
    }
  }

}
