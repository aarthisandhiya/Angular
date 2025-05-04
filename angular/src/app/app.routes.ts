import { Routes } from '@angular/router';
export const routes:Routes=[
    // {
    //     path:'',loadComponent:()=>import('./app.component').then(m=>m.AppComponent)
    // },
    {
        path:'inputbox', loadComponent:()=>import('./input-box/input-box.component').then(m=>m.InputBoxComponent)
    },
    {
        path:'date_picker', loadComponent:()=>import('./date-picker/date-picker.component').then(m=>m.DatePickerComponent)
    },
    {
        path:'table', loadComponent:()=>import('./table/table.component').then(m=>m.TableComponent)
    }
];