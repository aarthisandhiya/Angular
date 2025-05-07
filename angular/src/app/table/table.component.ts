import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  private httpClient = inject(HttpClient);
  selectedRowCount: number = 5;
  tableData: any = [];
  offset = 0;
  currentPageIndex = 0;
  table4paginationData: any = [];
  currentSortField = '';
  hoveredHeader: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  ngOnInit(): void {
    this.httpClient.get('/assets/tabledata.json').subscribe((data: any) => {
      this.tableData = data;
      console.log("tabledata", this.tableData);
      this.onRowCountChange()
    })
  }
  onRowCountChange() {
    this.table4paginationData = [];
    let selectedRowCount = Number(this.selectedRowCount);
    let start = 0;
    let end = this.selectedRowCount - 1;
    const size = Math.ceil(this.tableData.tableData.length / selectedRowCount);
    for (let i = 0; i < size; i++) {
      this.table4paginationData.push(this.tableData.tableData.slice(start, end));
      start = start + selectedRowCount - 1;
      end = end + selectedRowCount - 1;
    }
    console.log("check", this.table4paginationData);
  }
  sortBy(header: string) {
    this.hoveredHeader = header; 
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.tableData.tableData = this.customSort(this.tableData.tableData, this.sortDirection);
  }
  // {
  //   "headers": ["Name", "Age", "Department"],
  //   "tableData": [
  //     { "values": ["Alice", "28", "Engineering Department"] },
  //     { "values": ["Bob", "34", "Marketing Division"] },
  //     { "values": ["Charlie", "25", "Human Resources"] },
  //     { "values": ["David", "30", "Sales and Distribution"] },
  //   ]
  // }

  customSort(array: any, sortDirection: string) {
    const columnIndex=this.getHeaderIndex(this.hoveredHeader);
    if (sortDirection == 'asc') {
      for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
          if (array[j].values[columnIndex] < array[i].values[columnIndex]) {
            let temp = array[j];
            array[j] = array[i];
            array[i] = temp;
          }
        }
      }
      console.log("after sort sasc", array)
    }
    else {
      for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
          if (array[j].values[columnIndex] > array[i].values[columnIndex]) {
            let temp = array[j];
            array[j] = array[i];
            array[i] = temp;
          }
        }
      }
      console.log("after sort desc", array)
    }
    return array;
  }
  getHeaderIndex(header: string): number {
    return this.tableData.headers.indexOf(header);
  }
}
