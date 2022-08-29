
  export function round(value: number, precision:number) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  export function getCurrentPage(fetch:number, offset:number) {
    const pageSize = fetch;
    return Math.round(offset / pageSize) + 1;
  }
  
  export function formatDate(date: string | number | Date ) {
    date = new Date(date);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return year + '-' + month + '-' + day;
  }
  
  export function formatDateFrontEnd(date: string | number | Date) {
    date = new Date(date);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return day + '-' + month + '-' + year;
  }