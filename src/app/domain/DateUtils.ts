export class DateUtils {

  static calculateAge(date: Date): number {
    const timeDiff = Math.abs(Date.now() - date.getTime());
    // Used Math.floor instead of Math.ceil
    // so 26 years and 140 days would be considered as 26, not 27.
    return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
  }
}
