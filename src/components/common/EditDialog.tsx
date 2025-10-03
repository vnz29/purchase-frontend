import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { EditType } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FilePenLine } from "lucide-react";
import { updatePurchase } from "@/api/purchase";
import { toast } from "sonner";

function EditDialog({ name, amount, id }: EditType) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: name,
    amount: amount,
    id: id,
  });
  const mutation = useMutation({
    mutationFn: (formData: EditType) => updatePurchase(formData),
    onSuccess: (data) => {
      toast.success(data?.message);
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["current-purchases"] });
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    mutation.mutate(formData);
  };
  console.log(formData);
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setFormData({ name: name, amount: amount, id: id });
        }
      }}
    >
      <DialogTrigger asChild>
        <FilePenLine />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              name="name"
              id="name"
              onChange={handleChange}
              value={formData.name}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              name="amount"
              onChange={handleChange}
              value={formData.amount}
              type="number"
              inputMode="numeric"
              pattern="\d*"
              className="col-span-3"
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onSubmit}>
            {mutation.isPending ? "Loading" : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditDialog;
