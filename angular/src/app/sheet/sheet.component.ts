import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-sheet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sheet.component.html',
  styleUrl: './sheet.component.css'
})
export class SheetComponent {
  private http=inject(HttpClient);
  bottomup:boolean=false;
  topdown:boolean=false;
  leftright:boolean=false;
  rightleft:boolean=false;
  sheet:any=[];
  buttonClicked(type:string){
    this.http.get('./assets/sheet.json').subscribe((data:any)=>{
      this.sheet=data;
    })
    if(type=='bottomup'){
      this.bottomup=!this.bottomup;
    }
    else if(type=='topdown'){
      this.topdown=!this.topdown;
    }
    else if(type=='leftright'){
      this.leftright=!this.leftright;
    }
    else if(type=='rightleft'){
      this.rightleft=!this.rightleft;
    }
  }

}
