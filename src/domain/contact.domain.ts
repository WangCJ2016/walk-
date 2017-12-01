export interface contact {
    userId?:string,
    name?:string,
    letter?:string,
    userName?:string
    id?:string
   // empChooseList:
}

export interface empDetail {
    name?: string
    dept?: string
    phone?: string
}
export interface empChooseList {
    juniorList: Array<empChoosePerson>
    peersList:Array<empChoosePerson>
    superiorList: Array<empChoosePerson>
}
export interface empChoosePerson{
    name: string,
    id: string,
    head: string
}