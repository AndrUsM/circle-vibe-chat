import { formatDate } from "date-fns";
import { enGB } from "date-fns/locale";

enum FormatDateTime {
  DATE_TIME = "Pp",
  TIME_LONG = "p",
}

export const useFormatDatetime = () => {
  return (
    date: Date | number,
    format: FormatDateTime = FormatDateTime.DATE_TIME
  ) =>
    formatDate(date, format, {
      locale: enGB,
    });
};
