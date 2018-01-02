import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS} from '@angular/forms'
import { todayFormat, toEndDate} from '../../utils'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import * as attenceActions from '../../actions/attence.action'
/**
 * Generated class for the TimeCountFormcontrolComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'time-count-formcontrol',
  templateUrl: 'time-count-formcontrol.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeCountFormcontrolComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TimeCountFormcontrolComponent),
      multi: true
    }
  ]
})
export class TimeCountFormcontrolComponent implements ControlValueAccessor {
  private propagateChange = (_: any) => { }
  todayFormat
  day: number  = 0.5
  startDateplaceholer = new Date()
  startDate = ''
  endDate: string
  endSx: string
  time
  constructor(
   private store$: Store<fromRoot.State>
  ) {
    
    this.todayFormat = todayFormat()
    this.store$.select(store=>store.attence).subscribe(v=>{
      if(v.endDate) {
        this.endDate = v.endDate
        this.propagateChange({...this.time,endDate:v.endDate})
      }
    })
  }
  ngAfterViewInit() {
    const time = toEndDate('',this.day)
    this.time = time
    this.store$.dispatch(new attenceActions.getEndDateAction({startDate:time.startDate,apm:time.startSx=='AM'?1:2,dayCounts:time.day}))
  }
  countNum(e) {
    const time = toEndDate(this.startDate,e)
    this.day=e
   
    this.time = time
    this.store$.dispatch(new attenceActions.getEndDateAction({startDate:time.startDate,apm:time.startSx=='AM'?1:2,dayCounts:time.day}))
  }
  startDateChange(e) {
    const time = toEndDate(e,this.day)
   
    this.time = time
    this.store$.dispatch(new attenceActions.getEndDateAction({startDate:time.startDate,apm:time.startSx=='AM'?1:2,dayCounts:time.day}))
  }

  
    writeValue(obj: any): void { }
  
    registerOnChange(fn: any): void {
      this.propagateChange = fn
    }
  
    registerOnTouched() {
  
    }
    validate(c): {[key: string]: any} {
      return null
     }
}
