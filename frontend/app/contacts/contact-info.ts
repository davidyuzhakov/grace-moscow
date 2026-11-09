export const services = [
  {
    id: 'sunday',
    title: 'Воскресное служение',
    frequency: 'Каждое воскресенье',
    description:
      'Собираемся вместе, чтобы познать как велик и благ наш Господь.',
    time: '16:00',
    weekday: 0,
  },
  {
    id: 'friday',
    title: 'Молитвенное служение',
    frequency: 'Каждую пятницу',
    description:
      'Время, когда можно остановиться после суеты и просто побыть с Богом, помолчать, помолиться.',
    time: '19:00',
    weekday: 5,
  },
] as const
