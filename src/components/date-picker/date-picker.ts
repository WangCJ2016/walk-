import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { Slides } from 'ionic-angular';
import getDaysInMonth from 'date-fns/get_days_in_month'
import startOfMonth from 'date-fns/start_of_month'
import getDay from 'date-fns/get_day'
import lastDayOfMonth from 'date-fns/last_day_of_month'
import getYear from 'date-fns/get_year'
import getMonth from 'date-fns/get_month'
import getDate from 'date-fns/get_date'
import { isToday } from 'date-fns';

@Component({
  selector: 'date-picker',
  templateUrl: 'date-picker.html'
})
export class DatePickerComponent {
  @ViewChild(Slides) slides: Slides;
  @Output() dateEmit = new EventEmitter<string>()
  activeIndex:number = -1
  selectDay:number
  selectMonth: number
  selectYear: number
  isToday: boolean = false
  fenzuArray = [];
  selectSlideIndex:number
  todayIndex: number
  todayActiveIndex: number
  constructor() {
    this.selectYear = getYear(new Date())
    this.selectMonth = getMonth(new Date()) + 1
    this.selectDay = getDate(new Date())
    this.initalMonth(this.selectYear +'-'+ (this.selectMonth))
  }
  
  ngAfterViewInit() {
    this.dateEmit.emit(this.selectYear+'-'+this.selectMonth+'-'+this.selectDay)
   this.slides.initialSlide=this.selectSlideIndex
  }
  initalMonth(year_month){  
      this.isToday =false 
      if(year_month === getYear(new Date())+'-'+(getMonth(new Date()) + 1)) {
        this.isToday = true
      }
      const num = getDaysInMonth(year_month) // 当前月的天数
      const firstDay = startOfMonth(year_month)
      const firstDayofWeek = getDay(firstDay)
      const lastDay = lastDayOfMonth(year_month)
      const lastDayofWeek = getDay(lastDay)
      let preO = []
      let next0 = []
      let month = []
      this.fenzuArray = [];
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
      for(let i=0;i<this.fenzuArray.length;i++){
        if(this.fenzuArray[i].indexOf(this.selectDay)>-1){
          this.selectSlideIndex = i
          this.activeIndex = this.fenzuArray[i].indexOf(this.selectDay)
        }
      }
      if(this.isToday) {
        for(let i=0;i<this.fenzuArray.length;i++){
        if(this.fenzuArray[i].indexOf(getDate(new Date()))>-1){
          this.todayIndex = i
          this.todayActiveIndex = this.fenzuArray[i].indexOf(getDate(new Date()))
          this.fenzuArray.length = i+1
          for(let j=i;j<this.fenzuArray[i].length;j++){
            if(this.fenzuArray[i][j]>getDate(new Date())) {
              this.fenzuArray[i][j] = 0
            }
          }
        }
        
      }
      }
      console.log(this.todayIndex, this.todayActiveIndex)
  }
  dayChoose(index: number,day:number) {
    this.activeIndex = index
    this.selectDay = day
    this.dateEmit.emit(this.selectYear+'-'+this.selectMonth+'-'+this.selectDay)
  }
  pre() {
    if(this.selectMonth-1<=0){
      this.selectMonth = 12
      this.selectYear--
    }else{
      this.selectMonth--
    }
    const gaozaoMonth = this.selectMonth < 10 ?  '0'+this.selectMonth: this.selectMonth
    this.selectSlideIndex = -1
    this.activeIndex = -1
    this.selectDay = 0
    this.initalMonth(this.selectYear+'-'+gaozaoMonth)
    this.slides.slideTo(0,0)
  }
  next() {
    const nowYear = getYear(new Date())
    const nowMonth = getMonth(new Date())+1
    if(this.selectYear===nowYear&&this.selectMonth+1>nowMonth){
      return
    }
    if(this.selectMonth+1>12){
      this.selectMonth=1
      this.selectYear++
    }else{
      this.selectMonth++
    }
    const gaozaoMonth = this.selectMonth < 10 ?  '0'+this.selectMonth: this.selectMonth
    this.selectSlideIndex = -1
    this.activeIndex = -1
    this.selectDay = 0
    this.initalMonth(this.selectYear+'-'+gaozaoMonth)
    this.slides.slideTo(0,0)
  }
}
