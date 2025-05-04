import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone:true,
  imports: [RouterModule,HttpClientModule],
})
export class AppComponent implements OnInit {
  title = 'angular';
  navigationHeader:{headerName:string,url:string}[]=[];
  private httpClient=inject(HttpClient);
  ngOnInit(): void {
    this.httpClient.get("/assets/header.json").subscribe((data:any)=>{
      this.navigationHeader=data.headers.map((header:any)=>{
        return {
          headerName:header,
          url:`/${header.toLowerCase().replace(/\s+/g,'_')}`
        }
      })
    })
  }
}
