import { format } from 'date-fns';

export default {
  getTodayDate() {
    return format(new Date(), 'yyyy-MM-dd');
  },

  getYesterdayDate() {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    return format(today, 'yyyy-MM-dd');
  },

  firstDayOfWeekDate() {
    const today = new Date();
    const firstDay = today.setDate(today.getDate() - today.getDay());
    return format(firstDay, 'yyyy-MM-dd');
  },

  lastDayOfWeekDate() {
    const today = new Date();
    const lastDay = today.setDate(today.getDate() - today.getDay() + 6);
    return format(lastDay, 'yyyy-MM-dd');
  },
};
