import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  toast,
} from "react-toastify";

import {
  Trash2,
  Plus,
  Search,
} from "lucide-react";

// =====================================================
// SERVICES
// =====================================================

import {
  getAllBanners,
  deleteBanner,
  toggleBannerStatus,
} from "../../services/bannerService";

function AllBanners() {

  // =====================================================
  // STATES
  // =====================================================

  const [banners, setBanners] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  // =====================================================
  // FETCH BANNERS
  // =====================================================

  const fetchBanners =
    async () => {

      try {

        const response =
          await getAllBanners();

        setBanners(
          response.banners || []
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed To Load Banners"
        );

      } finally {

        setLoading(false);

      }
    };

  // =====================================================
  // DELETE BANNER
  // =====================================================

  const handleDelete =
    async (bannerId) => {

      const confirmDelete =
        window.confirm(
          "Delete this banner?"
        );

      if (!confirmDelete) {
        return;
      }

      try {

        const response =
          await deleteBanner(
            bannerId
          );

        toast.success(
          response.message
        );

        fetchBanners();

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed To Delete Banner"
        );
      }
    };

  // =====================================================
  // TOGGLE STATUS
  // =====================================================

  const handleToggle =
    async (bannerId) => {

      try {

        const response =
          await toggleBannerStatus(
            bannerId
          );

        toast.success(
          response.message
        );

        fetchBanners();

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed To Update Status"
        );
      }
    };

  // =====================================================
  // USE EFFECT
  // =====================================================

  useEffect(() => {

    fetchBanners();

  }, []);

  // =====================================================
  // FILTERED BANNERS
  // =====================================================

  const filteredBanners =
    banners.filter((banner) =>
      banner.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <div className="min-h-screen bg-[#f5f5f7] p-6">

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold text-gray-900">
            Banner Campaigns
          </h1>

          <p className="text-gray-500 mt-2">
            Manage homepage promotional banners
          </p>

        </div>

        <Link
          to="/admin/add-banner"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg transition"
        >

          <Plus size={20} />

          Create Banner

        </Link>

      </div>

      {/* ===================================================== */}
      {/* SEARCH */}
      {/* ===================================================== */}

      <div className="bg-white p-4 rounded-3xl shadow-sm mb-8">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search banners..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-purple-500"
          />

        </div>

      </div>

      {/* ===================================================== */}
      {/* LOADING */}
      {/* ===================================================== */}

      {loading ? (

        <div className="text-center py-20 text-gray-500">
          Loading banners...
        </div>

      ) : filteredBanners.length === 0 ? (

        <div className="text-center py-20 text-gray-500">
          No banners found
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {filteredBanners.map(
            (banner) => (

              <div
                key={banner.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
              >

                {/* IMAGE */}

                <div className="relative">

                  <img
                    src={`https://mitos-learning-backend.onrender.com/uploads/banners/${banner.image}`}
                    alt={banner.title}
                    className="w-full h-48 object-cover"
                  />

                  <span
                    className={`absolute top-4 right-4 px-4 py-1 rounded-full text-xs font-semibold ${
                      banner.status === "active"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >

                    {banner.status}

                  </span>

                </div>

                {/* CONTENT */}

                <div className="p-5">

                  <h2 className="text-xl font-bold text-gray-800">
                    {banner.title}
                  </h2>

                  <p className="text-gray-500 text-sm mt-2 truncate">
                    {banner.redirect_url}
                  </p>

                  {/* ACTIONS */}

                  <div className="flex items-center justify-between mt-6">

                    {/* TOGGLE */}

                    <button
                      onClick={() =>
                        handleToggle(
                          banner.id
                        )
                      }
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition ${
                        banner.status === "active"
                          ? "bg-blue-500 justify-end"
                          : "bg-gray-300 justify-start"
                      }`}
                    >

                      <div className="w-4 h-4 bg-white rounded-full"></div>

                    </button>

                    {/* DELETE */}

                    <button
                      onClick={() =>
                        handleDelete(
                          banner.id
                        )
                      }
                      className="w-11 h-11 rounded-xl bg-purple-700 hover:bg-purple-800 flex items-center justify-center text-white transition"
                    >

                      <Trash2 size={18} />

                    </button>

                  </div>

                </div>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}

export default AllBanners;