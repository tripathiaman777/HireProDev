import { Button } from "@material-tailwind/react";
import { useCartStore } from "../store/cartStore";
import { useOrderStore } from "../store/orderStore";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useState } from "react";

export default function ButtonDefault() {
  const { cart } = useCartStore();
  const { order, addItem } = useOrderStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleCheckOut = (e) => {
    setIsLoading(true);
    e.preventDefault();
    addItem(cart);
    setTimeout(() => {
      navigate("/purchase");
      setIsLoading(false);
    }, 1000);
  };
  return (
    <Button className="w-[200px] flex justify-center items-center" onClick={handleCheckOut}>
      {isLoading ? <Loader/> : "Confirm Order"}
    </Button>
  );
}
