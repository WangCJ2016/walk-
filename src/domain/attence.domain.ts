export interface attence {
  attenceInview?: string,
  attenceRecordList?: Array<attenceRecordList>
  attencePeople?: attencePeople
}
export interface attenceRecordList{
  type?: string
  trueAddress?: string
  clockTime?:string
  pictures?: Array<string>
}
export interface attencePeople {
  notIn?: notIn,
  isIn?: isIn
}

interface notIn {
  notInCount?:string
  notInList?:Array<attencePerson>
}
interface isIn {
  isInCount?:string
  isInList?:Array<attencePerson>
}
interface attencePerson {
  status?:string
  name?:string
  head?:string
}