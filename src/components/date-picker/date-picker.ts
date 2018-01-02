import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { Slides } from 'ionic-angular';
import getDaysInMonth from 'date-fns/get_days_in_month'
import startOfMonth from 'date-fns/start_of_month'
import getDay from 'date-fns/get_day'
import lastDayOfMonth from 'date-fns/last_day_of_month'
import getYear from 'date-fns/get_year'
import getMonth from 'date-fns/get_month'
import getDate from 'date-fns/get_date'


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
  isFuture: boolean = false
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
      this.isFuture = false
      console.log(year_month)
      // 判断是否是将来事
      if(year_month.split('-')[0]>getYear(new Date())) {
        this.isFuture = true
      }
      if(year_month.split('-')[0]==getYear(new Date())&&year_month.split('-')[1]>getMonth(new Date()) + 1) {
        this.isFuture = true
      }
      // 判断是否是今天
      console.log(getMonth(new Date()))
      if(year_month == getYear(new Date())+'-'+(getMonth(new Date()) + 1)) {
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
       
        preO.push({day:0})
      }
      for(let i = 0;i<6-lastDayofWeek;i++){
        next0.push({day:0})
      }
      for(let i = 0;i<num;i++){
          month.push({day:i+1})
      }
      const monthArray = [...preO,...month,...next0]
      
      for(let i=0;i<monthArray.length;i+=7){
        this.fenzuArray.push(monthArray.slice(i,i+7))
      }
      for(let i=0;i<this.fenzuArray.length;i++){
        for(let j=0;j<this.fenzuArray[i].length;j++) {
          if(this.fenzuArray[i][j].day===this.selectDay){
            this.activeIndex = i

          }
        }
      }
      if(this.isToday) {
        for(let i=0;i<this.fenzuArray.length;i++){
          for(let j=0;j<this.fenzuArray[i].length;j++) {
            if(this.fenzuArray[i][j].day===getDate(new Date())){
              this.fenzuArray[i][j].today = true
            } 
            if(this.fenzuArray[i][j].day>getDate(new Date())){
              this.fenzuArray[i][j].disabled = true
            } 
          }  
      }
      }
      if(this.isFuture) {
        for(let i=0;i<this.fenzuArray.length;i++){
          for(let j=0;j<this.fenzuArray[i].length;j++) {
            this.fenzuArray[i][j].disabled = true
          }  
        }
      }
      console.log(this.fenzuArray)
  }
  dayChoose(index: number,day) {
    if(!day.disabled) {
      this.activeIndex = index
      this.selectDay = day.day
      this.dateEmit.emit(this.selectYear+'-'+this.selectMonth+'-'+this.selectDay)
    }
  }
  pre() {
    if(this.selectMonth-1<=0){
      this.selectMonth = 12
      this.selectYear--
    }else{
      this.selectMonth--
    }
    //const gaozaoMonth = this.selectMonth < 10 ?  '0'+this.selectMonth: this.selectMonth
    this.selectSlideIndex = -1
    this.activeIndex = -1
    this.selectDay = 0
    this.initalMonth(this.selectYear+'-'+this.selectMonth)
    this.slides.slideTo(0,0)
  }
  next() {
    
    if(this.selectMonth+1>12){
      this.selectMonth=1
      this.selectYear++
    }else{
      this.selectMonth++
    }
    //const gaozaoMonth = this.selectMonth < 10 ?  '0'+this.selectMonth: this.selectMonth
    this.selectSlideIndex = -1
    this.activeIndex = -1
    this.selectDay = 1
    this.initalMonth(this.selectYear+'-'+this.selectMonth)
    this.slides.slideTo(0,0)
  }
}
