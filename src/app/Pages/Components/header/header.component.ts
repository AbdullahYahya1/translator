import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MasterService } from '../../../../services/master.service';
import { BaseResponse, UserInfo } from '../../../models/models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = !!localStorage.getItem('accessToken');
  username = '';

  constructor(private masterService: MasterService) {}

  logout(): void {
    this.loggedIn = false;
    localStorage.clear();
  }

  ngOnInit(): void {
    var data = localStorage.getItem("accessToken")
    if(data)
    this.masterService.GetUser().subscribe({
      next: (response: BaseResponse<UserInfo>) => {
        if (response.isSuccess && response.result) {
          this.username = response.result.username || response.result.email;
        } 
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
  }
}
