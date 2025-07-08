import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-0 overflow-hidden relative">
      {/* Fondo decorativo con gradiente y blur */}
      <div className="absolute inset-0 z-0">
        <div className="w-96 h-96 bg-yellow-300 opacity-10 rounded-full blur-3xl absolute -top-24 -left-24" />
        <div className="w-96 h-96 bg-yellow-300 opacity-10 rounded-full blur-3xl absolute bottom-0 right-0" />
      </div>
      {/* Tarjeta central glassmorphism */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-4">
        <div className="backdrop-blur-lg bg-black/60 rounded-3xl shadow-2xl border border-gray-700 p-8 flex flex-col items-center gap-8 mt-8 mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-yellow-200 text-center drop-shadow-lg">
              ♟️  
            <br />
            CHESSY
          </h1>
          <p className="text-base sm:text-lg text-center text-gray-200 mb-2 max-w-md leading-relaxed">
            Descubre una nueva experiencia de ajedrez online. Juega, aprende y compite en torneos con personas de todo el mundo. Mejora tus habilidades, haz nuevos amigos y disfruta del ajedrez como nunca antes. ¡Únete a la comunidad y vive la pasión por el ajedrez!
          </p>
          <div className="flex flex-col gap-4 w-full">
            <Link
              to="/login"
              className="w-full flex items-center justify-center gap-2 bg-yellow-200 text-black py-3 font-bold tracking-wider rounded-xl shadow-md hover:bg-yellow-300 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <span>INICIAR SESIÓN</span>
            </Link>
            <Link
              to="/register"
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl font-bold text-lg shadow-md hover:bg-gray-800 transition-all border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <span>REGISTRARSE</span>
            </Link>
            <Link
              to="/tournaments"
              className="w-full flex items-center justify-center gap-2 bg-yellow-200 text-black py-3 font-bold tracking-wider rounded-xl shadow-md hover:bg-yellow-300 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <span>VER TORNEOS</span>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full mt-4">
            <button className="flex-1 bg-gray-800/80 text-yellow-200 py-2 rounded-lg font-semibold text-sm hover:bg-gray-700 transition-all border border-gray-700">
              TÉRMINOS Y CONDIC
            </button>
            <button className="flex-1 bg-gray-800/80 text-yellow-200 py-2 rounded-lg font-semibold text-sm hover:bg-gray-700 transition-all border border-gray-700">
              MANUAL DE USUARIO
            </button>
            <button className="flex-1 bg-gray-800/80 text-yellow-200 py-2 rounded-lg font-semibold text-sm hover:bg-gray-700 transition-all border border-gray-700">
              F.A.Qs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}