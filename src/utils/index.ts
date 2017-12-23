import { contact } from '../domain'
import differenceInDays from 'date-fns/difference_in_days'
import getMonth from 'date-fns/get_month'
import getYear from 'date-fns/get_year'
import getDate from 'date-fns/get_date'
import addHours from 'date-fns/add_hours'
import addDays from 'date-fns/add_days'
import { getHours } from 'date-fns';
interface data {
    letter: string,
    data: Array<contact>
}
export function pySegSort(arr1) {
    var letters = "*abcdefghjklmnopqrstwxyz".split('');
    var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');
    let segs: Array<data> = []
    var curr;
    console.log(arr1)
    letters.forEach(function(item,i){
        curr = {letter: item, data:[]};
        arr1.forEach(function(item2){
            if((!zh[i-1] || zh[i-1].localeCompare(item2.name,'zh') <= 0) && item2.name.localeCompare(zh[i],'zh') == -1) {
                curr.data.push(item2);
            }
        });
        if(curr.data.length) {
            segs.push(curr)
            curr.data.sort(function(a,b){
                return a.localeCompare(b,'zh');
            });
        }
    });
    return segs;
}
// 获取随机颜色
export function getColor():string{
    const colorArray= ['#5ed14f','#36b3a4','#4da9eb','#5e97f6','#5c6bc0','#9a7ddd','#bd84cd','#b38979','#ffa200','#f2525e']
    const num = Math.floor(Math.random()*10)
    return colorArray[num]
    
  }

// 获取星期几
export function getWeekDay(num:number): string {
    switch(num) {
        case 0:{
            return '星期天'
        }
        case 1:{
            return '星期一'
        }
        case 2:{
            return '星期二'
        }
        case 3:{
            return '星期三'
        }
        case 4:{
            return '星期四'
        }
        case 5:{
            return '星期五'
        }
        case 6:{
            return '星期六'
        }
    }
}

export function toastSituation(toast) {
    return {
        fullName: function() {
            toast.create({
                message: '请填写事务名称',
                position: 'middle',
                duration: 2000
              }).present()
        }
    }
}

export function numtoarray(num: number) {
    let stars = [];
    for(let i=0; i<=num; i++) {
        stars.push('full_star')
    }
    for(let i=0; i<4-num; i++) {
        stars.push('blank_star')
    }
    return stars
}

// 计算时间差
export function distanceInTime(startTime, endTime) {
    const startDay =new Date(startTime.split('T')[0])
    const endDay =new Date(endTime.split('T')[0])
    
    const startH = startTime.split('T')[1].slice(0, -4)
    const endH = endTime.split('T')[1].slice(0, -4)
    const startSx = parseInt(startH,10)>12?0.5:0
    const endSx = parseInt(endH,10)>12?0.5:0
    const data =  {
        startDate:startTime.split('T')[0],
        startSx:startSx,
        endDate:endTime.split('T')[0],
        endSx:endSx,
        days: differenceInDays(endDay, startDay)+endSx-startSx
    }
   return data
}
// 日期转化格式
export function dayFormat(day) {
   return getYear(day)+'-'+(getMonth(day)+1)+'-'+getDate(day)
}
// 根据天数计算截止日期
export function toEndDate(starTime, day) {
    if(!starTime){
        const startDate = new Date().toISOString()
        const endTime = addDays(startDate,day)
        const time = getYear(endTime)+'-'+(getMonth(endTime)+1)+'-'+getDate(endTime)+' '+(getHours(endTime)>=12?'PM':'AM')
        return {
            startDate:  getYear(startDate)+'-'+(getMonth(startDate)+1)+'-'+getDate(startDate),
            startSx: (getHours(startDate)>=12?'PM':'AM'),
            day:day
        }
    }else{
        const startDate = new Date(starTime.slice(0,-4))
        const endTime = addDays(startDate,day)
        const time = getYear(endTime)+'-'+(getMonth(endTime)+1)+'-'+getDate(endTime)+' '+(getHours(endTime)>=12?'PM':'AM')
        return {
            startDate:  getYear(startDate)+'-'+(getMonth(startDate)+1)+'-'+getDate(startDate),
            startSx: (getHours(startDate)>=12?'PM':'AM'),
            day:day
        }
    }
}
// 返回审批类型
export function applyType(type, classify) {
    if(type == 1) {
        switch (classify) {
            case 1:
                return '事假'
            case 2:
            return '病假'
            case 3:
            return '休假'
            case 4:
            return '外勤'
            default:
                break;
        }
    }
    if(type==2) {
        switch (classify) {
            case 1:
            return '借款'
            case 2:
            return '用'
            default:
                break;
        }
    }
    if(type==3) {
        return '报销'
    }
}
// 审批状态
export function applyStatus(status: number) {
    switch (status) {
        case 1:
          return '审核中'
        case 2:
        return '关闭'
        case 3:
        return '拒绝'
        case 4:
        return '同意'
        case 5:
        return '转发'
    }
}
// 获取格式日期
export function todayFormat() {
    const min = getYear(new Date())+'-'+doublenum(getMonth(new Date())+1)+'-'+doublenum(getDate(new Date()))
    const max = (getYear(new Date())+1)+'-'+doublenum(getMonth(new Date())+1)+'-'+doublenum(getDate(new Date()))
   
    return {
        min: min,
        max: max
    }
}
function doublenum(num) {
    console.log(num)
    if(num<10) {
        return '0'+num
    }else{
        return num
    }
}
  export * from './type.util'