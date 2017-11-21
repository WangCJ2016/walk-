import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import * as actions from '../actions/attence.action'

@Injectable()
export class AttenceEffects {
    // 设置日期
    @Effect() setday$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.SETDAY)
    .map(toPayload)
    .map(_ => {
        return new actions.SetDaySuccessAction({day: _.day})})

    // 提交签到信息
    @Effect() sign$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.SIGNIN)
    .map(toPayload)
    .map(v => new actions.SignSuccessAction(v))
    constructor(
        private actions$: Actions
    ) {}
}