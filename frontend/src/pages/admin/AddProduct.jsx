import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  toast,
} from "react-toastify";

// =====================================================
// PRODUCT SERVICE
// =====================================================

import {
  createProduct,
} from "../../services/productService";

function AddProduct() {

  // =====================================================
  // NAVIGATE
  // =====================================================

  const navigate =
    useNavigate();

  // =====================================================
  // STATES
  // =====================================================

  const [loading, setLoading] =
    useState(false);

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

  const [thumbnail, setThumbnail] =
    useState(null);

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (e) => {

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
  // HANDLE SUBMIT
  // =====================================================

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    // =====================================================
    // VALIDATION
    // =====================================================

    if (
      !formData.title ||
      !formData.description ||
      !formData.original_price ||
      !formData.discount_price ||
      !formData.category ||
      !thumbnail
    ) {

      return toast.error(
        "Please Fill Required Fields"
      );
    }

    try {

      setLoading(true);

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

      productData.append(
        "thumbnail",
        thumbnail
      );

      // =====================================================
      // API
      // =====================================================

      const response =
        await createProduct(
          productData
        );

      console.log(response);

      // =====================================================
      // SUCCESS
      // =====================================================

      toast.success(
        response.message ||
        "Product Added Successfully"
      );

      // =====================================================
      // REDIRECT
      // =====================================================

      navigate(
        "/admin/products"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        error?.message ||
        error?.error ||
        "Failed To Add Product"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-gray-100">

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <div className="bg-white shadow-sm px-6 py-5">

        <h1 className="text-3xl font-bold text-gray-800">
          Add Product
        </h1>

        <p className="text-gray-500 mt-1">
          Create New Product
        </p>

      </div>

      {/* ===================================================== */}
      {/* FORM */}
      {/* ===================================================== */}

      <div className="p-6">

        <div className="bg-white rounded-3xl shadow-md p-8 max-w-5xl mx-auto">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* ===================================================== */}
            {/* PRODUCT TITLE */}
            {/* ===================================================== */}

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Product Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter Product Title"
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-purple-700"
              />

            </div>

            {/* ===================================================== */}
            {/* DESCRIPTION */}
            {/* ===================================================== */}

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter Product Description"
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-purple-700"
              ></textarea>

            </div>

            {/* ===================================================== */}
            {/* GRID FIELDS */}
            {/* ===================================================== */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* ===================================================== */}
              {/* ORIGINAL PRICE */}
              {/* ===================================================== */}

              <div>

                <label className="block mb-2 font-semibold text-gray-700">
                  Original Price
                </label>

                <input
                  type="number"
                  name="original_price"
                  value={formData.original_price}
                  onChange={handleChange}
                  placeholder="Enter Original Price"
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-purple-700"
                />

              </div>

              {/* ===================================================== */}
              {/* DISCOUNT PRICE */}
              {/* ===================================================== */}

              <div>

                <label className="block mb-2 font-semibold text-gray-700">
                  Discount Price
                </label>

                <input
                  type="number"
                  name="discount_price"
                  value={formData.discount_price}
                  onChange={handleChange}
                  placeholder="Enter Discount Price"
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-purple-700"
                />

              </div>

              {/* ===================================================== */}
              {/* CATEGORY */}
              {/* ===================================================== */}

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

              {/* ===================================================== */}
              {/* FEATURED PRODUCT */}
              {/* ===================================================== */}

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

                  <option value="No">
                    No
                  </option>

                  <option value="Yes">
                    Yes
                  </option>

                </select>

              </div>

              {/* ===================================================== */}
              {/* STATUS */}
              {/* ===================================================== */}

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

            </div>

            {/* ===================================================== */}
            {/* PRODUCT IMAGE */}
            {/* ===================================================== */}

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Product Image
              </label>

              <input
                type="file"
                onChange={
                  handleImageChange
                }
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 bg-white"
              />

            </div>

            {/* ===================================================== */}
            {/* SUBMIT BUTTON */}
            {/* ===================================================== */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-700 text-white py-4 rounded-2xl font-semibold hover:bg-purple-800 transition disabled:opacity-70"
            >

              {loading
                ? "Adding Product..."
                : "Add Product"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddProduct;