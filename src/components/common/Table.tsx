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

type PurchaseListProps = {
  datas: PurchaseType[] | undefined;
};

export function TableDemo({ datas }: PurchaseListProps) {
  console.log(datas);
  const totalAmount = datas?.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Table>
      <TableCaption>A list of your recent purchases.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Purchase</TableHead>

          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {datas?.map((data) => (
          <TableRow key={data._id}>
            <TableCell className="font-medium">{data.name}</TableCell>

            <TableCell className="text-right">{data.amount}</TableCell>
            <TableCell className="text-right">
              {" "}
              <EditDialog name={data.name} amount={data.amount} id={data._id} />
              <DeleteDialog purchaseID={data._id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right">{totalAmount}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
