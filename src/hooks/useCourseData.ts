import { useMemo } from "react";
import courseData from "../data/course.json";
import { type Day } from "../types/course";

export const useCourseData = () => {
  const allDays = useMemo(() => {
    const days: Day[] = [];
    courseData.weeks.forEach((week) => {
      week.days.forEach((day) => {
        days.push(day as Day);
      });
    });
    return days;
  }, []);

  const getDayByNumber = (dayNumber: number): Day | undefined => {
    return allDays.find((day) => day.day === dayNumber);
  };

  return {
    courseData,
    allDays,
    getDayByNumber,
  };
};
