import React, { useEffect } from "react";
import { useBillStore } from "../store/billStore";
import { useNavigate } from "react-router-dom";
import EmptyState from "../components/EmptyPage";

function formatDate(isoDateString) {
  if (!isoDateString) return "";
  const date = new Date(isoDateString);

  // Extract date components
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format date string
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function Billings() {
  const { bills, getBills } = useBillStore();
  const navigate = useNavigate();
  function downLoadReceipt(id) {
     navigate("/receipt/" + id);
  }
  useEffect(() => {
    getBills();
  }, [getBills]);
  // console.log(bills);
  if(!bills.length){
    return <EmptyState/>
  }
  return (
    <>
      <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr className="border-b border-slate-300 bg-slate-50">
              <th className="p-4 text-sm font-normal leading-none text-slate-500">
                Order Id
              </th>
              <th className="p-4 text-sm font-normal leading-none text-slate-500">
                Created At
              </th>
              <th className="p-4 text-sm font-normal leading-none text-slate-500">
                Total Amount
              </th>
              <th className="p-4 text-sm font-normal leading-none text-slate-500">
                Payable Amount (including Taxes)
              </th>
              {/* <th className="p-4 text-sm font-normal leading-none text-slate-500">
                Price per Item
              </th> */}
              <th className="p-4 text-sm font-normal leading-none text-slate-500">
                Receipt
              </th>
              <th className="p-4 text-sm font-normal leading-none text-slate-500"></th>
            </tr>
          </thead>
          <tbody>
            {bills.map((item, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="p-4 border-b border-slate-200 py-5">
                  <p className="block font-semibold text-sm text-slate-800">
                    {item._id}
                  </p>
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                  <p className="block font-semibold text-sm text-slate-800">
                    {formatDate(item.createdAt)}
                  </p>
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                  <p className="text-sm text-slate-500">{item.totalAmount}</p>
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                  <p className="text-sm text-slate-500">{item.totalPayableAmount}</p>
                </td>

                <td className="p-4 border-b border-slate-200 py-5">
                  <button
                    type="button"
                    className="text-slate-500 hover:text-slate-700"
                    onClick={(e) => downLoadReceipt(item._id)}
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
                        d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Billings;
