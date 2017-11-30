export interface daily {
  dailyPeople?: dailyPeople
  dailyDetail?: string
}


export interface dailyPeople {
  notHandIn?: notIn,
  handIn?: isIn
}

interface notIn {
  notHandInCount?:string
  notHandInList?:Array<dailyPerson>
}
interface isIn {
  handInCount?:string
  handInList?:Array<dailyPerson>
}
interface dailyPerson {
  empId?:string
  status?:string
  name?:string
  head?:string
}