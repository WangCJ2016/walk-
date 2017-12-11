import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { createObj } from '../../../domain'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/creatework.action'
import { FormGroup, FormBuilder } from '@angular/forms'
import { FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import { applyType} from '../../../utils'
import {applyFlow} from '../../../domain'
/**
 * Generated class for the ShenpiDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shenpi-detail',
  templateUrl: 'shenpi-detail.html',
})
export class ShenpiDetailPage {
  form: FormGroup
  segment = 'detail'
  params
  saturation: number = 0
  data: createObj = {}
  attach: Array<string>
  attachName: Array<string>
  applyType:string
  applyFlowList: Array<applyFlow>
  applyEmpIf: boolean = false
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder,
    private fileTranfer: FileTransfer,
    @Inject('BASE_URL') private config,
    private store$: Store<fromRoot.State>
  ) {
    console.log(JSON.stringify(this.navParams.data))
    this.params = this.navParams.data
    this.form = this.fb.group({
      remark: [''],
      attach:[''],
      applyId: [''],
      operate: [''],
      applyPerson: ['']
    })
   
  }

  ionViewDidLoad() {
    this.store$.dispatch(new actions.applyDetailAction({'applyId':this.params.id}))
    this.store$.dispatch(new actions.applyFlowAction({'applyId':this.params.id}))
    this.store$.select(store=>store.creatwork).subscribe(v=>{
      console.log(v)
      this.data = v.workdetail
      this.applyFlowList = v.applyFlow
      if(this.data){
        this.store$.select(store=>store.auth.auth).subscribe(auth=>this.applyEmpIf = this.data.applyEmp.id === auth.emp.id)
        
        this.attach = this.data.attach?this.data.attach.split(','):[]
        this.attachName = this.data.attachName?this.data.attachName.split(','):[]
        this.applyType = applyType(this.data.type, this.data.classify)
        
      }
    })
    
   
  }
  attachDel(i) {
    this.attach.splice(i,1)
  }
  close() {
    this.navCtrl.setPages([{page: 'WorkDeskPage'},{page:'MyWorkPage'}],{animate: true,direction:'back'})
  }
  operate(i) {
    this.store$.dispatch(new actions.applyUpdateAction({operate:i,'applyId':this.params.id}))
  }
  
}
