import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { useOrderStore } from "../store/orderStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function PlaceOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const { purchaseItem, order } = useOrderStore();
  const navigate = useNavigate();
  const confirmBilling = () => {
    purchaseItem(
      order,
      order.reduce((acc, item) => acc + item.price, 0)
    );
    toast.success("Order Placed Successfully");
    setTimeout(() => {
      navigate("/billing");
    }, 2000);
  };
  return (
    <Button
      className="w-[200px]  flex justify-center items-center "
      onClick={confirmBilling}
    >
      {isLoading ? <Loader /> : "Confirm Purchase and Generate Bill"}
    </Button>
  );
}

export default PlaceOrder;
