import { useState } from "react"
import { X, Eye, EyeOff } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../services/authService"
import Alert from "../components/Alert"
import Loader from "../components/Loader"
import { useMessageHandler } from "../utils/messageHandler"

export default function Login() {
  const {
    error,
    errorMessage,
    clearMessages,
    showError
  } = useMessageHandler();
  
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    setIsLoading(true);
    try {
      const data = await loginUser(formData);
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate("/tournaments");
    } catch (err) {
      showError(err.response?.data?.error || "Credenciales incorrectas.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-0 overflow-hidden relative">
      {/* Fondo decorativo con gradiente y blur */}
      <div className="absolute inset-0 z-0">
        <div className="w-96 h-96 bg-yellow-300 opacity-10 rounded-full blur-3xl absolute -top-24 -left-24" />
        <div className="w-96 h-96 bg-yellow-300 opacity-10 rounded-full blur-3xl absolute bottom-0 right-0" />
      </div>
      <div className="relative z-10 w-full max-w-lg mx-auto px-4">
        <div className="backdrop-blur-lg bg-black/60 rounded-3xl shadow-2xl border border-gray-700 p-8 flex flex-col items-center gap-6 mt-8 mb-8">
          <div className="flex justify-between items-center w-full mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">♟️</span>
              <span className="font-extrabold text-xl text-yellow-200 tracking-tight">CHESSY</span>
            </div>
            <button onClick={() => navigate("/")} className="bg-red-500 w-8 h-8 flex items-center justify-center rounded hover:bg-red-600 focus:outline-none" aria-label="Cerrar">
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <h2 className="text-2xl font-bold text-yellow-200 text-center mb-2">INICIAR SESIÓN</h2>

          <div className="space-y-4 w-full">
            {error && <Alert message={errorMessage} type="error" onClose={clearMessages} />}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div>
              <label className="block text-center font-bold mb-2 text-yellow-200">EMAIL</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#222] text-yellow-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label className="block text-center font-bold mb-2 text-yellow-200">CONTRASEÑA</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#222] text-yellow-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-200 cursor-pointer select-none"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </span>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-yellow-200 text-black py-3 px-16 font-bold tracking-wider rounded-xl shadow-md hover:bg-yellow-300 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                INGRESAR
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-yellow-200 space-y-4 w-full">
            <div className="flex justify-center items-center">
              <span className="mr-2">AÚN NO TIENES UNA CUENTA?</span>
              <span
                onClick={() => navigate("/register")}
                className="text-red-400 font-bold underline cursor-pointer select-none"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") navigate("/register");
                }}
              >
                REGÍSTRATE
              </span>
            </div>

            <div>
              <span
                onClick={() => navigate("/")}
                className="text-red-400 font-bold underline cursor-pointer select-none"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") navigate("/");
                }}
              >
                ¿HAS OLVIDADO TU CONTRASEÑA?
              </span>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
}
