import { useCartStore } from "../store/cartStore";

export default function Example({ products }) {
  const { cart, addItem, removeItem } = useCartStore();
  const itemExistsInCart = (id) => {
    return cart.some((item) => item._id === id);
  };
  const handleAddRemoveToCart = (id) => {
    if (itemExistsInCart(id)) {
      removeItem(id);
    } else {
      const item = products.find((item) => item._id === id);
      if (item) {
        addItem(item);
      }
    }
  };
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center text-2xl font-bold tracking-tight text-gray-900">
          <h2>For Your Service</h2>
          <h2>{cart.length} Developer(s) Hired</h2>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product._id} className="group relative ">
              <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  alt={product.name}
                  src={product.image}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.name}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
              <h3 className="text-sm text-gray-700 ">{product.description}</h3>

              <div className="text-sm text-gray-700 flex items-center justify-center">
                <button
                  className={`${
                    itemExistsInCart(product._id)
                      ? "bg-red-300"
                      : "bg-green-400"
                  } text-black mt-4 justify-between flex items-center border-2 text-black border-black rounded-2xl p-2`}
                  onClick={() => {
                    handleAddRemoveToCart(product._id);
                  }}
                >
                  {itemExistsInCart(product._id) ? "Not Interested" : "Hire me"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
