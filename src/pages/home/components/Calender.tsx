import EventCalendar from "./EventCalender";
import { addDays, subDays } from "date-fns";

export const Calender = () => {
  const schedulerShowForm = (day: Date) => {
    console.log(day);
  };
  return (
    <div>
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
