import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Image} from "./image.model";
import {environment} from "../../env/env";

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  getImage(imageId: number | undefined): Observable<Blob> {
    return this.http.get(environment.apiHost + 'images/' + imageId, { responseType: 'blob' });
  }
}
