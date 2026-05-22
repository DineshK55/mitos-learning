function Footer() {

  return (

    <footer
      className="
      mt-20
      bg-gradient-to-b
      from-[#081028]
      to-[#030712]
      border-t
      border-purple-700/40
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-16
        "
      >

        {/* ===================================================== */}
        {/* TOP SECTION */}
        {/* ===================================================== */}

        <div
          className="
          flex
          flex-col
          lg:flex-row
          lg:items-start
          lg:justify-between
          gap-14
          "
        >

          {/* ===================================================== */}
          {/* LEFT */}
          {/* ===================================================== */}

          <div
            className="
            flex
            flex-col
            items-center
            lg:items-start
            "
          >

            {/* LOGO */}

            <div
              className="
              bg-white/95
              backdrop-blur-md
              p-3
              rounded-2xl
              shadow-2xl
              border
              border-white/20
              "
            >

              <img
                src="/logo.png"
                alt="Mitos Learning"
                className="
                w-24
                md:w-28
                object-contain
                "
              />

            </div>

            {/* BRAND */}

            <h2
              className="
              text-white
              text-2xl
              font-black
              mt-5
              "
            >

              Mitos Learning

            </h2>

            <p
              className="
              text-gray-400
              text-sm
              mt-2
              text-center
              lg:text-left
              max-w-xs
              leading-relaxed
              "
            >

              Premium printed NEET test series platform designed for serious aspirants.

            </p>

          </div>

          {/* ===================================================== */}
          {/* RIGHT LINKS */}
          {/* ===================================================== */}

          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            gap-10
            text-center
            lg:text-left
            "
          >

            {/* COMPANY */}

            <div>

              <h3
                className="
                text-white
                font-bold
                text-lg
                mb-5
                "
              >

                Company

              </h3>

              <div
                className="
                flex
                flex-col
                gap-4
                "
              >

                <a
                  href="#"
                  className="
                  text-gray-400
                  hover:text-purple-400
                  transition-all
                  duration-300
                  "
                >

                  About

                </a>

                <a
                  href="#"
                  className="
                  text-gray-400
                  hover:text-purple-400
                  transition-all
                  duration-300
                  "
                >

                  Privacy Policy

                </a>

                <a
                  href="#"
                  className="
                  text-gray-400
                  hover:text-purple-400
                  transition-all
                  duration-300
                  "
                >

                  Terms & Conditions

                </a>

              </div>

            </div>

            {/* PLAYSTORE */}

            <div>

              <h3
                className="
                text-white
                font-bold
                text-lg
                mb-5
                "
              >

                Playstore

              </h3>

              <div
                className="
                flex
                flex-col
                gap-4
                "
              >

                <a
                  href="#"
                  className="
                  text-gray-400
                  hover:text-purple-400
                  transition-all
                  duration-300
                  "
                >

                  Terms & Conditions

                </a>

                <a
                  href="#"
                  className="
                  text-gray-400
                  hover:text-purple-400
                  transition-all
                  duration-300
                  "
                >

                  Privacy Policy

                </a>

              </div>

            </div>

            {/* APPSTORE */}

            <div>

              <h3
                className="
                text-white
                font-bold
                text-lg
                mb-5
                "
              >

                Appstore

              </h3>

              <div
                className="
                flex
                flex-col
                gap-4
                "
              >

                <a
                  href="#"
                  className="
                  text-gray-400
                  hover:text-purple-400
                  transition-all
                  duration-300
                  "
                >

                  Terms & Conditions

                </a>

                <a
                  href="#"
                  className="
                  text-gray-400
                  hover:text-purple-400
                  transition-all
                  duration-300
                  "
                >

                  Privacy Policy

                </a>

              </div>

            </div>

          </div>

        </div>

        {/* ===================================================== */}
        {/* BOTTOM */}
        {/* ===================================================== */}

        <div
          className="
          mt-14
          pt-8
          border-t
          border-white/10
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-4
          "
        >

          <p
            className="
            text-gray-400
            text-sm
            text-center
            "
          >

            © 2026 Mitos Learning (OPC) Private Limited. All rights reserved.

          </p>

          <div
            className="
            flex
            items-center
            gap-3
            "
          >

            <div className="w-2 h-2 rounded-full bg-green-400"></div>

            <span
              className="
              text-gray-500
              text-xs
              "
            >

              Secure Learning Platform

            </span>

          </div>

        </div>

      </div>

    </footer>

  );
}

export default Footer;