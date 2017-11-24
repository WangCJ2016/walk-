export interface createObj {
  fullName?: string,
  desc?: string,
  fujian?: fujian,
  faqiren?: person,
  zhujiangren?: person,
  canhuiren?: person,
  zhubanren? : person,
  zhixingren?: person,
  startTime?: string,
  endTime?: string,
  meetingTime?: string,
  plan_month: string
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