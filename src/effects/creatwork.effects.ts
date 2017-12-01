import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Store } from '@ngrx/store'
import { App } from 'ionic-angular'
import { Actions, Effect, toPayload } from '@ngrx/effects';
import * as actions from '../actions/creatework.action'
import * as fromRoot from '../reducer'
import { CreatworkServiceProvider } from '../providers'
import { ToastSitutionProvider } from '../providers'
@Injectable()
export class CreatWorkEffects {
  // 创建周计划
  @Effect() creatplanez$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.PLANZSUBMIT)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.addPlanWeek(auth.id, auth.token, auth.emp.teamId, auth.emp.deptId,auth.emp.id,info))
  .map(res => {
    console.log(res)
    if(res.success) {
      this.app.getRootNav().push('ShiwuDetailPage',{planWeekId: res.dataObject})
      return new actions.planzsubmitSuccessAction({})
  }
  })
  // 获取工作详情
  @Effect() getworkdetail$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.GETWORKDETAIL)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.getWorkDetail(auth.id, auth.token, auth.emp.teamId,info))
  .map(res => {
    console.log(res)
    if(res.success) {
      const data = {
        name: res.dataObject.name?res.dataObject.name:'',
        remark: res.dataObject.remark?res.dataObject.remark:'',
        mainPerson: res.dataObject.mainPerson?res.dataObject.mainPerson:'',
        startDate: res.dataObject.startDate?res.dataObject.startDate:'',
        endDate: res.dataObject.endDate?res.dataObject.endDate:'',
        attach:res.dataObject.attach?res.dataObject.attach:'',
        progress:res.dataObject.progress?res.dataObject.progress:'',
        status:res.dataObject.status?res.dataObject.status:'',
        finishDate:res.dataObject.finishDate?res.dataObject.finishDate:'',
        mainPersonEmp:{
          name:res.dataObject.mainPersonEmp?res.dataObject.mainPersonEmp.name:'',
          head:res.dataObject.mainPersonEmp.photo?res.dataObject.mainPersonEmp.photo:'',
        },
        surplusDays:res.dataObject.name?res.dataObject.name:'',
      }
      return new actions.getWorkDetailSuccessAction(data)
  }
  })

  // 修改计划
  @Effect() updateplanez$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.UPDATE)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.update(auth.id, auth.token, auth.emp.teamId, auth.emp.deptId,auth.emp.id,info))
  .map(res => {
    console.log(res)
    if(res.success) {
      this.toast.message('已提交审核')
      return new actions.updateSuccessAction({})
  }
  })
  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private app: App,
    private creatworkSerice: CreatworkServiceProvider,
    private toast: ToastSitutionProvider
  ) {}
}