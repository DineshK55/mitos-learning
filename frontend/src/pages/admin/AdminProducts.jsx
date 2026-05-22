import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

import {
  toast,
} from "react-toastify";

// =====================================================
// PRODUCT SERVICE
// =====================================================

import {
  getAllProducts,
  deleteProduct,
} from "../../services/productService";

function AdminProducts() {

  // =====================================================
  // STATES
  // =====================================================

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  const fetchProducts = async () => {

    try {

      const response =
        await getAllProducts();

      setProducts(
        response.products || []
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed To Load Products"
      );

    } finally {

      setLoading(false);

    }
  };

  // =====================================================
  // DELETE PRODUCT
  // =====================================================

  const handleDelete = async (
    productId
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete This Product?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      const response =
        await deleteProduct(productId);

      toast.success(
        response.message ||
        "Product Deleted Successfully"
      );

      fetchProducts();

    } catch (error) {

      console.log(error);

      toast.error(
        "Delete Failed"
      );
    }
  };

  // =====================================================
  // LOAD PRODUCTS
  // =====================================================

  useEffect(() => {

    fetchProducts();

  }, []);

  // =====================================================
  // FILTER PRODUCTS
  // =====================================================

  const filteredProducts =
    products.filter((product) =>

      product.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold text-purple-700">

          Loading Products...

        </h1>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100">

      {/* ===================================================== */}
      {/* TOP SECTION */}
      {/* ===================================================== */}

      <div
        className="
        bg-white
        shadow-sm
        px-4
        md:px-6
        py-5
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-5
        "
      >

        <div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">

            Product Management

          </h1>

          <p className="text-gray-500 mt-1">

            Manage All Products

          </p>

        </div>

        <div
          className="
          flex
          flex-col
          sm:flex-row
          gap-4
          "
        >

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
            border
            border-gray-300
            px-5
            py-3
            rounded-2xl
            outline-none
            focus:ring-2
            focus:ring-purple-500
            w-full
            sm:w-[260px]
            "
          />

          {/* ADD PRODUCT */}

          <Link
            to="/admin/add-product"
            className="
            bg-purple-700
            text-white
            px-6
            py-3
            rounded-2xl
            font-semibold
            hover:bg-purple-800
            transition
            flex
            items-center
            justify-center
            gap-2
            "
          >

            <FaPlus />

            Add Product

          </Link>

        </div>

      </div>

      {/* ===================================================== */}
      {/* PRODUCT STATS */}
      {/* ===================================================== */}

      <div className="p-4 md:p-6 pb-0">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white rounded-3xl shadow-md p-6">

            <h2 className="text-gray-500 font-semibold">

              Total Products

            </h2>

            <h1 className="text-4xl font-black text-purple-700 mt-3">

              {products.length}

            </h1>

          </div>

        </div>

      </div>

      {/* ===================================================== */}
      {/* PRODUCT TABLE */}
      {/* ===================================================== */}

      <div className="p-4 md:p-6">

        <div className="bg-white rounded-3xl shadow-md overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1100px]">

              {/* TABLE HEAD */}

              <thead className="bg-purple-700 text-white">

                <tr>

                  <th className="px-6 py-5 text-left">
                    Image
                  </th>

                  <th className="px-6 py-5 text-left">
                    Product
                  </th>

                  <th className="px-6 py-5 text-left">
                    Category
                  </th>

                  <th className="px-6 py-5 text-left">
                    Original Price
                  </th>

                  <th className="px-6 py-5 text-left">
                    Discount Price
                  </th>

                  <th className="px-6 py-5 text-left">
                    Featured
                  </th>

                  <th className="px-6 py-5 text-left">
                    Status
                  </th>

                  <th className="px-6 py-5 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              {/* TABLE BODY */}

              <tbody>

                {filteredProducts.length > 0 ? (

                  filteredProducts.map(
                    (product) => {

                      // =====================================================
                      // FIX IMAGE URL
                      // =====================================================

                      const imageUrl =
                        product.thumbnail?.startsWith("http")
                          ? product.thumbnail
                          : `http://localhost:5000/uploads/${product.thumbnail
                              ?.replace("uploads/", "")
                              ?.trim()}`;

                      return (

                        <tr
                          key={product.id}
                          className="
                          border-b
                          hover:bg-purple-50
                          transition
                          "
                        >

                          {/* IMAGE */}

                          <td className="px-6 py-5">

                            <img
                              src={imageUrl}
                              alt={product.title}
                              className="
                              w-20
                              h-20
                              object-cover
                              rounded-2xl
                              border
                              shadow-sm
                              "
                            />

                          </td>

                          {/* PRODUCT */}

                          <td className="px-6 py-5">

                            <h1 className="font-bold text-gray-800 text-lg">

                              {product.title}

                            </h1>

                            <p
                              className="
                              text-sm
                              text-gray-500
                              mt-1
                              line-clamp-2
                              max-w-[320px]
                              "
                            >

                              {product.description}

                            </p>

                          </td>

                          {/* CATEGORY */}

                          <td className="px-6 py-5 font-medium">

                            {product.category}

                          </td>

                          {/* ORIGINAL PRICE */}

                          <td
                            className="
                            px-6
                            py-5
                            text-gray-500
                            line-through
                            "
                          >

                            ₹ {product.original_price}

                          </td>

                          {/* DISCOUNT PRICE */}

                          <td
                            className="
                            px-6
                            py-5
                            text-green-600
                            font-black
                            "
                          >

                            ₹ {product.discount_price}

                          </td>

                          {/* FEATURED */}

                          <td className="px-6 py-5">

                            <span
                              className={`
                              px-3
                              py-1
                              rounded-full
                              text-sm
                              font-semibold
                              ${
                                product.featured === "Yes"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-600"
                              }
                              `}
                            >

                              {product.featured}

                            </span>

                          </td>

                          {/* STATUS */}

                          <td className="px-6 py-5">

                            <span
                              className={`
                              px-3
                              py-1
                              rounded-full
                              text-sm
                              font-semibold
                              ${
                                product.status?.toLowerCase() === "active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }
                              `}
                            >

                              {product.status}

                            </span>

                          </td>

                          {/* ACTIONS */}

                          <td className="px-6 py-5">

                            <div className="flex items-center justify-center gap-3">

                              {/* EDIT */}

                              <Link
                                to={`/admin/edit-product/${product.id}`}
                                className="
                                bg-blue-500
                                text-white
                                p-3
                                rounded-xl
                                hover:bg-blue-600
                                transition
                                "
                              >

                                <FaEdit />

                              </Link>

                              {/* DELETE */}

                              <button
                                onClick={() =>
                                  handleDelete(
                                    product.id
                                  )
                                }
                                className="
                                bg-red-500
                                text-white
                                p-3
                                rounded-xl
                                hover:bg-red-600
                                transition
                                "
                              >

                                <FaTrash />

                              </button>

                            </div>

                          </td>

                        </tr>

                      );
                    }
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="8"
                      className="
                      text-center
                      py-16
                      text-gray-500
                      text-lg
                      "
                    >

                      No Products Found

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminProducts;