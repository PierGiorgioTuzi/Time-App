import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  /**
  * 
  * Transform a hour string (ex. 15:30) in Date
  *
  * @param hour string of hour (ex. 14:55)
  * @param splitType character of split hour and minutes. Default is ':'
  * @param dayHour if you want the hour in a Date. Default is new Date()
  *
  * @return Date of hour
  */
   hourFromStringToDate(hour: string,splitType: string = ':', dayHour: Date = new Date()): Date {
     const hourMinutes = hour.split(splitType, 2);
     let onlyHour = hourMinutes[0];
     const onlyMinutes = hourMinutes[1];
     dayHour.setHours(Number(onlyHour))
     dayHour.setMinutes(Number(onlyMinutes));
     dayHour.setSeconds(0)
     dayHour.setMilliseconds(0);
     return dayHour
   }
    /**
    * 
    * Taking a date and a hour return the date with hours and
    * a Date for a hour
    *
    * @param date date 
    * @param hour string of hour
    * @param split character of split hour and minutes. Default is :
    *
    * @return Object of date and hour in Date Format
    */
   setDateHourToDate(date: Date, hour: string, split: string = ':'): any {
     const hourDate = this.hourFromStringToDate(hour, split, date)
     const allDate = {
       date: date,
       hour: hourDate
     }
     return allDate;
   }
       /**
    * 
    * Taking a date and a hour return the date with hours and
    * a Date for a hour
    *
    * @param date date 
    * @param hour string of hour
    * @param split character of split hour and minutes. Default is :
    *
    * @return Object of date and hour in Date Format
    */
    setDateHourToDateOnlyDate(date: Date, hour: string, split: string = ':'): any {
      const hourDate = this.hourFromStringToDate(hour, split, date)
      const allDate = {
        date: date,
        hour: hourDate
      }
      return allDate;
    }
    /**
    * 
    * Taking a date and a hour return the date with hours and
    * a Date for a hour
    *
    * @param date date to transform in string
    * @param split separator in Date. Default '-'
    * @param format format of Date. Default 'dd/MM/yyyy'
    *
    * @return String of Date
    */
   fromDateToString(date: Date, split: string = '-', format: string = 'dd/MM/yyyy'): string {
     let day = String(date.getDate())
     let month = String(date.getMonth() + 1)
     if (day.length === 1) {
       day = '0' + day;
     }
     if (month.length === 1) {
      month = '0' + month;
    }
     const year = date.getFullYear()
     let dateString = ''
     switch (format) {
       case 'dd/MM/yyyy':
         dateString = day + split + month + split + year
         break;
       case 'MM/dd/yyyy':
        dateString = month + split + day + split + year
        break;
       default:
         break;
       case 'yyyy/MM/dd':
        dateString =  year + split + month + split + day 
        break;  
     }
     return dateString;
   }


  /**
  * 
  * Transform a hour string (ex. 15:30) in Date
  *
  * @param hour Date of hour (ex. 14:55)
  * @param splitType character of split hour and minutes. Default is :
  *
  * @return String of hour and minutes 
  */
   hourFromDateToString(hour: Date,splitType: string = ':'): string {
    let hours = String(hour.getHours())
    if (hours.length === 1) {
      hours = '0' + hours
    }
    let minutes = String(hour.getMinutes())
    if (minutes.length === 1) {
      minutes = '0' + minutes
    }
    return hours + splitType + minutes;
  }

 /**
  * 
  * Transform a Date in a string day/month
  *
  * @param hour Date 
  *
  * @return String of day/month 
  */
  fromDateToDayMonthString(date: Date): string {
    const stringDate = date
    let day = String(stringDate.getDate())
    if (day.length === 1) {
      day = '0' + day
    }
    let month = String(stringDate.getMonth() + 1)
    if (month.length === 1) {
      month = '0' + month
    }
    return day + '/' + month
  }


 /**
  * 
  * Transform a Dates array in a array of day/month
  *
  * @param Date Array of Dates 
  *
  * @return Array of string day/month 
  */
  fromDateToDayMonthStringArray(date: Date[]): string[] {
    const stringDate = date
    const returnArray = []
    stringDate.forEach(e => {
      let day = String(e.getDate())
      if (day.length === 1) {
        day = '0' + day
      }
      let month = String(e.getMonth()  + 1)
      if (month.length === 1) {
        month = '0' + month
      }
      const element = day + '/' + month
      returnArray.push(element)
    })
    return returnArray
  }


   /**
  * 
  * Transform a Dates array in a array of day/month/year
  *
  * @param Date Array of Dates 
  *
  * @return Array of string day/month 
  */
    fromDateToDayMonthStringArrayWithYear(date: Date[]): string[] {
      const stringDate = date
      const returnArray = []
      stringDate.forEach(e => {
        let day = String(e.getDate())
        if (day.length === 1) {
          day = '0' + day
        }
        let month = String(e.getMonth()  + 1)
        if (month.length === 1) {
          month = '0' + month
        }
        let year = String(e.getFullYear())
        const element = day + '/' + month + '/' + year
        returnArray.push(element)
      })
      return returnArray
    }


    
   /**
  * 
  * Transform a Dates array in a array of day/month/year
  *
  * @param Date Array of Dates 
  *
  * @return Array of string day/month 
  */
    fromDateToDayMonthStringWithYear(date: Date): string {
      const stringDate = date
      let returnString = ''
        let day = String(stringDate.getDate())
        if (day.length === 1) {
          day = '0' + day
        }
        let month = String(stringDate.getMonth()  + 1)
        if (month.length === 1) {
          month = '0' + month
        }
        let year = String(stringDate.getFullYear())
        returnString = day + '/' + month + '/' + year
      return returnString
    }
       /**
  * 
  * Transform a Dates array in a array of day/month/year
  *
  * @param Date Array of Dates 
  *
  * @return Array of string day/month 
  */
  fromDateToDayMonthStringWithYearSplit(date: Date, split: string = '/'): string {
    const stringDate = date
    let returnString = ''
      let day = String(stringDate.getDate())
      if (day.length === 1) {
        day = '0' + day
      }
      let month = String(stringDate.getMonth()  + 1)
      if (month.length === 1) {
        month = '0' + month
      }
      let year = String(stringDate.getFullYear())
      returnString = day + split + month + split + year
    return returnString
  }
 /**
  * 
  * Transform a Dates array in a array of nameDay day/month
  *
  * @param Date Array of Dates 
  * @param lang Lang of name days
  *
  * @return Array of string name days day/month 
  */
  fromDateToDayMonthStringArrayWithDayName(date: Date[], lang: string): string[] {
    const stringDate = date
    const returnArray = []
    stringDate.forEach(e => {
      let day = String(e.getDate())
      if (day.length === 1) {
        day = '0' + day
      }
      let month = String(e.getMonth()  + 1)
      if (month.length === 1) {
        month = '0' + month
      } 
      let days = []
      if (lang === 'it') {
        days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
      } else {
        days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      }
      const dayName = days[e.getDay()];
      const element = dayName + ' ' + day + '/' + month
      returnArray.push(element)
    })
    return returnArray
  }


   /**
  * 
  * Transform a Dates array in object of nameDay day/month
  *
  * @param Date Array of Dates 
  * @param lang Lang of name days
  *
  * @return Array of string name days day/month 
  */
    fromDateToDayMonthStringWithDayName(date: Date, lang: string): string {
      const stringDate = new Date(date)
        let day = String(stringDate.getDate())
        if (day.length === 1) {
          day = '0' + day
        }
        let month = String(stringDate.getMonth()  + 1)
        if (month.length === 1) {
          month = '0' + month
        } 
        let days = []
        if (lang === 'it') {
          days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
        } else {
          days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        }
        const dayName = days[stringDate.getDay()];
        const element = dayName + ' ' + day + '/' + month
        return element
    }







 /**
  * 
  * Generate from start Date and End Date an array of range Dates
  *
  * @param start startDate
  * @param end EndDate
  * @param weekend Boolean for add or not weekend days
  *
  * @return Array of dates from start Date to End Date 
  */
 datesArray(start, end, weekend: boolean) {
  let result = [], current = new Date(start);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  while (current <= end) {
      result.push(current) && (current = new Date(current)) && current.setDate(current.getDate() + 1);
  }
  let newArray = []
  if (!weekend) {
    result.forEach(e => {
      let d = new Date(e);
      const dayName = days[d.getDay()];
      if (dayName !== 'Sunday' && dayName !== 'Saturday') {
        newArray.push(e)
      }
    })
    return newArray
  } else {
    return result
  }
}


/**
* 
* Return a boolean true if startDate is dateStart < dateEnd
*
* @param date1start first Start Date
* @param date1end first End Date
* @param date2start second Start Date
* @param date2end second End Date
*
* @return boolean. True if range overlap or false if range not overlap
*/
  ifRangeInOtherRange(date1start: Date, date1end: Date, date2start: Date, date2end: Date) {
    return ((date1start <= date2end && date1end >= date2end) ||
      (date1start <= date2start && date1end >= date2start) ||
      (date2start <= date1end && date2end >= date1end))
  }

/**
* 
* Return a boolean true if startDate is dateStart < dateEnd
*
* @param dateStart Start Date
* @param dateEnd End Date
*
* @return boolean. True if dateStart is before dateEnd or false if dateStart is after dateEnd
*/
dateIsBeforeOtherDate(dateStart: Date, dateEnd: Date) {
  return dateStart < dateEnd;
}
/**
* 
* Return a boolean true if startDate is dateStart > dateEnd
*
* @param dateStart Start Date
* @param dateEnd End Date
*
* @return boolean. True if dateStart is after dateEnd or false if data1 is before dateEnd
*/
dateIsAfterOtherDate(dateStart: Date, dateEnd: Date) {
  return dateStart > dateEnd;
}
/**
* 
* Return a date from a datestring (Date but in string)
*
* @param date Date to trasform from string to Date
*
* @return date in Date format
*/
dateFromStringToDate(date: string): Date {
  return new Date(date)
}
/**
* 
* Return a date from a datestring dd/mm/yyyy (ex 22/01/2022 or 22-01-2022)
*
* @param date Date to trasform from string to Date
* @param split split character of date string
*
* @return date in Date format
*/
dateFromFormatstringDDMMToDate(date: string, split: string): Date {
  const splitDate: String[] = date.split(split);
  const splitNumberDate = []
   splitDate.forEach(e => {
     splitNumberDate.push(Number(e))
   })
  let newDate = new Date()
  newDate.setMonth(splitNumberDate[1] - 1)
  newDate.setFullYear(splitNumberDate[2])
  newDate.setDate(splitNumberDate[0])
  newDate.setHours(0)
  newDate.setMinutes(0)
  newDate.setSeconds(0)
  return newDate
}


/**
* 
* Return a date from a datestring mm/dd/yyyy (ex 01/22/2022 or 01-22-2022)
*
* @param date Date to trasform from string to Date
* @param split split character of date string
*
* @return date in Date format
*/
dateFromFormatstringMMDDToDate(date: string, split: string): Date {
  const splitDate: String[] = date.split(split);
  const splitNumberDate = []
   splitDate.forEach(e => {
     splitNumberDate.push(Number(e))
   })
  let newDate = new Date()
  newDate.setMonth(splitNumberDate[1] - 1)
  newDate.setFullYear(splitNumberDate[0])
  newDate.setDate(splitNumberDate[2])
  newDate.setHours(0)
  newDate.setMinutes(0)
  newDate.setSeconds(0)
  return newDate
}



getDateFromStringWithMonthWord(date: string, lang: string): Date {
  if (lang === 'it') {
    date = date.replace('gennaio', '/01/')
    date = date.replace('febbraio', '/02/')
    date = date.replace('marzo', '/03/')
    date = date.replace('aprile', '/04/')
    date = date.replace('maggio', '/05/')
    date = date.replace('giugno', '/06/')
    date = date.replace('luglio', '/07/')
    date = date.replace('agosto', '/08/')
    date = date.replace('settembre', '/09/')
    date = date.replace('ottobre', '/10/')
    date = date.replace('novembre', '/11/')
    date = date.replace('dicembre', '/12/')
  } else {
    const Date = date.split(',')
    let day = Date[0].slice(-2);
    if (day.length === 1) {
      day = '0' + day;
    }
    let month = Date[0].substring(0, Date[0].length - 2).trim()
    const year = Date[1]
    month = month.replace('January', '/01/')
    month = month.replace('February', '/02/')
    month = month.replace('March', '/03/')
    month = month.replace('April', '/04/')
    month = month.replace('May', '/05/')
    month = month.replace('June', '/06/')
    month = month.replace('July', '/07/')
    month = month.replace('August', '/08/')
    month = month.replace('September', '/09/')
    month = month.replace('October', '/10/')
    month = month.replace('November', '/11/')
    month = month.replace('November', '/12/')
    date = day + month + year
  }
  return this.dateFromFormatstringDDMMToDate(date.trim(),'/')
  
}



/**
* 
* Return hour of date
*
* @param date Date to keep hour 
*
* @return numbers of hours
*/
getHoursFromDate(date: Date | string, split: string = '-'): number | string  {
  if (date instanceof Date) {
    if (date.getHours().toString().length === 1 ) {
      return '0' + String(date.getHours())
    } else {
      return String(date.getHours())
    }
  } else {
    const newDate = this.dateFromFormatstringDDMMToDate(date,split)
    return newDate.getHours()
  }
}


/**
* 
* Return minutes of date
*
* @param date Date to keep minutes 
*
* @return numbers of minutes
*/
getMinutesFromDate(date: Date): number  {
  return date.getMinutes()
}

/**
* 
* Return object with hours and minutes in number of date
*
* @param date Date to keep hour and minutes
*
* @return object with hour and minutes
*/
getHoursAndMinutesFromDate(date: Date): any {
 let hour = String(date.getHours())
 if (hour.length === 1) {
   hour = '0' + hour
 } 
 let minutes = String(date.getMinutes())
 if (minutes.length === 1) {
  minutes = '0' + minutes
} 
 const hourMinutes = {
    hour: Number(hour),
    minutes: Number(minutes)
  }
  return hourMinutes
}






}
