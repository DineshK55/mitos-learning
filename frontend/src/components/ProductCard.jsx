import { useNavigate } from "react-router-dom";

import {
  BACKEND_URL,
} from "../services/api";

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

  const navigate =
    useNavigate();

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

  // =====================================================
  // IMAGE URL FIX
  // =====================================================

  const imageUrl =
    image
      ? image.startsWith("http")
        ? image
        : `${BACKEND_URL}/uploads/products/${image}`
      : "https://placehold.co/600x400?text=No+Image";

  return (

    <div
      className={`
      bg-white
      rounded-[22px]
      overflow-hidden
      transition-all
      duration-300
      border
      shadow-sm
      hover:shadow-xl
      hover:-translate-y-1
      flex
      flex-col
      h-full
      group
      ${
        isSelected
          ? "border-purple-600 ring-2 ring-purple-100"
          : "border-gray-100"
      }
      `}
    >

      {/* ===================================================== */}
      {/* IMAGE */}
      {/* ===================================================== */}

      <div
        className="
        relative
        w-full
        h-40
        overflow-hidden
        bg-gray-100
        "
      >

        <img
          src={imageUrl}
          alt={title}
          className="
          w-full
          h-full
          object-cover
          transition-transform
          duration-500
          group-hover:scale-105
          "
          onError={(e) => {

            e.target.src =
              "https://placehold.co/600x400?text=No+Image";

          }}
        />

        {/* ===================================================== */}
        {/* SELECT BUTTON */}
        {/* ===================================================== */}

        <button
          onClick={() => onSelect(id)}
          className={`
          absolute
          top-3
          right-3
          w-8
          h-8
          rounded-2xl
          border
          flex
          items-center
          justify-center
          transition-all
          duration-300
          backdrop-blur-md
          shadow-md
          ${
            isSelected
              ? "bg-purple-700 border-purple-700 text-white"
              : "bg-white/90 border-white"
          }
          `}
        >

          {isSelected && (

            <span className="text-xs font-bold">

              ✓

            </span>

          )}

        </button>

      </div>

      {/* ===================================================== */}
      {/* CONTENT */}
      {/* ===================================================== */}

      <div
        className="
        p-4
        flex
        flex-col
        flex-grow
        "
      >

        {/* ===================================================== */}
        {/* TITLE */}
        {/* ===================================================== */}

        <h2
          className="
          text-[18px]
          md:text-[20px]
          font-black
          text-gray-900
          leading-snug
          line-clamp-2
          min-h-[58px]
          tracking-tight
          "
        >

          {title}

        </h2>

        {/* ===================================================== */}
        {/* DESCRIPTION */}
        {/* ===================================================== */}

        <p
          className="
          text-gray-500
          text-[13px]
          mt-2
          line-clamp-2
          leading-6
          min-h-[48px]
          "
        >

          {description}

        </p>

        {/* ===================================================== */}
        {/* PRICE */}
        {/* ===================================================== */}

        <div className="mt-4">

          {originalPrice && (

            <p
              className="
              text-gray-400
              line-through
              text-xs
              "
            >

              ₹ {originalPrice}

            </p>

          )}

          <div
            className="
            flex
            items-center
            gap-2
            mt-1
            flex-wrap
            "
          >

            <h3
              className="
              text-purple-700
              text-3xl
              font-black
              tracking-tight
              "
            >

              ₹ {price}

            </h3>

            {discountPercentage > 0 && (

              <span
                className="
                bg-green-100
                text-green-700
                text-[11px]
                font-bold
                px-2.5
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
          mt-5
          bg-purple-700
          hover:bg-purple-800
          text-white
          py-2.5
          rounded-xl
          font-semibold
          text-sm
          transition-all
          duration-300
          shadow-md
          hover:shadow-purple-300
          active:scale-[0.98]
          "
        >

          View Details

        </button>

      </div>

    </div>

  );
}

export default ProductCard;