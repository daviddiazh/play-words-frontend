import { DateTime } from 'luxon';

export const currentDate = DateTime.now().toUTC().toJSDate();