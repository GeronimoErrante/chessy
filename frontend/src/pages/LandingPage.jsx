import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-0 overflow-hidden">
      <div className="md:hidden w-full min-h-screen bg-[#f0d989] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tighter text-center text-black">
            LOGO
            <br />
            EMPRESA
          </h1>

          <p className="text-sm text-center mb-8 max-w-lg leading-relaxed text-black">
            A new way to play the concentrated game of chess. A decentralized platform for everyone who wants to
            earn money playing the most beloved game in the history. A decentralized platform for everyone who wants
            to earn money playing chess. Integrated results on blockchain mode and much more in the future.
          </p>

          <div className="w-full space-y-4">
            <Link
              to="/login"
              className="block w-full bg-black text-white py-3 text-center text-base font-bold tracking-wider hover:bg-gray-900 transition-colors"
            >
              LOGIN
            </Link>
            <Link
              to="/register"
              className="block w-full bg-black text-white py-3 text-center text-base font-bold tracking-wider hover:bg-gray-900 transition-colors"
            >
              REGISTER
            </Link>
            
            <button className="w-full bg-black text-[#f0d989] py-2 text-xs font-bold tracking-wider hover:bg-gray-900 transition-colors">
              TÉRMINOS Y CONDIC
            </button>
            <button className="w-full bg-black text-[#f0d989] py-2 text-xs font-bold tracking-wider hover:bg-gray-900 transition-colors">
              MANUAL DE USUARIO
            </button>
            <button className="w-full bg-black text-[#f0d989] py-2 text-xs font-bold tracking-wider hover:bg-gray-900 transition-colors">
              F.A.Qs
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:flex relative w-full items-center justify-center">
        <div
          className="
            w-[85vw] h-[85vw] lg:w-[800px] lg:h-[800px] xl:w-[900px] xl:h-[900px]
            bg-[#f0d989]
            shadow-2xl
            transform rotate-45
            flex items-center justify-center
            overflow-hidden
            relative
          "
        >
          <div
            className="
            transform -rotate-45 
            w-full h-full
            flex flex-col items-center justify-center 
            text-black 
            px-8 lg:px-16
          "
          >
            <div className="w-full max-w-xl flex flex-col items-center justify-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tighter text-center">
                LOGO
                <br />
                EMPRESA
              </h1>

              <p className="text-sm md:text-base text-center mb-8 max-w-lg leading-relaxed">
                A new way to play the concentrated game of chess. A decentralized platform for everyone who wants to
                earn money playing the most beloved game in the history. A decentralized platform for everyone who wants
                to earn money playing chess. Integrated results on blockchain mode and much more in the future. A new
                way to play the concentrated game of chess. A decentralized platform for everyone who wants to earn
                money playing the most beloved game in the history. Scholarships, tournaments, play-to-earn, ratings,
                integrated results on blockchain mode and much more in the future stars in the future.
              </p>

              <div className="w-full max-w-md space-y-5">
                <Link
                  to="/login"
                  className="block w-full bg-black text-white py-4 text-center text-lg font-bold tracking-wider hover:bg-gray-900 transition-colors"
                >
                  LOGIN
                </Link>
                <Link
                  to="/register"
                  className="block w-full bg-black text-white py-4 text-center text-lg font-bold tracking-wider hover:bg-gray-900 transition-colors"
                >
                  REGISTER
                </Link>
                
                <div className="flex w-full gap-2 mt-4">
                  <button className="flex-1 bg-black text-[#f0d989] py-3 text-sm font-bold tracking-wider hover:bg-gray-900 transition-colors">
                    TÉRMINOS Y CONDIC
                  </button>
                  <button className="flex-1 bg-black text-[#f0d989] py-3 text-sm font-bold tracking-wider hover:bg-gray-900 transition-colors">
                    MANUAL DE USUARIO
                  </button>
                  <button className="flex-1 bg-black text-[#f0d989] py-3 text-sm font-bold tracking-wider hover:bg-gray-900 transition-colors">
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