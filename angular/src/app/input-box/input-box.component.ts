import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-input-box',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './input-box.component.html',
  styleUrl: './input-box.component.css'
})
export class InputBoxComponent {
  email:string='';
  focusEmail(){
    this.email="Ex:abc.xyz@gmail.com"
  }
  bluerEmail(){
    this.email='';
  }
}
