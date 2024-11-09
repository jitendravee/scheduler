import React, { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "./Input";

interface ScheduleModel {
  day?: Date;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

interface SumitScheduleModelProps {
  day?: Date;
}

export const SumitScheduleModel: React.FC<SumitScheduleModelProps> = ({
  day,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const schedule: ScheduleModel = {
      day,
      title,
      description,
      startTime,
      endTime,
    };

    // Print the model
    console.log(schedule);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
      <Input
        label="Title"
        title="Enter the event title"
        placeholder="Event Title"
        type="text"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        required
      />
      <Input
        label="Description"
        title="Enter the event description"
        placeholder="Event Description"
        type="text"
        value={description}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
        required
      />
      <Input
        label="Start Time"
        title="Select start time"
        type="time"
        value={startTime}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setStartTime(e.target.value)
        }
        required
      />
      <Input
        label="End Time"
        title="Select end time"
        type="time"
        value={endTime}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEndTime(e.target.value)
        }
        required
      />
      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Submit
      </button>
    </form>
  );
};
