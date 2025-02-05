import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/ui/button";

const PlaceOrderAlertDialog = ({ open, setOpen, placeOrder }) => {
  const { t, i18n } = useTranslation("translation");

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
        <AlertDialog.Content className="fixed bg-background left-1/2 top-1/2 max-h-[95vh] max-w-[90%] md:w-[150vw] md:max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-md p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
          <AlertDialog.Title className="m-0 text-[17px] font-medium text-mauve12">
            {t("checkout.confirmTitle")}
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-5 mt-[15px] text-[15px] leading-normal text-mauve11">
            {t("checkout.confirmMessage")}
          </AlertDialog.Description>
          <div className="flex flex-wrap justify-end gap-[10px] md:gap-[25px]">
            <AlertDialog.Cancel asChild>
              <Button
                variant="outline"
                className="text-red-700 hover:text-red-600 hover:bg-red-100"
                onClick={() => setOpen(false)}
              >
                {t("checkout.cancel")}
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button variant="secondary" onClick={() => placeOrder("cod")}>
                {t("checkout.cod")}
              </Button>
            </AlertDialog.Action>
            <AlertDialog.Action asChild>
              <Button variant="secondary" onClick={placeOrder}>
                {t("checkout.online")}
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default PlaceOrderAlertDialog;
