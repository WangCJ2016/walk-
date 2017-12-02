export interface createObj {
  name?: string,
  remark?: string,
  mainPerson?: person,
  startDate?: string,
  endDate?: string,
  attach?:string,
  attachName?:string
  progress?:string
  status?:string
  finishDate?:string
  year?:string
  month?:string
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
  name: string
}