import React, { useEffect } from "react";
import { useOrderStore } from "../store/orderStore";
import { useNavigate } from "react-router-dom";
import PlaceOrder from "../components/PlaceOrder";

function Purchase() {
  const { order, removeItem } = useOrderStore();
  // console.log(order.length);
  const navigate = useNavigate();
  useEffect(() => {
    if (order.length == 0) {
      navigate("/products");
    }
  }, [order]);
  const removeItemFromOrder = (id) => {
    removeItem(id);
  };
  return (
    <>
      <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr className="border-b border-slate-300 bg-slate-50">
              <th className="p-4 text-sm font-normal leading-none text-slate-500">
                Staff
              </th>
              <th className="p-4 text-sm font-normal leading-none text-slate-500">
                Name
              </th>
              <th className="p-4 text-sm font-normal leading-none text-slate-500">
                Expertise
              </th>
              <th className="p-4 text-sm font-normal leading-none text-slate-500">
                Experience (Years)
              </th>
              <th className="p-4 text-sm font-normal leading-none text-slate-500">
                Total Fees
              </th>
              <th className="p-4 text-sm font-normal leading-none text-slate-500"></th>
            </tr>
          </thead>
          <tbody>
            {order.map((item, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="p-4 border-b border-slate-200 py-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                  <p className="block font-semibold text-sm text-slate-800">
                    {item.name}
                  </p>
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                  <p className="text-sm text-slate-500">{item.category}</p>
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                  <p className="text-sm text-slate-500">{item.description}</p>
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                  <p className="text-sm text-slate-500">{item.price}</p>
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                  <button
                    type="button"
                    className="text-slate-500 hover:text-slate-700"
                    onClick={(e) => removeItemFromOrder(item._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end p-4">
          <PlaceOrder />
        </div>
      </div>
    </>
  );
}

export default Purchase;
