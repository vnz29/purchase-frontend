import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PurchaseType } from "@/types/user";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import { formatDate } from "@/util/formatDate";
import ViewDialog from "./ViewDialog";

type PurchaseListProps = {
  datas: PurchaseType[] | undefined;
  type: string;
};

export function TableDemo({ datas, type }: PurchaseListProps) {
  console.log(datas);
  const totalAmount = datas?.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Table className="table-auto w-full">
      <TableCaption>A list of your recent purchases.</TableCaption>
      <TableHeader>
        <TableRow>
          {type === "history" && <TableHead>Date</TableHead>}
          <TableHead>Purchase</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {datas?.map((data) => (
          <TableRow key={data._id}>
            {type === "history" && (
              <TableCell className="py-4">
                {formatDate(data.createdAt)}
              </TableCell>
            )}
            <TableCell className="py-4">{data.name}</TableCell>
            <TableCell className="text-right py-4">{data.amount}</TableCell>
            <TableCell className="py-4">
              {type === "home" ? (
                <div className="flex float-right gap-2">
                  <EditDialog
                    name={data.name}
                    amount={data.amount}
                    id={data._id}
                  />
                  <DeleteDialog purchaseID={data._id} />
                </div>
              ) : (
                <ViewDialog productDetails={data} />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          {type === "history" && <TableCell></TableCell>}

          <TableCell></TableCell>
          <TableCell className="text-right float-right">
            {totalAmount}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
