import { useState } from "react"
import { X, Eye, EyeOff } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../services/authService"

export default function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
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
    setError(null);
    try {
      const data = await loginUser(formData);
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      navigate("/tournaments");
    } catch (err) {
      setError(err.detail || "Credenciales incorrectas.");
    }
  };

   return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#f0d989] p-8 relative rounded-md shadow-md">
        <div className="flex justify-between items-center mb-10 relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-0 right-0 bg-red-600 rounded-full p-1 hover:bg-red-700"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-center font-bold mb-2 text-black">EMAIL</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-black text-yellow-400 p-3 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#f0d989]"
              required
            />
          </div>

          <div>
            <label className="block text-center font-bold mb-2 text-black">CONTRASEÑA</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-black text-yellow-400 p-3 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#f0d989]"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400 cursor-pointer select-none"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </span>
            </div>
          </div>

          {error && (
            <div className="text-center text-red-700 font-bold">{error}</div>
          )}

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-[#5c5b40] text-[#f0d989] py-3 px-16 font-bold tracking-wider hover:bg-[#4a4933] transition-colors rounded"
            >
              INGRESAR
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-black space-y-4">
          <div className="flex justify-center items-center">
            <span className="mr-2">AÚN NO TIENES UNA CUENTA?</span>
            <span
              onClick={() => navigate("/register")}
              className="text-red-600 font-bold underline cursor-pointer select-none"
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
              className="text-red-600 font-bold underline cursor-pointer select-none"
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
  );
}
