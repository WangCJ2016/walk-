export interface Auth {
    cityId?: string
    id?: string
    name?: string
    photo?: string
    provinceId?: string
    sex?: string
    token?: string
    userName?: string
    sign?:string
    code?:string
    countIf?:boolean
    emp?:{
        deptId?: string
        id?:string
        name?: string
        photo?: string
        teamId?:string
        team?: {
            id?: string
            name?: string
        }
    }
}
export interface AuthInfo {
    userId: string
    token: string
    photo?: string
    name?: string
    sex?: string
    provinceId?: string
    cityId?: string
    colorPreference?: string
}
// 团队
export interface emp {
    teamId?:string,
    deptId?:string,
    userId?:string,
    name?:string,
    letter?:string,
    userName?:string,
    isManager?:string,
    isSystem?:string,
    isDefault?:string,
    isCreate?:string,
    status?:string,
    id?:string,
    isDelete?:string,
    creator?:string,
    modifier?:string,
    createTime?:string,
    updateTime?:string
}