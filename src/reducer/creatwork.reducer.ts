import * as actions from '../actions/creatework.action'
import { createObj, applyList, applyFlow, zishiwu, shiwuitem, applyCollect} from '../domain'
export interface State {
     workdetail?: createObj
     applyList?: Array<applyList>
     applyFlow?: Array<applyFlow>
     applyCollect?: applyCollect
     applyTimeCount?: any
     worksfromme?: any
     zishiwu?:Array<zishiwu>
     shiwuList?: {
       pageNo: number,
       records: number,
       list: Array<shiwuitem>
     }
     workPlate?:any,
     thingCount?:any
     requireList?:Array<any>
};

export const initialState: State = {
  applyList:[],
  applyFlow:[],
  applyTimeCount:null,
  worksfromme:{pageNo:0,records:0,list:[]},
  shiwuList:{
    pageNo: 0,
    records: 0,
    list: []
  }
};

export function reducer(state = initialState, action: any ): State {
  switch (action.type) {
    case actions.ActionTypes.GETWORKDETAIL_SUCCESS: {
      return {...state,workdetail:action.payload}
    }
    case actions.ActionTypes.APPLYLIST_SUCCESS: {
      return {...state,applyList:action.payload}
    }
    case actions.ActionTypes.APPLYFLOW_SUCCESS: {
      return {...state,applyFlow:action.payload}
    } 
    case actions.ActionTypes.ZISHIWU_SUCCESS: {
      return {...state,zishiwu:action.payload}
    } 
    case actions.ActionTypes.SHIWULIST_SUCCESS: {
      let shiwuList = {pageNo:0,records:0,list:[]}
      if(action.payload.pageNo===1) {
        shiwuList.pageNo = action.payload.pageNo
        shiwuList.records = action.payload.records
        shiwuList.list = action.payload.list
      }else {
        shiwuList.pageNo = action.payload.pageNo
        shiwuList.records = action.payload.records
        shiwuList.list = [...state.shiwuList.list,...action.payload.list]
      }
      return {...state,shiwuList:shiwuList}
    } 
    case actions.ActionTypes.WORKPLATE_SUCCESS: {
      return {...state,workPlate:action.payload}
    } 
    case actions.ActionTypes.REQUIRELIST_SUCCESS: {
      return {...state,requireList:action.payload}
    } 
    case actions.ActionTypes.ADDREQUIRE_SUCCESS: {
      
      const requireList = [...action.payload,...state.requireList]
      return {...state,requireList:requireList}
    } 
    case actions.ActionTypes.THIINGCOUND_SUCCESS: {
      return {...state,thingCount:action.payload}
    } 
    case actions.ActionTypes.APPLYCOLLECT_SUCCESS: {
      return {...state,applyCollect:action.payload}
    } 
    case actions.ActionTypes.APPLYTIMECOUNT_SUCCESS:{
      return {...state,applyTimeCount:action.payload}
    }
    // workfromme
    case actions.ActionTypes.APPLYSELECTLIST_SUCCESS:{
      let worksfromme={pageNo:0,records:0,list:[]}
      worksfromme.pageNo = action.payload.pageNo
      worksfromme.records = action.payload.records
      if(action.payload.pageNo === 1) {      
        worksfromme.list = action.payload.result
      }else {
        worksfromme.list = [...state.worksfromme.list,...action.payload.result]
      }
      return {...state,worksfromme:worksfromme}
    }
    default: {
      return state;
    }
  }
}