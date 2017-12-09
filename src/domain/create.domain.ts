export interface createObj {
  name?: string,
  remark?: string,
  mainPerson?: person,
  mainPersonId?:string
  initatorId?:string // 发起人ID
  startDate?: string,
  endDate?: string,
  attach?:string,
  attachName?:string
  progress?:string
  status?:string
  finishDate?:string
  year?:string
  month?:string
  empList?: any
  type?:string
  classify?:string
  days?:string
  step?:string
  reason?:string
  applyEmp?:any
  id?:string
  mainPersonEmp?:{
    name?:string,
    head?:string
  },
  surplusDays?:string
}

export interface fujian {
    selectDoc: Array<any>,
    selectCamera: Array<imageUrl>,
    selectImages: Array<imageUrl>,
}

export interface imageUrl {
  _url: string
  url: string
}

export interface person {
  name: string,
  photo?: string
}

export interface applyList {
  applyId?:string
  type?:string
  empId?:string
  step?:string
  status?:string
  applyEmp?:any
  pageNo?: number
}
// 事务流程图
export interface applyFlow {
  status:string
  emp:{
    name:string
    photo?:string
  }
  updateTime:string
}
// 子事务
export interface zishiwu {
  name: string
  remark: string
  progress:string
  surplusDays:string
}

// 事务item
export interface shiwuitem{
  id:string
  mainPersonEmp: person
  name: string
  type: string
}