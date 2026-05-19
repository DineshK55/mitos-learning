import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  toast,
} from "react-toastify";

import api from "../../services/api";

function SingleUser() {

  // =====================================================
  // PARAMS
  // =====================================================

  const { id } = useParams();

  const navigate = useNavigate();

  // =====================================================
  // STATES
  // =====================================================

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH USER
  // =====================================================

  const fetchUser = async () => {

    try {

      const response = await api.get(
        `/admin/users/${id}`
      );

      setUser(response.data.user);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed To Load User"
      );

    } finally {

      setLoading(false);
    }
  };

  // =====================================================
  // USE EFFECT
  // =====================================================

  useEffect(() => {

    fetchUser();

  }, []);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold text-purple-700">

          Loading User...

        </h1>

      </div>
    );
  }

  // =====================================================
  // NO USER
  // =====================================================

  if (!user) {

    return (

      <div className="text-center mt-20 text-2xl font-bold text-red-500">

        User Not Found

      </div>
    );
  }

  // =====================================================
  // JSX
  // =====================================================

  return (

  <div className="space-y-6 px-6 py-4">

    {/* ===================================================== */}
    {/* HEADER */}
    {/* ===================================================== */}

    <div className="bg-white rounded-3xl shadow-md p-8">

      <button
        onClick={() =>
          navigate("/admin/users")
        }
        className="mb-6 bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-2xl font-semibold transition"
      >

        ← 

      </button>

      <h1 className="text-4xl font-bold text-gray-800">

        User Details

      </h1>

      <p className="text-gray-500 mt-2">

        Complete Student Information

      </p>

    </div>

    {/* ===================================================== */}
    {/* USER CARD */}
    {/* ===================================================== */}

    <div className="bg-white rounded-3xl shadow-md p-8">

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">

        {/* AVATAR */}

        <div className="w-32 h-32 rounded-full bg-purple-700 text-white flex items-center justify-center text-5xl font-bold">

          {user.name.charAt(0)}

        </div>

        {/* DETAILS */}

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* NAME */}

          <div>

            <p className="text-gray-500 text-sm">

              Full Name

            </p>

            <h2 className="text-2xl font-bold text-gray-800">

              {user.name}

            </h2>

          </div>

          {/* EMAIL */}

          <div>

            <p className="text-gray-500 text-sm">

              Email Address

            </p>

            <h2 className="text-xl font-semibold text-gray-800">

              {user.email}

            </h2>

          </div>

          {/* PHONE */}

          <div>

            <p className="text-gray-500 text-sm">

              Phone Number

            </p>

            <h2 className="text-xl font-semibold text-gray-800">

              {user.phone}

            </h2>

          </div>

          {/* STATE */}

          <div>

            <p className="text-gray-500 text-sm">

              State

            </p>

            <h2 className="text-xl font-semibold text-gray-800">

              {user.state}

            </h2>

          </div>

          {/* CLASS */}

          <div>

            <p className="text-gray-500 text-sm">

              Class

            </p>

            <h2 className="text-xl font-semibold text-gray-800">

              {user.student_class}

            </h2>

          </div>

          {/* ROLE */}

          <div>

            <p className="text-gray-500 text-sm">

              Role

            </p>

            <span
              className={`inline-block mt-2 px-5 py-2 rounded-full text-sm font-bold ${
                user.role === "admin"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-green-100 text-green-700"
              }`}
            >

              {user.role}

            </span>

          </div>

        </div>

      </div>

    </div>

  </div>
);

}

export default SingleUser;