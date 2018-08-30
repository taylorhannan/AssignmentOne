import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
//  for form
import { HttpModule } from '@angular/http';
// for http
import { SocketService } from './socket.service';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { NavComponent } from './nav/nav.component';
import { AdminComponent } from './admin/admin.component';
// for created service
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    NavComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
