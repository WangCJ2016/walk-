import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { App } from 'ionic-angular'
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as actions from '../actions/team.action'
import { Store } from '@ngrx/store'
import * as fromRoot from '../reducer'
import { TeamServiceProvider, ToastSitutionProvider } from '../providers'

@Injectable()
export class TeamEffects {
   // 获取termlist
   @Effect()
   teamlist$: Observable<Action> = this.actions$
   .ofType(actions.ActionTypes.LOAD)
   .map(toPayload)
   .withLatestFrom(this.store$.select(store=>store.auth.auth))
   .switchMap(([_,auth])=>this.teamService.getTeamlist(auth.id,auth.token))
   .map(res => {
       if(res.success) {
           const teamArr = res.dataObject.map(team=>({...team.team, empId: team.id}))
           return new actions.LoadSuccessAction(teamArr)
       }else {
           this.toast.message(res.msg)
           return new actions.AuthFailAction({
               msg: res.msg
           })
       }
   })
   // 设置team
   @Effect()
   setdefault$: Observable<Action> = this.actions$
   .ofType(actions.ActionTypes.SETDEFAULT)
   .map(toPayload)
   .withLatestFrom(this.store$.select(store=>store.auth.auth))
   .switchMap(([empId, auth])=>this.teamService.setDefaultTeam(auth.id,auth.token,empId.empId))
   .map(res => {
    if(res.success) {
        this.toast.message('设置成功')
        this.appCtrl.getRootNav().goToRoot({animate:true,direction:'forward'})
        return new actions.SetdefaultSuccessAction(res.dataObject)
    }else {
        return new actions.AuthFailAction({
            msg: res.msg
        })
    }
 })


  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private teamService: TeamServiceProvider,
    private toast: ToastSitutionProvider,
    private appCtrl: App
  ) {}
}