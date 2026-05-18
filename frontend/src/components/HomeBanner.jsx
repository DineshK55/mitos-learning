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
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import {
  getAllBanners,
} from "../services/bannerService";

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

    <div className="w-full px-5 md:px-10 mt-8">

      <Swiper
        modules={[
          Autoplay,
          Pagination,
          EffectFade,
        ]}
        slidesPerView={1}
        loop={true}
        speed={1800}
        effect="fade"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="
        rounded-[42px]
        overflow-hidden
        shadow-2xl
        border
        border-white/10
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
                h-[260px]
                md:h-[420px]
                cursor-pointer
                overflow-hidden
                group
                "
              >

                {/* Background Image */}

                <img
                  src={`http://localhost:5000/uploads/banners/${banner.image}`}
                  alt={banner.title}
                  className="
                  w-full
                  h-full
                  object-cover
                  scale-100
                  group-hover:scale-110
                  transition-all
                  duration-[6000ms]
                  "
                />

                {/* Dark Overlay */}

                <div
                  className="
                  absolute
                  inset-0
                  bg-black/20
                  "
                />

                {/* Glass Effect */}

                <div
                  className="
                  absolute
                  inset-0
                  backdrop-blur-[1px]
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