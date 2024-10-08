const QUERY_KEYS = {
  USER: ['user'],
  EXERCISE: {
    DEFAULT: ['exercise'],
    DATE_RANGE: (id: string) => [
      ...QUERY_KEYS.EXERCISE.DEFAULT,
      'date-range',
      id,
    ],
    LIST: () => [...QUERY_KEYS.EXERCISE.DEFAULT, 'list'],
    DETAIL: (id: string) => [...QUERY_KEYS.EXERCISE.DEFAULT, 'detail', id],
  },
  WATER: {
    DEFAULT: ['water'],
    LIST: () => [...QUERY_KEYS.WATER.DEFAULT, 'list'],
  },
};
export default QUERY_KEYS;
