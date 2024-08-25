import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';






@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  exports: [
  ],
})
export class AppModule { }
