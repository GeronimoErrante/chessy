import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import { registerUser } from "../services/authService"; 
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import { useMessageHandler } from "../utils/messageHandler";

export default function Register() {
  const navigate = useNavigate();
  const {
    error,
    errorMessage,
    clearMessages,
    showError
  } = useMessageHandler();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptTerms) {
      showError("Debés aceptar los términos y condiciones.");
      return;
    }

    setIsLoading(true);
    try {
      await registerUser(formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate("/login");
    } catch (err) {
      showError(err.message);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    navigate("/");
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
            <button
              type="button"
              onClick={handleClose}
              className="bg-red-500 w-8 h-8 flex items-center justify-center rounded hover:bg-red-600 focus:outline-none"
              aria-label="Cerrar">
              <X className="w-6 h-6 text-white" />
            </button> 
          </div>

          <div className="space-y-4 w-full">
            {error && <Alert message={errorMessage} type="error" onClose={clearMessages} />}
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="space-y-4 text-yellow-200">
              <InputField label="NOMBRE" name="first_name" value={formData.first_name} onChange={handleChange} />
              <InputField label="APELLIDO" name="last_name" value={formData.last_name} onChange={handleChange} />
              <InputField label="NOMBRE DE USUARIO" name="username" value={formData.username} onChange={handleChange} />
              <InputField label="EMAIL" type="email" name="email" value={formData.email} onChange={handleChange} />
              <PasswordInput
                label="CONTRASEÑA"
                name="password"
                value={formData.password}
                onChange={handleChange}
                show={showPassword}
                toggle={() => setShowPassword((prev) => !prev)}
              />
              <PasswordInput
                label="REPETIR CONTRASEÑA"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                show={showConfirmPassword}
                toggle={() => setShowConfirmPassword((prev) => !prev)}
              />

              <div className="flex justify-center items-center mt-6 text-yellow-200 font-bold">
                <span>LEÍ Y ACEPTO LOS TÉRMINOS Y CONDICIONES</span>
                <button
                  type="button"
                  className={`ml-4 w-8 h-8 flex items-center justify-center ${acceptTerms ? "bg-red-500" : "bg-gray-700"} rounded transition-colors`}
                  onClick={() => setAcceptTerms(!acceptTerms)}
                >
                  {acceptTerms && <X className="text-white w-5 h-5"/> }
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <button
                  type="submit"
                  className="bg-yellow-200 text-black py-3 font-bold tracking-wider rounded-xl shadow-md hover:bg-yellow-300 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  REGISTRARSE
                </button>
                <button
                  type="button"
                  className="bg-yellow-200 text-black py-3 font-bold tracking-wider rounded-xl shadow-md hover:bg-yellow-300 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  TÉRMINOS Y CONDIC
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6 text-center text-yellow-200 w-full">
            <p className="mb-2">
              YA TENÉS CUENTA?{" "}
              <button className="bg-yellow-200 text-black py-2 px-4 font-bold tracking-wider rounded-xl shadow-md hover:bg-yellow-300 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 ml-2" onClick={() => navigate("/login")}>INICIÁ SESIÓN</button>
            </p>
            <p>
              OLVIDASTE TU CONTRASEÑA?{" "}
              <button className="bg-yellow-200 text-black py-2 px-4 font-bold tracking-wider rounded-xl shadow-md hover:bg-yellow-300 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 ml-2">RESETEALA</button>
            </p>
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
}

function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-center font-bold mb-1 text-yellow-200">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-[#222] text-yellow-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
        required
      />
    </div>
  );
}

function PasswordInput({ label, name, value, onChange, show, toggle }) {
  return (
    <div>
      <label className="block text-center font-bold mb-1 text-yellow-200">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-[#222] text-yellow-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={toggle}
        >
          {show ? <Eye className="w-5 h-5 text-yellow-200" /> : <EyeOff className="w-5 h-5 text-yellow-200" />}
        </button>
      </div>
    </div>
  );
}
