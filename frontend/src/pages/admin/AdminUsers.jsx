import {
  useEffect,
  useState,
} from "react";

import {
  toast,
} from "react-toastify";

// API
import api from "../../services/api";

import {
  useNavigate,
} from "react-router-dom";

function AdminUsers() {

  // =====================================================
  // NAVIGATE
  // =====================================================

  const navigate =
    useNavigate();

  // =====================================================
  // STATES
  // =====================================================

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  // =====================================================
  // FETCH USERS
  // =====================================================

  const fetchUsers =
    async () => {

      try {

        const response =
          await api.get(
            "/admin/users"
          );

        setUsers(
          response.data.users || []
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed To Load Users"
        );

      } finally {

        setLoading(false);
      }
    };

  // =====================================================
  // LOAD USERS
  // =====================================================

  useEffect(() => {

    fetchUsers();

  }, []);

  // =====================================================
  // FILTER USERS
  // =====================================================

  const filteredUsers =
    users.filter((user) =>

      user.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      user.email
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      user.phone
        ?.includes(search)
    );

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold text-purple-700">

          Loading Users...

        </h1>

      </div>
    );
  }

  // =====================================================
  // JSX
  // =====================================================

  return (

    <div className="space-y-6">

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <div className="bg-white rounded-3xl shadow-md p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">

            Users Management

          </h1>

          <p className="text-gray-500 mt-1">

            View All Registered Students

          </p>

        </div>

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search name, email or phone..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="border border-gray-300 px-5 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 w-full lg:w-96"
        />

      </div>

      {/* ===================================================== */}
      {/* STATS */}
      {/* ===================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-white rounded-3xl shadow-md p-6">

          <h2 className="text-gray-500 font-semibold">

            Total Users

          </h2>

          <h1 className="text-4xl font-bold text-purple-700 mt-3">

            {users.length}

          </h1>

        </div>

      </div>

      {/* ===================================================== */}
      {/* USERS TABLE */}
      {/* ===================================================== */}

      <div className="bg-white rounded-3xl shadow-md overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            {/* ===================================================== */}
            {/* TABLE HEAD */}
            {/* ===================================================== */}

            <thead className="bg-purple-700 text-white">

              <tr>

                <th className="px-6 py-5 text-left">
                  User ID
                </th>

                <th className="px-6 py-5 text-left">
                  Name
                </th>

                <th className="px-6 py-5 text-left">
                  Email
                </th>

                <th className="px-6 py-5 text-left">
                  Phone
                </th>

                <th className="px-6 py-5 text-left">
                  State
                </th>

                <th className="px-6 py-5 text-left">
                  Class
                </th>

                <th className="px-6 py-5 text-left">
                  Role
                </th>

              </tr>

            </thead>

            {/* ===================================================== */}
            {/* TABLE BODY */}
            {/* ===================================================== */}

            <tbody>

              {filteredUsers.length > 0 ? (

                filteredUsers.map((user) => (

                  <tr
                    key={user.id}
                    onClick={() =>
                      navigate(
                        `/admin/users/${user.id}`
                      )
                    }
                    className="border-b hover:bg-purple-50 transition cursor-pointer"
                  >

                    {/* USER ID */}

                    <td className="px-6 py-5 font-bold text-purple-700">

                      #{user.id}

                    </td>

                    {/* NAME */}

                    <td className="px-6 py-5 font-semibold text-gray-800">

                      {user.name}

                    </td>

                    {/* EMAIL */}

                    <td className="px-6 py-5">

                      {user.email}

                    </td>

                    {/* PHONE */}

                    <td className="px-6 py-5">

                      {user.phone}

                    </td>

                    {/* STATE */}

                    <td className="px-6 py-5">

                      {user.state}

                    </td>

                    {/* CLASS */}

                    <td className="px-6 py-5">

                      {user.student_class}

                    </td>

                    {/* ROLE */}

                    <td className="px-6 py-5">

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >

                        {user.role}

                      </span>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center py-16 text-gray-500 text-lg"
                  >

                    No Users Found

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminUsers;