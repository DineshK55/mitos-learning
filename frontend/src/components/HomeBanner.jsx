import {
  useEffect,
  useState,
} from "react";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import {
  Autoplay,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import {
  getAllBanners,
} from "../services/bannerService";

import { BACKEND_URL } from "../services/api";

function HomeBanner() {

  // =====================================================
  // STATES
  // =====================================================

  const [banners, setBanners] =
    useState([]);

  // =====================================================
  // FETCH BANNERS
  // =====================================================

  const fetchBanners =
    async () => {

      try {

        const response =
          await getAllBanners();

        const activeBanners =
          response.banners.filter(
            (banner) =>
              banner.status ===
              "active"
          );

        setBanners(
          activeBanners
        );

      } catch (error) {

        console.log(error);

      }
    };

  // =====================================================
  // USE EFFECT
  // =====================================================

  useEffect(() => {

    fetchBanners();

  }, []);

  // =====================================================
  // JSX
  // =====================================================

  return (

    <div
      className="
      w-full
      max-w-5xl
      mx-auto
      mt-6
      px-4
      "
    >

      <Swiper
        modules={[
          Autoplay,
          Pagination,
        ]}
        slidesPerView={1}
        loop={true}
        speed={1200}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="
        rounded-3xl
        overflow-hidden
        shadow-xl
        "
      >

        {banners.map(
          (banner) => (

            <SwiperSlide
              key={banner.id}
            >

              <div
                onClick={() =>
                  window.open(
                    banner.redirect_url,
                    "_blank"
                  )
                }
                className="
                relative
                w-full
                h-[170px]
                sm:h-[190px]
                md:h-[220px]
                lg:h-[260px]
                cursor-pointer
                overflow-hidden
                group
                "
              >

                {/* ===================================================== */}
                {/* IMAGE */}
                {/* ===================================================== */}

                <img
                  src={`${BACKEND_URL}/uploads/banners/${banner.image}`}
                  alt={banner.title}
                  className="
                  w-full
                  h-full
                  object-cover
                  transition-all
                  duration-700
                  group-hover:scale-105
                  "
                />

                {/* ===================================================== */}
                {/* DARK OVERLAY */}
                {/* ===================================================== */}

                <div
                  className="
                  absolute
                  inset-0
                  bg-black/10
                  "
                />

              </div>

            </SwiperSlide>

          )
        )}

      </Swiper>

    </div>

  );
}

export default HomeBanner;