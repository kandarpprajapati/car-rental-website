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
import { Button } from "@/components/ui/button";

const CarDetailsDialog = ({ title = "ABC", description = "Hello abc!" }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="secondary" className="rounded-full" size="sm">
          + Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-primary-foreground">
            Car Details
          </DialogTitle>
        </DialogHeader>
        <div className="w-full grid gap-4 py-4">
          <h3>{title}</h3>
          <p>{description}</p>
          <DialogInput label="Email" placeholder="user@example.com" />
          <DialogInput label="Username" placeholder="user01" />
        </div>
        <DialogFooter>
          <Button
            variant="secondary"
            className="text-sm shadow-md"
            type="submit"
          >
            Send Invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CarDetailsDialog;

const DialogInput = ({ label, placeholder }) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={`${label}Input`} className="text-left pl-2">
        {label}
      </Label>

      <Input
        id={`${label}Input`}
        placeholder={placeholder}
        className="col-span-3"
      />
    </div>
  );
};
