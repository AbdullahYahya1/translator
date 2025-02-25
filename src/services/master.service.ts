import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroments';
import { Observable } from 'rxjs';
import { BaseResponse, ExtractionResponse, TranscriptionResponse, UserInfo } from '../app/models/models';
import { transition } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  httpClient = inject(HttpClient)
  private path = enviroment.apiUrl;
  public GetUser(): Observable<BaseResponse<UserInfo>> {
    return this.httpClient.get<BaseResponse<UserInfo>>(`${this.path}/api/User`);
  }
  public PostTranslate(text:string , language:string ): Observable<BaseResponse<string>> {
    return this.httpClient.post<BaseResponse<string>>(`${this.path}/api/AI/translateText?prompt=${text}&targetLanguage=${language}`,{});
  }
  public detectLanguage(text: string): Observable<BaseResponse<string>> {
    const body = {
      text: text
    };
  
    return this.httpClient.post<BaseResponse<string>>(
      `${this.path}/api/AI/IdentifyText`,
      body
    );
  }
  

  public extractTextImage(
    file: File,
    language: number, 
    targetLanguage: string
  ): Observable<BaseResponse<ExtractionResponse>> {
    const formData = new FormData();
    formData.append('File', file, file.name);
    const url = `${this.path}/api/AI/extractTextImage?language=${language}&targetLanguage=${targetLanguage}`;
    return this.httpClient.post<BaseResponse<ExtractionResponse>>(url, formData);
  }


  public transcribeSound(
    file: File,
    language: number, 
    targetLanguage: string
  ): Observable<BaseResponse<TranscriptionResponse>> {
    const formData = new FormData();
    formData.append('File', file, file.name);
    const url = `${this.path}/api/AI/transcribeSound?language=${language}&targetLanguage=${targetLanguage}`;
    return this.httpClient.post<BaseResponse<TranscriptionResponse>>(url, formData);
  }


}
