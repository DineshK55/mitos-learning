import {
  useContext,
  useState,
} from "react";

import {
  AuthContext,
} from "../context/AuthContext";

import Navbar from "../components/Navbar";

function Profile() {

  // =====================================================
  // AUTH CONTEXT
  // =====================================================

  const {
    user,
  } = useContext(AuthContext);

  // =====================================================
  // FORM STATE
  // =====================================================

  const [
    formData,
    setFormData,
  ] = useState({

    name:
      user?.name || "",

    phone:
      user?.phone || "",

    email:
      user?.email || "",

    state:
      user?.state || "",

    studentClass:
      user?.studentClass || "",

  });

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
  // HANDLE UPDATE
  // =====================================================

  const handleSubmit = (e) => {

    e.preventDefault();

    alert(
      "Profile Update Feature Coming Soon"
    );

  };

  return (

    <>

      <Navbar />

      <div className="min-h-screen bg-gray-100 px-4 py-10">

        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-6 sm:p-8 md:p-10">

          {/* ================================================= */}
          {/* PROFILE HEADER */}
          {/* ================================================= */}

          <div className="flex flex-col items-center">

            {/* PROFILE ICON */}

            <div className="w-28 h-28 rounded-full bg-purple-700 text-white flex items-center justify-center text-5xl font-bold mb-5">

              {
                user?.name
                  ? user.name.charAt(0).toUpperCase()
                  : "U"
              }

            </div>

            {/* TITLE */}

            <h1 className="text-3xl sm:text-4xl font-extrabold text-purple-700 text-center">

              Student Profile

            </h1>

            <p className="text-gray-500 mt-2 text-center">

              Manage your account details

            </p>

          </div>

          {/* ================================================= */}
          {/* FORM */}
          {/* ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >

            {/* FULL NAME */}

            <div>

              <label className="block text-lg font-semibold mb-3">

                Full Name

              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Full Name"
                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-purple-600"
              />

            </div>

            {/* PHONE */}

            <div>

              <label className="block text-lg font-semibold mb-3">

                Phone Number

              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-purple-600"
              />

            </div>

            {/* EMAIL */}

            <div>

              <label className="block text-lg font-semibold mb-3">

                Email

              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-purple-600"
              />

            </div>

            {/* STATE */}

            <div>

              <label className="block text-lg font-semibold mb-3">

                State

              </label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter State"
                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-purple-600"
              />

            </div>

            {/* CLASS */}

            <div>

              <label className="block text-lg font-semibold mb-3">

                Class

              </label>

              <input
                type="text"
                name="studentClass"
                value={formData.studentClass}
                onChange={handleChange}
                placeholder="Enter Class"
                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-purple-600"
              />

            </div>

            {/* UPDATE BUTTON */}

            <button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-800 text-white py-4 rounded-xl text-lg font-bold transition duration-300"
            >

              Update Profile

            </button>

          </form>

        </div>

      </div>

    </>

  );
}

export default Profile;