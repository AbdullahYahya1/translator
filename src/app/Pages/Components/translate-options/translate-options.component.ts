import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-translate-options',
  imports: [RouterModule,NgClass],
  templateUrl: './translate-options.component.html',
  styleUrl: './translate-options.component.css'
})
export class TranslateOptionsComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
