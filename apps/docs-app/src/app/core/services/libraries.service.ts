import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LibrariesService {
  constructor(private http: HttpClient) {}

  getVersion(libName: string): Observable<string> {
    return this.http.get<{ version: string }>(`assets/libs/${libName}/package.json`).pipe(map(json => json.version));
  }
}
