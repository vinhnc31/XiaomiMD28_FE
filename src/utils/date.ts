import moment from 'moment';
import 'moment/locale/vi';

export const convertDateFromNow = (date: Date | string, locale = 'vi') => {
  return moment(date).locale(locale).fromNow();
};

export const DateFormat = 'DD/MM/YYYY';
export const TimeFormat = 'HH:mm';
