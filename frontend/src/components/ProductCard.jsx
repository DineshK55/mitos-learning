import { useNavigate } from "react-router-dom";

function ProductCard({
  id,
  image,
  title,
  price,
  originalPrice,
  description,
  isSelected,
  onSelect,
}) {

  const navigate = useNavigate();

  // =====================================================
  // DISCOUNT PERCENTAGE
  // =====================================================

  const discountPercentage =
    originalPrice
      ? Math.round(
          ((originalPrice - price) /
            originalPrice) *
            100
        )
      : 0;

  return (

    <div
      className={`
      bg-white
      rounded-[28px]
      overflow-hidden
      transition-all
      duration-300
      border
      shadow-md
      hover:shadow-2xl
      hover:-translate-y-1
      ${
        isSelected
          ? "border-purple-600 ring-2 ring-purple-200"
          : "border-gray-200"
      }
      `}
    >

      {/* ===================================================== */}
      {/* PRODUCT IMAGE */}
      {/* ===================================================== */}

      <div className="relative">

        <img
          src={image}
          alt={title}
          className="
          w-full
          h-52
          object-cover
          "
        />

        {/* ===================================================== */}
        {/* CHECKBOX */}
        {/* ===================================================== */}

        <button
          onClick={() => onSelect(id)}
          className={`
          absolute
          top-4
          right-4
          w-9
          h-9
          rounded-xl
          border-2
          flex
          items-center
          justify-center
          transition-all
          duration-300
          shadow-md
          ${
            isSelected
              ? "bg-purple-700 border-purple-700"
              : "bg-white border-white/80 backdrop-blur-md"
          }
          `}
        >

          {isSelected && (
            <span className="text-white text-lg font-bold">
              ✓
            </span>
          )}

        </button>

      </div>

      {/* ===================================================== */}
      {/* PRODUCT DETAILS */}
      {/* ===================================================== */}

      <div className="p-5">

        {/* TITLE */}

        <h2
          className="
          text-[32px]
          md:text-[34px]
          font-bold
          text-gray-900
          leading-tight
          "
        >
          {title}
        </h2>

        {/* DESCRIPTION */}

        <p
          className="
          text-gray-500
          text-sm
          mt-2
          line-clamp-2
          leading-relaxed
          "
        >
          {description}
        </p>

        {/* ===================================================== */}
        {/* PRICE SECTION */}
        {/* ===================================================== */}

        <div className="mt-5">

          {/* ORIGINAL PRICE */}

          {originalPrice && (
            <p
              className="
              text-gray-400
              line-through
              text-lg
              font-medium
              "
            >
              ₹ {originalPrice}
            </p>
          )}

          {/* CURRENT PRICE */}

          <div className="flex items-center gap-3 mt-1">

            <h3
              className="
              text-purple-700
              text-4xl
              font-extrabold
              tracking-tight
              "
            >
              ₹ {price}
            </h3>

            {/* DISCOUNT BADGE */}

            {discountPercentage > 0 && (

              <span
                className="
                bg-green-100
                text-green-700
                text-sm
                font-semibold
                px-3
                py-1
                rounded-full
                "
              >
                {discountPercentage}% OFF
              </span>

            )}

          </div>

        </div>

        {/* ===================================================== */}
        {/* BUTTON */}
        {/* ===================================================== */}

        <button
          onClick={() =>
            navigate(`/product/${id}`)
          }
          className="
          w-full
          mt-6
          bg-purple-700
          hover:bg-purple-800
          text-white
          py-3
          rounded-2xl
          font-semibold
          text-base
          transition-all
          duration-300
          shadow-lg
          hover:shadow-purple-300
          "
        >
          View Details
        </button>

      </div>

    </div>
  );
}

export default ProductCard;