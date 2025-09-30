import { getPurchases } from "@/api/purchase";
import { TableDemo } from "@/components/common/Table";
import { Button } from "@/components/ui/button";
import { useCurrentMonthRange } from "@/hooks/useCurrentMonthRange";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function History() {
  const [date, setDate] = useState<Date | null>(null);
  const { fromDate, toDate, resetDates, setFromDate, setToDate } =
    useCurrentMonthRange();
  console.log(fromDate, "fromdate");
  console.log(toDate, "todate");
  const { data, refetch } = useQuery({
    queryKey: ["purchases"],
    queryFn: () => getPurchases({ fromDate, toDate }),
    enabled: Boolean(fromDate && toDate),
  });

  return (
    <div className="p-6">
      <div className="flex gap-2 justify-end">
        <DatePicker
          selected={fromDate ? new Date(fromDate) : null}
          onChange={(date) =>
            setFromDate(date ? date.toISOString().split("T")[0] : "")
          }
          className="border px-2 py-1 rounded-md"
          placeholderText="Pick a date"
        />
        <DatePicker
          selected={toDate ? new Date(toDate) : null}
          onChange={(date) =>
            setToDate(date ? date.toISOString().split("T")[0] : "")
          }
          className="border px-2 py-1 rounded-md"
          placeholderText="Pick a date"
        />
        <Button variant="outline" onClick={() => refetch()}>
          Search
        </Button>
        <Button variant="destructive" onClick={() => resetDates()}>
          Reset
        </Button>
      </div>
      {data && <TableDemo datas={data} type={"history"} />}
    </div>
  );
}
