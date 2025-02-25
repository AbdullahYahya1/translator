import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { MasterService } from '../../../../services/master.service';
import { AuthService } from '../../../../services/auth.service';
import { languages } from '../../../models/models';
@Component({
  selector: 'app-tranlate-with-text',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tranlate-with-text.component.html',
  styleUrls: ['./tranlate-with-text.component.css']
})
export class TranlateWithTextComponent  implements OnInit{
  fromLanguage: string = '';
  toLanguage: string = '';
  sourceText: string = '';
  translatedText: string = '';
  masterService = inject(MasterService);
  auth = inject(AuthService)
  languages = languages;

  private textInputSubject: Subject<string> = new Subject<string>();

  constructor() {
    
    this.textInputSubject
      .pipe(debounceTime(1000))
      .subscribe(() => {
          this.detectLanguage();
          this.translate();
      });
  }
  ngOnInit(): void
  {
    const savedLanguage = localStorage.getItem('toLanguage');
    if (savedLanguage) {
      this.toLanguage = savedLanguage;
    }


  }

  detectLanguage() {
    if(this.sourceText ==""){
      this.fromLanguage = "",
      this.translatedText=""
      return 
    }
    this.masterService.detectLanguage(this.sourceText).subscribe({
      next:(res)=>{
        this.fromLanguage =res.result
  
      }
    })
  }

  onTextChange() {
    // Emit the text changes to be processed with a debounce
    this.textInputSubject.next(this.sourceText);
  }
  translating = false; 
  translate() {
    if (!this.sourceText.trim()  || !this.toLanguage) return;
    localStorage.setItem('toLanguage', this.toLanguage);
    this.translating= true; 
    this.masterService.PostTranslate(this.sourceText, this.toLanguage).subscribe({
      next: (value) => {
        this.translating= false; 
        this.translatedText = value.result;
      },
      error: (err) => {
        console.error('Translation error:', err);
      }
    });
  }

  swapLanguages() {
    [this.translatedText, this.sourceText] = [this.sourceText, this.translatedText];
    const originalFromEntry = this.languages.find(lang => lang.labelAr === this.fromLanguage);
    const originalToEntry = this.languages.find(lang => lang.code === this.toLanguage);
  
    if (originalFromEntry && originalToEntry) {
      this.fromLanguage = originalToEntry.labelAr;
      this.toLanguage = originalFromEntry.code;
      localStorage.setItem('toLanguage', this.toLanguage);
      this.translate();
    } else {
      [this.translatedText, this.sourceText] = [this.sourceText, this.translatedText];
    }
  }
}
