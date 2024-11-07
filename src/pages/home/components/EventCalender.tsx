import clsx from "clsx";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
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
  callBackSchedulerForm: (day: Date) => void;
}

const EventCalendar = ({
  events,
  callBackSchedulerForm,
}: EventCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const startingDayIndex = getDay(firstDayOfMonth);

  // Handle the date click
  const handleDateClick = (day: Date) => {
    console.log(`Date clicked: ${format(day, "yyyy-MM-dd")}`);
    callBackSchedulerForm(day);
  };

  // Group events by date
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

  // Handle previous and next month
  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4 gap-2">
        <h2 className="text-center text-lg text-calender-300 font-bold mr-5 ">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <div onClick={handlePreviousMonth} style={{ color: "orange" }}>
          <FaArrowLeft />
        </div>

        <FaArrowRight onClick={handleNextMonth} style={{ color: "orange" }} />
      </div>

      <div className="grid grid-cols-7 gap-2 p-8 w-full">
        {WEEKDAYS.map((day) => (
          <div key={day} className="font-bold text-calender-300 text-center">
            {day}
          </div>
        ))}

        {/* Empty spaces before the first day of the month */}
        {Array.from({ length: startingDayIndex }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="border rounded-md bg-calender-100"
          />
        ))}

        {/* Date grid */}
        {daysInMonth.map((day, index) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const todaysEvents = eventsByDate[dateKey] || [];

          return (
            <div
              key={index}
              onClick={() => handleDateClick(day)} // Pass the day
              className={clsx(
                "border rounded-md text-calender-200 text-center bg-calender-100",
                "flex flex-col items-center justify-center",
                "aspect-square", // This ensures square shape
                "cursor-pointer" // Make the cell clickable
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
