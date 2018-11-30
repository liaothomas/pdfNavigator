import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppComponent } from './app.component';
import { PdfNavigationComponent } from './pdf/pdf-navigation/pdf-navigation.component';
import { ViewPdfPageComponent } from './pdf/view-pdf-page/view-pdf-page.component';

@NgModule({
  declarations: [AppComponent, PdfNavigationComponent, ViewPdfPageComponent],
  imports: [BrowserModule, PdfViewerModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
