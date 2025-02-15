import { Component } from '@angular/core';
import { TranslationFeatureComponent } from "../Components/translation-feature/translation-feature.component";
import { RouterOutlet } from '@angular/router';
import { TranslateOptionsComponent } from "../Components/translate-options/translate-options.component";
import { FooterComponent } from "../Components/footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [TranslationFeatureComponent, RouterOutlet, TranslateOptionsComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
