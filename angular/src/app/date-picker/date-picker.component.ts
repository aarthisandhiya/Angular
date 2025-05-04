import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent implements OnInit {
  dateInput: any = [];
  date = '';
  dateSelected: number = 1;
  monthInput = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  monthSelected: string = 'Jan';
  yearSelected: number = 1900;
  thirtyOne = ['Jan', 'Mar', 'May', 'Jul', 'Aug', 'Oct', 'Dec'];
  thirty = ['Apr', 'Jun', 'Sep', 'Nov'];
  twentyEight = ['Feb'];
  yearInput: any = [];
  showCalender: boolean = false;
  invalidDate:boolean=false;
  regex=new RegExp('^(0[1-9]|[12][0-9]|3[01])\/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\/\d{4}$');
  ngOnInit() {
    for (let year = 1900; year <= 2100; year++) {
      this.yearInput.push(year);
    }
    this.showdays(this.monthSelected)
  }
  showdays(value: any) {
    console.log('value', value)
    if (this.thirtyOne.includes(value)) {
      this.dateInput = Array.from({ length: 31 }, (_, index) => index + 1);
    }
    else if (this.thirty.includes(value)) {
      this.dateInput = Array.from({ length: 30 }, (_, index) => index + 1);
    }
    else {
      let date = 28;
      if (this.leapYear(this.yearSelected)) {
        date = 29;
      }
      this.dateInput = Array.from({ length: date }, (_, index) => index + 1);
    }
  }
  toggleCalender() {
    this.showCalender = !this.showCalender;
    if(this.showCalender){
      this.invalidDate=false;
    }
  }
  onSelected($event: Event, str: string) {
    if (str == 'month') {
      const eventValue = $event.target as HTMLSelectElement;
      console.log('month', eventValue.value)
      this.showdays(eventValue.value);
      this.onDateSelected(this.dateSelected);
    }
    else {
      this.onDateSelected(this.dateSelected);
    }
  }
  onDateSelected(date: number) {
    this.dateSelected = date;
    this.date = `${date}/${this.monthSelected}/${this.yearSelected}`;
    console.log("date", this.date);
  }
  leapYear(yearSelected: number) {
    if (yearSelected % 4 == 0 && yearSelected % 100 == 0) {
      return true;
    }
    return false;
  }
  yearchange(str: string) {
    if (str == 'less') {
      if (this.yearInput.includes(this.yearSelected - 1)) {
        this.yearSelected -= 1;
      }
    }
    else {
      if (this.yearInput.includes(this.yearSelected + 1)) {
        this.yearSelected += 1;
      }
    }
  }
  validation(){
    console.log("date", this.date);
    const dateSplit=this.date.split('/');
   // if(this.regex.test(this.date)){
     if((Number(dateSplit[0])>=1 && Number(dateSplit[0])<=31 )&& this.monthInput.includes(dateSplit[1]) && this.yearInput.includes(Number(dateSplit[2])) ){
      this.invalidDate=false;
     }
     else{
      this.invalidDate=true;
      this.showCalender=false;
      this.date='';
     }
    // }
    // else{
    //   this.invalidDate=true;
    //   this.showCalender=false;
    //   this.date='';
    // }
  }
}
