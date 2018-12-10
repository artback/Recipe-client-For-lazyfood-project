import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatDividerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatListModule,
  MatToolbarModule,
  MatSidenavModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
    MatTableModule,
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatSelectModule,
    MatDividerModule,
    MatTableModule,
  ],
  bootstrap: [
  ]
})
export class MaterialModule { }
