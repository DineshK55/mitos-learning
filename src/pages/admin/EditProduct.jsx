import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  toast,
} from "react-toastify";

// =====================================================
// PRODUCT SERVICE
// =====================================================

import {
  getSingleProduct,
  updateProduct,
} from "../../services/productService";

function EditProduct() {

  // =====================================================
  // ROUTER
  // =====================================================

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  // =====================================================
  // STATES
  // =====================================================

  const [loading, setLoading] =
    useState(true);

  const [updating, setUpdating] =
    useState(false);

  const [thumbnail, setThumbnail] =
    useState(null);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      original_price: "",
      discount_price: "",
      category: "",
      featured: "No",
      status: "Active",
    });

  // =====================================================
  // FETCH PRODUCT
  // =====================================================

  useEffect(() => {

    const fetchProduct =
      async () => {

        try {

          const response =
            await getSingleProduct(id);

          const product =
            response.product;

          setFormData({
            title:
              product?.title || "",

            description:
              product?.description || "",

            original_price:
              product?.original_price || "",

            discount_price:
              product?.discount_price || "",

            category:
              product?.category || "",

            featured:
              product?.featured || "No",

            status:
              product?.status || "Active",
          });

        } catch (error) {

          console.log(error);

          toast.error(
            "Failed To Load Product"
          );

        } finally {

          setLoading(false);

        }
      };

    fetchProduct();

  }, [id]);

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (
    e
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // =====================================================
  // HANDLE IMAGE
  // =====================================================

  const handleImageChange = (
    e
  ) => {

    const file =
      e.target.files[0];

    if (!file) {
      return;
    }

    // =====================================================
    // IMAGE VALIDATION
    // =====================================================

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {

      toast.error(
        "Please Select Image File"
      );

      return;
    }

    setThumbnail(file);
  };

  // =====================================================
  // HANDLE UPDATE
  // =====================================================

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      setUpdating(true);

      // =====================================================
      // FORM DATA
      // =====================================================

      const productData =
        new FormData();

      productData.append(
        "title",
        formData.title
      );

      productData.append(
        "description",
        formData.description
      );

      productData.append(
        "original_price",
        formData.original_price
      );

      productData.append(
        "discount_price",
        formData.discount_price
      );

      productData.append(
        "category",
        formData.category
      );

      productData.append(
        "featured",
        formData.featured
      );

      productData.append(
        "status",
        formData.status
      );

      // =====================================================
      // OPTIONAL IMAGE
      // =====================================================

      if (thumbnail) {

        productData.append(
          "thumbnail",
          thumbnail
        );
      }

      // =====================================================
      // UPDATE API
      // =====================================================

      const response =
        await updateProduct(
          id,
          productData
        );

      // =====================================================
      // SUCCESS
      // =====================================================

      toast.success(
        response.message ||
        "Product Updated Successfully"
      );

      navigate(
        "/admin/products"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        error?.message ||
        error?.error ||
        "Update Failed"
      );

    } finally {

      setUpdating(false);

    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="flex items-center justify-center h-[60vh]">

        <h1 className="text-2xl font-bold text-purple-700">
          Loading Product...
        </h1>

      </div>
    );
  }

  return (

    <div className="bg-gray-100 min-h-screen p-6">

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <div className="bg-white rounded-3xl shadow-sm px-6 py-5 mb-5">

        <h1 className="text-2xl font-bold text-gray-800">
          Edit Product
        </h1>

        <p className="text-gray-500 mt-1">
          Update Product Details
        </p>

      </div>

      {/* ===================================================== */}
      {/* FORM */}
      {/* ===================================================== */}

      <div className="bg-white rounded-3xl shadow-md p-5 max-w-5xl">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* PRODUCT TITLE */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Product Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-purple-700"
            />

          </div>

          {/* DESCRIPTION */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-purple-700"
            ></textarea>

          </div>

          {/* GRID */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* ORIGINAL PRICE */}

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Original Price
              </label>

              <input
                type="number"
                name="original_price"
                value={formData.original_price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-purple-700"
              />

            </div>

            {/* DISCOUNT PRICE */}

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Discount Price
              </label>

              <input
                type="number"
                name="discount_price"
                value={formData.discount_price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-purple-700"
              />

            </div>

            {/* CATEGORY */}

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-purple-700"
              >

                <option value="">
                  Select Category
                </option>

                <option value="Physics">
                  Physics
                </option>

                <option value="Chemistry">
                  Chemistry
                </option>

                <option value="Biology">
                  Biology
                </option>

              </select>

            </div>

            {/* FEATURED */}

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Featured Product
              </label>

              <select
                name="featured"
                value={formData.featured}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-purple-700"
              >

                <option value="Yes">
                  Yes
                </option>

                <option value="No">
                  No
                </option>

              </select>

            </div>

          </div>

          {/* STATUS */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-purple-700"
            >

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

            </select>

          </div>

          {/* IMAGE */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Update Product Image
            </label>

            <input
              type="file"
              onChange={
                handleImageChange
              }
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 bg-white"
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={updating}
            className="w-full bg-purple-700 text-white py-3 rounded-2xl font-semibold hover:bg-purple-800 transition disabled:opacity-70"
          >

            {updating
              ? "Updating Product..."
              : "Update Product"}

          </button>

        </form>

      </div>

    </div>
  );
}

export default EditProduct;