class Tools {

  static getIso8601z(options = {}) {
    const date = 'date' in options ? options.date : new Date()
    const onlyDate = 'onlyDate' in options ? options.onlyDate : false

    // timezone part
    const timezoneOffsetMin = date.getTimezoneOffset()
    let offsetHours = parseInt(Math.abs(timezoneOffsetMin / 60))
    let offsetMinutes = Math.abs(timezoneOffsetMin % 60)
    let timezoneStandard = null
  
    if(offsetHours < 10) {
      offsetHours = `0${offsetHours}`
    }
  
    if(offsetMinutes < 10) {
      offsetMinutes = `0${offsetMinutes}`
    }
  
    // Add an opposite sign to the offset
    // If offset is 0, it means timezone is UTC
    if(timezoneOffsetMin < 0) {
      timezoneStandard = `+${offsetHours}:${offsetMinutes}`
    } else if(timezoneOffsetMin > 0) {
      timezoneStandard = `-${offsetHours}:${offsetMinutes}`
    } else if(timezoneOffsetMin === 0) {
      timezoneStandard = 'Z'
    }
  
    // date part
    let currentDate = date.getDate()
    let currentMonth = date.getMonth() + 1
    let currentYear = date.getFullYear()
    let currentHours = date.getHours()
    let currentMinutes = date.getMinutes()
    let currentSeconds = date.getSeconds()
    let currentDatetime = null
  
    // Add 0 before date, month, hrs, mins or secs if they are less than 0
    currentDate = currentDate < 10 ? `0${currentDate}` : currentDate;
    currentMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
    currentHours = currentHours < 10 ? `0${currentHours}` : currentHours;
    currentMinutes = currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;
    currentSeconds = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;
  
    // Current datetime
    // String such as 2016-07-16T19:20:30
    currentDatetime = `${currentYear}-${currentMonth}-${currentDate}T${currentHours}:${currentMinutes}:${currentSeconds}`
  
    if (onlyDate) {
      return `${currentYear}-${currentMonth}-${currentDate}`
    }
    
    return `${currentDatetime}${timezoneStandard}`
  }
}

export default Tools