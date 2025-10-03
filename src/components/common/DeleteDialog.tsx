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
import { useState } from "react";
import { toast } from "sonner";
type deleteListProps = {
  purchaseID: string;
};

function DeleteDialog({ purchaseID }: deleteListProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: (id: string) => deletePurchase(id),
    onSuccess: (data) => {
      toast.success(data?.message);
      setOpen(false);

      queryClient.invalidateQueries({ queryKey: ["current-purchases"] });
    },
  });
  const deleteSpecificPurchase = (id: string): void => {
    mutation.mutate(id);
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
      }}
    >
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
            onClick={() => deleteSpecificPurchase(purchaseID)}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default DeleteDialog;
