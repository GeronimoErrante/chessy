import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl flex items-center justify-center">
        <div
          className="
            w-[90vw] h-[90vw] sm:w-[80vw] sm:h-[80vw] md:w-[70vw] md:h-[70vw] lg:w-[600px] lg:h-[600px]
            bg-[#f0d989]
            shadow-2xl
            transform rotate-45
            flex items-center justify-center
            overflow-hidden
          "
        >
          <div
            className="
            transform -rotate-45 
            w-[130%] h-[130%] sm:w-[120%] sm:h-[120%] md:w-[110%] md:h-[110%] lg:w-full lg:h-full
            flex flex-col items-center justify-center 
            text-black 
            px-4 sm:px-8 md:px-12
          "
          >
            <div className="w-full max-w-md scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100 transform-origin-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tighter text-center">
                LOGO
                <br />
                EMPRESA
              </h1>

              <p className="text-xs sm:text-sm text-center mb-6 max-w-md">
                A new way to play the concentrated game of chess. A decentralized platform for everyone who wants to
                earn money playing the most beloved game in the history. A decentralized platform for everyone who wants
                to earn money playing chess. Integrated results on blockchain mode and much more in the future. A new
                way to play the concentrated game of chess. A decentralized platform for everyone who wants to earn
                money playing the most beloved game in the history. Scholarships, tournaments, play-to-earn, ratings,
                integrated results on blockchain mode and much more in the future stars in the future.
              </p>

              <div className="w-full space-y-3">
                 <Link
                    to="/login"
                    className="block w-full bg-black text-[#f0d989] py-3 text-center font-bold tracking-wider hover:bg-gray-900 transition-colors">
                    LOGIN
                    </Link>
                    <Link
                    to="/register"
                    className="block w-full bg-black text-[#f0d989] py-3 text-center font-bold tracking-wider hover:bg-gray-900 transition-colors">
                    REGISTER
                    </Link>
                <div className="flex w-full gap-1 mt-3">
                  <button className="flex-1 bg-black text-[#f0d989] py-2 text-[9px] sm:text-xs font-bold tracking-wider hover:bg-gray-900 transition-colors">
                    TÉRMINOS Y CONDIC
                  </button>
                  <button className="flex-1 bg-black text-[#f0d989] py-2 text-[9px] sm:text-xs font-bold tracking-wider hover:bg-gray-900 transition-colors">
                    MANUAL DE USUARIO
                  </button>
                  <button className="flex-1 bg-black text-[#f0d989] py-2 text-[9px] sm:text-xs font-bold tracking-wider hover:bg-gray-900 transition-colors">
                    F.A.Qs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
