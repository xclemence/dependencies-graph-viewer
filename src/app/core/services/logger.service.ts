import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  log = console.log;
  error = console.error;
  warn = console.warn;
}
