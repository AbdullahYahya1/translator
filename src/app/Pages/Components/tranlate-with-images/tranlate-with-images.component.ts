import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { languages } from '../../../models/models';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { MasterService } from '../../../../services/master.service';

@Component({
  selector: 'app-tranlate-with-images',
  imports: [MatIconModule, CommonModule,FormsModule],
  templateUrl: './tranlate-with-images.component.html',
  styleUrl: './tranlate-with-images.component.css'
})
export class TranlateWithImagesComponent {
  isDragging = false;
  selectedFile: File | null = null;
  toLanguage = "";
  TargetLanguage="";
  languages = languages;
  private masterService = inject(MasterService)
  private toastr= inject(ToastrService)
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    if (!this.TargetLanguage || !this.toLanguage) {
      this.toastr.error('لا نستطيع القيام بالترجمة مالم تحدد اللغات المطلوبة');
      return;
    }
  
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event) {


  
    const input = event.target as HTMLInputElement;


    if (!this.TargetLanguage || !this.toLanguage) {
      this.toastr.error('الرجاء اختيار اللغة');
      input.value = '';
      return;
    }

    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }
  
  translating = false;
  translate = false;
  extractedText = '';
  
  private handleFile(file: File) {

    const MAX_SIZE_MB = 1; 
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024; 
  
    if (file.size > MAX_SIZE_BYTES) {
      this.toastr.error('حجم الملف كبير جدًا، الرجاء تحميل ملف أقل من واحد ميجا بايت');
      return;
    }
  

    const langItem = languages.find(l => l.code === this.TargetLanguage);
    if (!langItem) {
      this.toastr.error('اللغة المصدر غير صحيحة');
      return;
    }
  
    const sourceLangValue = langItem.appLanguageValue;
    const targetLangName = languages.find(L => L.code === this.toLanguage)?.labelEn || 'english';
  
    this.selectedFile = file;
    this.translating = true;
  
    this.masterService.extractTextImage(this.selectedFile, sourceLangValue, targetLangName)
    .subscribe({
      next: (response) => {
        this.translating = false;
        this.translate = true;
        
        if (response.result.extractedText === "No text extracted or invalid response.") {
          this.toastr.error('لم نستطع معلاجة الصوره هذه');
          this.translating = false;
          this.translate = false;
          this.extractedText = '';
          return        
        } else {
          this.extractedText = response.result.translatedText || "Translation unavailable.";
        }
        
      },
      error: (err) => {
        this.translating = false;
        console.error('Failed to process image:', err);
        this.toastr.error('لم نستطع معلاجة الصوره هذه');
      }
    });
  }
  

}