import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  language: string = "es";

  constructor(private http: HttpClient, private translate: TranslateService) { }

  switchLanguage(language: string) {
    if(this.language) {
      this.language = language;
    } else {
      this.language = 'es';
    }
    this.translate.setDefaultLang(language);
  }

  /* sendEmail(email: any): Observable<any> {
    console.log("Estoy enviando el mensaje");

    return this.http.post<any>("http://localhost:8000/sendemail", email);
  } */
  sendEmail(email: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = 'https://api.spaceofdesign.es';
    const json = JSON.stringify(email);
    /* const data = new FormData();
    data.append('emailData', email); */

    return this.http.post(url, json);

    /* .pipe(
      map(resp => {
				return resp;
			}),
      catchError((resp: HttpErrorResponse) =>
        throwError(() => `Error insertando el email: Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)
      )
    ) ;*/
  }
}
