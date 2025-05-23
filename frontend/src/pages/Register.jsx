import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import { registerUser } from "../services/authService"; 
import Alert from "../components/Alert";
import { useMessageHandler } from "../utils/messageHandler";

export default function Register() {
  const navigate = useNavigate();
  const {
    error,
    errorMessage,
    success,
    successMessage,
    clearMessages,
    showError,
    showSuccess
  } = useMessageHandler();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

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

    try {
      await registerUser(formData);
      showSuccess("Registro exitoso.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      showError(err.message);
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#f0d989] p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-black mr-2"></div>
            <span className="font-bold text-lg">LOGO EMPRESA</span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="bg-red-500 w-8 h-8 flex items-center justify-center rounded hover:bg-red-600 focus:outline-none"
            aria-label="Cerrar">
            <X className="w-6 h-6 text-black" />
            X
          </button> 
        </div>

        <div className="space-y-4">
          {error && <Alert message={errorMessage} type="error" onClose={clearMessages} />}
          {success && <Alert message={successMessage} type="success" onClose={clearMessages} />}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 text-black">
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

            <div className="flex justify-center items-center mt-6 text-black font-bold">
              <span>LEÍ Y ACEPTO LOS TÉRMINOS Y CONDICIONES</span>
              <button
                type="button"
                className={`ml-4 w-8 h-8 flex items-center justify-center ${acceptTerms ? "bg-red-500" : "bg-gray-300"}`}
                onClick={() => setAcceptTerms(!acceptTerms)}
              >
                {acceptTerms && <X className="text-white w-5 h-5"/> }
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                type="submit"
                className="bg-[#5c5b40] text-[#f0d989] py-3 font-bold tracking-wider hover:bg-[#4a4933] transition-colors"
              >
                REGISTRARSE
              </button>
              <button
                type="button"
                className="bg-red-500 text-white py-3 font-bold tracking-wider hover:bg-red-600 transition-colors"
              >
                TÉRMINOS Y CONDIC
              </button>
            </div>
          </div>
        </form>

        <div className="mt-6 text-center text-black">
          <p className="mb-2">
            YA TENÉS CUENTA?{" "}
            <button className="text-red-600 font-bold" onClick={() => navigate("/login")}>
              INICIÁ SESIÓN
            </button>
          </p>
          <p>
            OLVIDASTE TU CONTRASEÑA?{" "}
            <button className="text-red-600 font-bold">RESETEALA</button>
          </p>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-center font-bold mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-[#222] text-[#f0d989] p-2 focus:outline-none"
        required
      />
    </div>
  );
}

function PasswordInput({ label, name, value, onChange, show, toggle }) {
  return (
    <div>
      <label className="block text-center font-bold mb-1">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-[#222] text-[#f0d989] p-2 focus:outline-none"
          required
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={toggle}
        >
          {show ? <Eye className="w-5 h-5 text-[#f0d989]" /> : <EyeOff className="w-5 h-5 text-[#f0d989]" />}
        </button>
      </div>
    </div>
  );
}
