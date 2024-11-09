import EventCalendar from "./EventCalender";
import { addDays, subDays } from "date-fns";
import { SumitScheduleModel } from "./SumitScheduleModel";
import { useState } from "react";

export const Calender = () => {
  const [day, setDay] = useState<Date>();
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [modelPosition, setModelPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const schedulerShowForm = (day: Date, event: React.MouseEvent) => {
    setOpenModel(true);
    setDay(day);

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setModelPosition({
      top: rect.top + window.scrollY + 30, //
      left: rect.left + window.scrollX + 10,
    });
  };

  return (
    <div className="relative">
      {openModel && modelPosition && (
        <div
          className="absolute bg-slate-300 rounded-lg p-4 shadow-lg"
          style={{ top: modelPosition.top, left: modelPosition.left }}
        >
          <SumitScheduleModel day={day} />
          <button
            onClick={() => setOpenModel(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
      )}

      <EventCalendar
        callBackSchedulerForm={schedulerShowForm}
        events={[
          { date: subDays(new Date(), 6), title: "Post video" },
          { date: subDays(new Date(), 1), title: "Edit video" },
          { date: addDays(new Date(), 3), title: "Code" },
        ]}
      />
    </div>
  );
};
