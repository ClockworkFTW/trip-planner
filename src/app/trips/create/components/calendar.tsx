"use client";

type CalendarProps = {
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
};

export default function Calendar(props: CalendarProps) {
  const { startDate, setStartDate, endDate, setEndDate } = props;

  return (
    <div>
      <label>
        <span>Start Date: </span>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <label>
        <span>End Date: </span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>
    </div>
  );
}
