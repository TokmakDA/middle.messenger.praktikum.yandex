export const getFormattedDate: (time: string) => string = (time) => {
  const currentTime = new Date();
  const lastTime = new Date(time);

  const periods = {
    days: currentTime.getDate() - lastTime.getDate(),
    weekday: currentTime.getDay() - lastTime.getDay(),
    months: currentTime.getMonth() - lastTime.getMonth(),
    years: currentTime.getFullYear() - lastTime.getFullYear(),
  };

  const daysOfTheWeek = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

  // Форматируем дату
  const formatDate: (time: Date, options: object) => string = (
    time,
    options,
  ) => {
    return time.toLocaleDateString(`ru-RU`, options).replace(/\.|( г.)/gi, '');
  };
  // Форматируем Время
  const formatTime: (time: Date) => string = (time) => {
    return time.toLocaleTimeString(`ru-RU`, {
      timeStyle: 'short',
      timeZone: 'UTC',
    });
  };

  // проверяем в период
  if (!periods.days && !periods.weekday && !periods.months && !periods.years) {
    // // Сегодня
    return formatTime(lastTime);
  } else if (
    // В течении недели
    periods.days &&
    periods.weekday == periods.days &&
    !periods.months &&
    !periods.years
  ) {
    // вурнуть день недели
    return daysOfTheWeek[lastTime.getDay()];
  } else if (periods.weekday !== periods.days && !periods.years) {
    // Вернуть дату (день и месяц)
    return formatDate(lastTime, {
      day: 'numeric',
      month: 'short',
    });
  } else if (periods.years) {
    // Вернуть дату (день, месяц, год)
    return formatDate(lastTime, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  // Вернуть полностью, если не нашли ни чего
  return formatDate(lastTime, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
