import React from "react"
import Alert from "../components/Alert"
import { useMessageHandler } from "../utils/messageHandler"

const CreateTournamentModal = ({ isOpen, onClose, form, setForm, onCreate, modes }) => {
  const {
    error,
    errorMessage,
    clearMessages,
    showError
  } = useMessageHandler();

  if (!isOpen) return null

  const validateForm = () => {
    if (!form.name.trim()) {
      showError("El nombre del torneo es requerido");
      return false;
    }
    if (!form.mode) {
      showError("Debes seleccionar un modo de juego");
      return false;
    }
    if (!form.start_date) {
      showError("La fecha de inicio es requerida");
      return false;
    }
    if (!form.start_time) {
      showError("La hora de inicio es requerida");
      return false;
    }
    if (!form.prize || form.prize < 0) {
      showError("El premio no puede ser negativo");
      return false;
    }
    if (!form.players_amount || form.players_amount < 2 || form.players_amount % 2 !== 0) {
      showError("La cantidad de jugadores debe ser un número par mayor o igual a 2");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "players_amount") {
      const num = parseInt(value, 10)
      if (isNaN(num) || num < 2 || num > 100 || num % 2 !== 0) return
      setForm(prev => ({ ...prev, [name]: num })) 
      return
    }
    if (name === "prize") {
      const num = parseFloat(value)
      if (isNaN(num) || num < 0) return
      setForm(prev => ({ ...prev, [name]: num }))
      return
    }
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    clearMessages();
    if (validateForm()) {
      try {
        await onCreate(form);
      } catch (err) {
        showError(err.message);
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#f5e5b5] p-6 rounded-none shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center uppercase bg-[#222] text-white py-2">
          Crear Torneo
        </h2>
        <div className="space-y-4">
          {error && <Alert message={errorMessage} type="error" onClose={clearMessages} />}
          
          <input
            type="text"
            name="name"
            placeholder="NOMBRE TORNEO"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 bg-[#222] text-white border-none rounded-none placeholder-white uppercase"
          />

          <select
            name="mode"
            value={form.mode}
            onChange={handleChange}
            className="w-full p-3 bg-[#222] text-white border-none rounded-none uppercase appearance-none"
          >
            <option value="">MODO</option>
            {modes.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            placeholder="DESCRIPCIÓN"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 bg-[#222] text-white border-none rounded-none placeholder-white uppercase resize-none"
            rows={3}
          />

          <input
            type="number"
            name="players_amount"
            placeholder="CANTIDAD DE JUGADORES"
            value={form.players_amount}
            onChange={handleChange}
            className="w-full p-3 bg-[#222] text-white border-none rounded-none placeholder-white uppercase text-center"
            min={2}
            max={100}
            step={2}
          />

          <div className="grid grid-cols-2 gap-0">
            <div className="bg-black p-3 flex items-center justify-center uppercase font-medium text-white">
              FECHA INICIO
            </div>
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              className="w-full p-3 bg-[#222] text-white border-none rounded-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-0">
            <div className="bg-black p-3 flex items-center justify-center uppercase font-medium text-white">
              HORA INICIO
            </div>
            <input
              type="time"
              name="start_time"
              value={form.start_time}
              onChange={handleChange}
              className="w-full p-3 bg-[#222] text-white border-none rounded-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-0">
            <div className="bg-black p-3 flex items-center justify-center uppercase font-medium text-white">
              PREMIO
            </div>
            <input
              type="number"
              name="prize"
              placeholder="5.000 PTS"
              value={form.prize}
              onChange={handleChange}
              className="w-full p-3 bg-[#222] text-white border-none rounded-none text-center"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-[#e74c3c] text-white px-8 py-2 uppercase font-medium hover:bg-[#c0392b]"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#e74c3c] text-white px-8 py-2 uppercase font-medium hover:bg-[#c0392b]"
            type="button"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateTournamentModal
