import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private snackMessage$ = new BehaviorSubject<string>("");
  newSnackMessage = this.snackMessage$.asObservable();

  constructor() {}

  public openSnack(message: string) {
    this.snackMessage$.next(message);

  }
}

