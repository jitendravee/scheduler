import clsx from "clsx";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
  subMonths,
  addMonths,
} from "date-fns";
import { useMemo, useState } from "react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Event {
  date: Date;
  title: string;
}

interface EventCalendarProps {
  events: Event[];
}

const EventCalendar = ({ events }: EventCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const startingDayIndex = getDay(firstDayOfMonth);

  const eventsByDate = useMemo(() => {
    return events.reduce((acc: { [key: string]: Event[] }, event) => {
      const dateKey = format(event.date, "yyyy-MM-dd");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {});
  }, [events]);

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4 ">
        <button
          onClick={handlePreviousMonth}
          className="px-4 py-2 bg-calender-100 rounded"
        >
          Previous
        </button>
        <h2 className="text-center text-lg font-bold">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-calender-100  rounded"
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 ">
        {WEEKDAYS.map((day) => (
          <div key={day} className="font-bold text-center">
            {day}
          </div>
        ))}
        {Array.from({ length: startingDayIndex }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="border rounded-md  text-center bg-calender-100 "
          />
        ))}
        {daysInMonth.map((day, index) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const todaysEvents = eventsByDate[dateKey] || [];
          return (
            <div
              key={index}
              className={clsx(
                "border rounded-md p-2  text-center bg-calender-100 "
              )}
            >
              {format(day, "d")}
              {todaysEvents.map((event) => (
                <div
                  key={event.title}
                  className="bg-green-500 rounded-md text-gray-900 mt-1 text-xs"
                >
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventCalendar;
