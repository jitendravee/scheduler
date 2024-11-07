import EventCalendar from "./EventCalender";
import { addDays, subDays } from "date-fns";

export const Calender = () => {
  return (
    <div>
      <EventCalendar
        events={[
          { date: subDays(new Date(), 6), title: "Post video" },
          { date: subDays(new Date(), 1), title: "Edit video" },
          { date: addDays(new Date(), 3), title: "Code" },
        ]}
      />
    </div>
  );
};
