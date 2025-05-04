import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{
private httpClient=inject(HttpClient);
tableData:any=[];
ngOnInit():void{
  this.httpClient.get('/assets/tabledata.json').subscribe((data:any)=>{
    this.tableData=data;
    console.log("tabledata", this.tableData)
  })
}
}
