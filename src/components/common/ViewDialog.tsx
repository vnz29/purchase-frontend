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

import { Label } from "@/components/ui/label";

import { PurchaseType } from "@/types/user";

import { View } from "lucide-react";

import { formatTime } from "@/util/formatDate";
type ViewDialogProps = {
  productDetails: PurchaseType;
};

function ViewDialog({ productDetails }: ViewDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <View className="float-right" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
          <DialogDescription>Information of the product.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex gap-1 ">
            <Label htmlFor="amount" className="text-right">
              Date:
            </Label>
            <p>{formatTime(new Date(productDetails.createdAt))}</p>
          </div>
          <div className="flex gap-1 ">
            <Label htmlFor="amount" className="text-right">
              Name:
            </Label>
            <p>{productDetails.name}</p>
          </div>
          <div className="flex gap-1 ">
            <Label htmlFor="amount" className="text-right">
              Amount:
            </Label>
            <p> ₱ {productDetails.amount}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewDialog;
