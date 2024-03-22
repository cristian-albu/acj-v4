export function getFirstFocusableElement(
  node: HTMLElement | null
): HTMLElement | null {
  if (!node) return null;
  const elements = node.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  return elements[0] || null;
}

export function getLastFocusableElement(
  node: HTMLElement | null
): HTMLElement | null {
  if (!node) return null;
  const elements = node.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  return elements[elements.length - 1] || null;
}

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/**
 * Generate a list of dates for a given month
 */
export function generateDateList(date: Date, from?: number, to?: number) {
  if (from && to && from > to) {
    throw new Error("from should be less than to");
  }

  if (from && from < 0) {
    throw new Error("from should be greater than 0");
  }

  if (to && to > 31) {
    throw new Error("to should be less than 32");
  }
  const dates = [];
  const baseDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const currDate = new Date(baseDate);

  let i = from || 0;

  currDate.setDate(baseDate.getDate() + i);
  while (currDate.getMonth() === baseDate.getMonth() && i < (to || 31)) {
    i++;
    dates.push(new Date(currDate));
    currDate.setDate(baseDate.getDate() + i);
  }

  return dates;
}

/**
 * Build a list of filler spaces for the previous month for easier rendering
 */
export function buildFiller(monthArr: Date[]) {
  const fillerArr: string[] = [];
  const prevFillerFirstDay = monthArr[0].getDay();
  const prevFillerMaxIndex =
    prevFillerFirstDay - 1 >= 0
      ? prevFillerFirstDay - 1
      : 6 - prevFillerFirstDay;

  for (let i = 0; i < prevFillerMaxIndex; i++) {
    fillerArr.push(i.toString());
  }

  return fillerArr;
}

/**
 * Get the name of the month
 */
export function getMonthName(date: Date) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return monthNames[date.getMonth()];
}

export type T_MonthObject = {
  index: number;
  year: number;
  monthName: string;
  monthDates: Date[];
  monthFiller: string[];
};

/**
 * Generates an array of month objects for a specified number of months.
 * Each month object contains details such as the year, month name, dates, and fillers.
 */
export const buildsMonths = (months: number): T_MonthObject[] => {
  const monthArr: T_MonthObject[] = [];
  const day = new Date();

  for (let i = 0, j = 1; i < months; i++, j++) {
    const monthDates = generateDateList(day);
    monthArr.push({
      index: i,
      year: day.getFullYear(),
      monthName: getMonthName(monthDates[0]),
      monthDates: monthDates,
      monthFiller: buildFiller(monthDates),
    });

    if (j % 12 === 0) {
      day.setFullYear(day.getFullYear() + 1);
      j = 1;
    } else {
      day.setMonth(day.getMonth() + 1);
    }
  }
  return monthArr;
};
