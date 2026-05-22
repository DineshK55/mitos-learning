import Navbar from "../components/Navbar";

function Orders() {

  return (

    <>

      <Navbar />

      <div className="min-h-screen bg-gray-100 px-4 py-10">

        <div className="max-w-6xl mx-auto">

          {/* TITLE */}

          <div className="mb-8">

            <h1 className="text-4xl font-bold text-gray-900">

              My Orders

            </h1>

            <p className="text-gray-500 mt-2">

              View your purchased NEET test series orders.

            </p>

          </div>

          {/* EMPTY STATE */}

          <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

            <h2 className="text-2xl font-bold text-gray-800">

              No Orders Yet

            </h2>

            <p className="text-gray-500 mt-3">

              Your purchased printed test series will appear here.

            </p>

          </div>

        </div>

      </div>

    </>

  );
}

export default Orders;