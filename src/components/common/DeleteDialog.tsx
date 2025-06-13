// components/SampleDialog.tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePurchase } from "@/api/purchase";
type deleteListProps = {
  purchaseID: string;
};

function DeleteDialog({ purchaseID }: deleteListProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deletePurchase(id),
    onSuccess: () => {
      console.log("successfully updated purchase");

      queryClient.invalidateQueries({ queryKey: ["current-purchases"] });
    },
  });
  const deleteSpecificPurchase = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ): void => {
    mutation.mutate(id);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button
            variant="destructive"
            onClick={(e) => deleteSpecificPurchase(e, purchaseID)}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default DeleteDialog;
