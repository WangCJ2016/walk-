import { Component } from '@angular/core';
import getDaysInMonth from 'date-fns/get_days_in_month'
import startOfMonth from 'date-fns/start_of_month'
import subMonths from 'date-fns/sub_months'
import getISOYear from 'date-fns/get_iso_year'
import getMonth from 'date-fns/get_month'
import getDay from 'date-fns/get_day'
import lastDayOfMonth from 'date-fns/last_day_of_month'
/**
 * Generated class for the DatePickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'date-picker',
  templateUrl: 'date-picker.html'
})
export class DatePickerComponent {

  fenzuArray = [];

  constructor() {
    this.initalMonth()
  }
  initalMonth(){    
      const num = getDaysInMonth(new Date()) // 当前月的天数
      const firstDay = startOfMonth(new Date())
      const firstDayofWeek = getDay(firstDay)
      const lastDay = lastDayOfMonth(new Date())
      const lastDayofWeek = getDay(lastDay)
      let preO = []
      let next0 = []
      let month = []
      for(let i = 0;i<firstDayofWeek;i++){
        preO.push(0)
      }
      for(let i = 0;i<6-lastDayofWeek;i++){
        next0.push(0)
      }
      for(let i = 0;i<num;i++){
        month.push(i+1)
      }
      const monthArray = [...preO,...month,...next0]
      
      for(let i=0;i<monthArray.length;i+=7){
        this.fenzuArray.push(monthArray.slice(i,i+7))
      }
      console.log(this.fenzuArray)
  }

}
