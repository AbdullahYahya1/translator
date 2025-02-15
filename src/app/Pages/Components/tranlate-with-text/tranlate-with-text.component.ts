import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-tranlate-with-text',
  imports: [CommonModule, FormsModule],
  templateUrl: './tranlate-with-text.component.html',
  styleUrls: ['./tranlate-with-text.component.css']
})
export class TranlateWithTextComponent {
  fromLanguage: string = '';
  toLanguage: string = '';
  sourceText: string = '';
  translatedText: string = '';
  languages = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'Arabic' },
    { code: 'fr', label: 'French' }
  ];

  private textInputSubject: Subject<string> = new Subject<string>();

  constructor() {
    this.textInputSubject.pipe(debounceTime(2000)).subscribe(() => {
      this.translate();
    });
  }

  onTextChange() {
    this.textInputSubject.next(this.sourceText);
  }

  translate() {
    if (!this.sourceText.trim() || !this.fromLanguage || !this.toLanguage) return;

    console.log("🔄 Translating after 2s...");
    
    this.translatedText = `Translation of "${this.sourceText}" from ${this.fromLanguage} to ${this.toLanguage}`;
  }

  swapLanguages() {
    [this.fromLanguage, this.toLanguage] = [this.toLanguage, this.fromLanguage];
    this.translate();
  }
}
