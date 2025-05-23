import React from "react"

const CreateTournamentModal = ({ isOpen, onClose, form, setForm, onCreate, modes }) => {
  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    onCreate(form)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#f5e5b5] p-6 rounded-none shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center uppercase bg-[#222] text-white py-2">
          Crear Torneo
        </h2>
        <div className="space-y-4">
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
            className="bg-transparent px-6 py-2 uppercase font-medium"
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