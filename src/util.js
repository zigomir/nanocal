const isCurrentMonth = (day, month) => day.month.month === month;
const isWeekend = (day) => day.dayInWeek === 6 || day.dayInWeek === 0;
const isToday = (day, today) => day.dayInMonth === today.getDate() &&
    day.month.month === today.getMonth() + 1 &&
    day.month.year === today.getFullYear();
export const isSelected = (weekDay, { day, year, month }) => day === weekDay.dayInMonth &&
    month === weekDay.month.month &&
    year === weekDay.month.year;
export const dayClass = (selectedDay, weekDay, month, disableOnDay) => {
    const classes = ['day'];
    if (isWeekend(weekDay)) {
        classes.push('weekend');
    }
    if (isToday(weekDay, new Date())) {
        classes.push('today');
    }
    classes.push(isCurrentMonth(weekDay, month) ? 'current-month' : 'other-month');
    if (selectedDay && isSelected(weekDay, selectedDay)) {
        classes.push('selected');
    }
    if (disableOnDay &&
        disableOnDay(new Date(weekDay.month.year, weekDay.month.month - 1, weekDay.dayInMonth).getTime())) {
        classes.push('disabled');
    }
    return classes;
};
export const weekClass = (week, month) => {
    return week.every(weekDay => !isCurrentMonth(weekDay, month))
        ? ['week', 'other-month']
        : ['week'];
};
export const monthName = (year, month, locale = 'en-US') => new Date(year, month - 1).toLocaleString(locale, { month: 'long' }); // must not use UTC here
export const dayNames = (startOfTheWeek, locale = 'en-US') => {
    const days = [...Array(7).keys()].map(d => new Date(2017, 9, d + 1) // must not use UTC here
        .toLocaleString(locale, { weekday: 'long' })
        .slice(0, 2));
    for (let i = 6; i > 6 - startOfTheWeek; i--) {
        const day = days.shift();
        if (day) {
            days.push(day);
        }
    }
    return days;
};
