import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { languages } from '../../../models/models';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../../../services/master.service';

@Component({
  selector: 'app-tranlate-with-voice',
  standalone: true,
  imports: [MatIconModule, FormsModule, CommonModule],
  templateUrl: './tranlate-with-voice.component.html',
  styleUrls: ['./tranlate-with-voice.component.css']
})
export class TranlateWithVoiceComponent {
  isDragging = false;
  selectedFile: File | null = null;
  toLanguage = '';     
  TargetLanguage = '';  
  languages = languages;

  translating = false;
  translate = false;
  transcribedText = '';
  translatedText = '';

  private toastr = inject(ToastrService);
  private masterService = inject(MasterService);

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

  private handleFile(file: File) {
    const MAX_DURATION_SECONDS = 30; 
  
    if (!this.TargetLanguage || !this.toLanguage) {
      this.toastr.error('لا نستطيع القيام بالترجمه مالم تحدد اللغات المطلوبة');
      return;
    }
  
    if (!file.type.startsWith('audio/')) {
      this.toastr.error('الملف المحدد ليس ملف صوتي');
      return;
    }
  
    const audioContext = new AudioContext();
    const fileReader = new FileReader();
  
    fileReader.onload = async (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;
  
      try {
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const duration = audioBuffer.duration;
  
        if (duration > MAX_DURATION_SECONDS) {
          this.toastr.error('مدة الملف الصوتي أطول من 30 ثانية، الرجاء تحميل ملف أقصر.');
          return;
        }
  
        this.uploadFile(file);
      } catch (error) {
        console.error('Error decoding audio:', error);
        this.toastr.error('تعذر قراءة الملف الصوتي. يرجى المحاولة مجددًا.');
      }
    };
  
    fileReader.readAsArrayBuffer(file); 
  }
  private uploadFile(file: File) {
    const sourceLangValue = languages.find(l => l.code === this.TargetLanguage)?.appLanguageValue;
    const targetLangName = languages.find(l => l.code === this.toLanguage)?.labelEn;
  
    if (sourceLangValue == null || !targetLangName) {
      this.toastr.error('اللغات المختارة غير صحيحة');
      return;
    }
  
    this.selectedFile = file;
    this.translating = true;
  
    this.masterService.transcribeSound(this.selectedFile, sourceLangValue, targetLangName)
      .subscribe({
        next: (response) => {
          this.translating = false;
          this.translate = true;
          const result = response.result;
          if (result) {
            this.transcribedText = result.transcribedText;
            this.translatedText = result.translatedText;
          } else {
            this.toastr.warning('تم استلام استجابة فارغة.');
          }
        },
        error: (err) => {
          this.translating = false;
          console.error('فشل في استخراج أو ترجمة الصوت:', err);
          this.toastr.error('فشل في استخراج أو ترجمة الصوت');
        }
      });
  }
  
}
