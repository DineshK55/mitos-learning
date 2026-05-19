import {
  useState,
} from "react";

import {
  Upload,
  X,
} from "lucide-react";

import {
  toast,
} from "react-toastify";

import {
  createBanner,
} from "../../services/bannerService";

function AddBanner() {

  // =====================================================
  // STATES
  // =====================================================

  const [title, setTitle] =
    useState("");

  const [redirectUrl, setRedirectUrl] =
    useState("");

  const [status, setStatus] =
    useState("active");

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // =====================================================
  // HANDLE IMAGE
  // =====================================================

  const handleImage =
    (e) => {

      const file =
        e.target.files[0];

      if (!file) {
        return;
      }

      setImage(file);

      setPreview(
        URL.createObjectURL(file)
      );
    };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (!image) {

        toast.error(
          "Please Upload Banner Image"
        );

        return;
      }

      try {

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "title",
          title
        );

        formData.append(
          "redirect_url",
          redirectUrl
        );

        formData.append(
          "status",
          status
        );

        formData.append(
          "image",
          image
        );

        const response =
          await createBanner(
            formData
          );

        toast.success(
          response.message
        );

        // RESET

        setTitle("");
        setRedirectUrl("");
        setStatus("active");
        setImage(null);
        setPreview("");

      }catch (error) {

  console.log(error);

  toast.error(
    error?.response?.data?.message ||
    error.message ||
    "Failed To Create Banner"
  );
} finally {

        setLoading(false);
      }
    };

  return (

    <div className="min-h-screen bg-[#f5f5f7] p-6">

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-gray-900">
          Create New Banner
        </h1>

        <p className="text-gray-500 mt-2">
          Design and publish homepage banners
        </p>

      </div>

      {/* ===================================================== */}
      {/* CONTENT */}
      {/* ===================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* ===================================================== */}
        {/* FORM */}
        {/* ===================================================== */}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-8 shadow-sm"
        >

          {/* IMAGE */}

          <label className="block mb-6">

            <p className="text-sm font-semibold text-gray-700 mb-3">
              Banner Asset
            </p>

            <div className="border-2 border-dashed border-gray-300 rounded-3xl p-10 text-center cursor-pointer hover:border-purple-500 transition">

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
                id="bannerImage"
              />

              <label
                htmlFor="bannerImage"
                className="cursor-pointer"
              >

                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">

                  <Upload
                    size={28}
                    className="text-purple-700"
                  />

                </div>

                <p className="font-semibold text-gray-700">
                  Click To Upload Banner
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  PNG, JPG up to 5MB
                </p>

              </label>

            </div>

          </label>

          {/* TITLE */}

          <div className="mb-6">

            <label className="block text-sm font-semibold text-gray-700 mb-3">

              Banner Title

            </label>

            <input
              type="text"
              placeholder="Enter Banner Title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-purple-500"
            />

          </div>

          {/* URL */}

          <div className="mb-6">

            <label className="block text-sm font-semibold text-gray-700 mb-3">

              Redirect URL

            </label>

            <input
              type="text"
              placeholder="https://example.com"
              value={redirectUrl}
              onChange={(e) =>
                setRedirectUrl(
                  e.target.value
                )
              }
              className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-purple-500"
            />

          </div>

          {/* STATUS */}

          <div className="mb-8">

            <label className="block text-sm font-semibold text-gray-700 mb-3">

              Status

            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
              className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            >

              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>

            </select>

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-700 hover:bg-purple-800 text-white py-4 rounded-2xl font-semibold transition"
          >

            {loading
              ? "Creating Banner..."
              : "Create Banner"}

          </button>

        </form>

        {/* ===================================================== */}
        {/* LIVE PREVIEW */}
        {/* ===================================================== */}

        <div className="bg-white rounded-3xl p-8 shadow-sm">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-bold text-gray-900">
              Live Preview
            </h2>

            <button
              className="w-10 h-10 rounded-full bg-purple-800 text-white flex items-center justify-center"
            >

              <X size={18} />

            </button>

          </div>

          {/* PREVIEW CARD */}

          <div className="rounded-3xl overflow-hidden bg-gray-100">

            {preview ? (

              <img
                src={preview}
                alt="Preview"
                className="w-full h-[400px] object-cover"
              />

            ) : (

              <div className="h-[400px] flex items-center justify-center text-gray-400">

                No Preview Available

              </div>
            )}

            <div className="p-6 bg-white">

              <h3 className="text-2xl font-bold text-gray-900">

                {title || "Banner Title"}

              </h3>

              <p className="text-gray-500 mt-3 break-all">

                {redirectUrl ||
                  "Banner redirect URL preview"}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddBanner;