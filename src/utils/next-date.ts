import { DateTime } from "luxon";

export const plusDay = (number: number) => {
    const startDate = DateTime.fromJSDate(
        new Date(),
    ).setZone('local');
    return startDate.plus({days: number}).toJSDate();
};

export const nextDate = (backendAttempts: number, answerAttempts: number) => {
    if (backendAttempts < 3 && answerAttempts === 0) return plusDay(3);
    else if (answerAttempts === 2) return plusDay(2);
    else if (backendAttempts >= 3 && answerAttempts >= 1) return plusDay(1);

    return plusDay(2);
}