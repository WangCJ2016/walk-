import { Component } from '@angular/core';
import { ViewController,NavParams } from 'ionic-angular'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import * as actions from '../../actions/contacts.action'
import {empChooseList} from '../../domain'
/**
 * Generated class for the SelectPersonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'select-person',
  templateUrl: 'select-person.html'
})
export class SelectPersonComponent {
  title = '发起人'
  empChooseList: empChooseList
  shangji_show: boolean = true
  pingji_show: boolean = true
  xiaji_show: boolean = true
  constructor(
    private viewCtrl: ViewController,
    private params: NavParams,
    private store$: Store<fromRoot.State>
  ) {
      this.title = this.params.data.title
      this.store$.dispatch(new actions.EmpChooseListAction({}))
      this.store$.select(store=>store.contacts.empChooseList).subscribe(v=>{
        if(v) {
          this.empChooseList = v
        }
      })
  }
  
  showList(type: string) {
    this[type] = ! this[type]
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  choose(person) {
    this.viewCtrl.dismiss(person);
  }
}
