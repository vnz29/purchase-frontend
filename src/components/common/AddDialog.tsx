import { createPurchase } from "@/api/user";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Purchase } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function AddDialog() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    amount: 0,
  });
  const mutation = useMutation({
    mutationFn: (formData: Purchase) => createPurchase(formData),
    onSuccess: () => {
      console.log("successfully added new purchase");

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Purchase</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
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
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onSubmit}>
            {mutation.isPending ? "Loading" : "Add Purchase"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddDialog;
