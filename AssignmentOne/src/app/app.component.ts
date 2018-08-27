import { Component } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Assignment One';
  constructor(socketService: SocketService) { }
/* If there is
“Uncaught ReferenceError: global is not defined”
 we may resolve it by angular/angular-cli#8160 (comment),
adding  polyfills.ts:
(window as any).global = window;
*/

}
