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
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
    MatTableModule,
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatDividerModule,
    MatTableModule,
  ],
  bootstrap: [
  ]
})
export class MaterialModule { }
