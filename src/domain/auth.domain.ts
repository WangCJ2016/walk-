export interface Auth {
    userName?:string,
    password?:string,
    name?:string,
    sex?:string,
    provinceId?:string,
    cityId?:string,
    lastLoginTime?:string,
    token?:string,
    colorPreference?:string,
    status?:string,
    emp?: emp
    id?:string,
    countIf?:boolean
    isDelete?:string,
    creator?:string,
    modifier?:string,
    createTime?:string,
    updateTime?:string,
    sign?: string,
    code?: string,
    sign_type?: string 
    photo?: string
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