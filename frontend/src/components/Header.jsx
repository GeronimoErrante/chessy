import { ArrowLeft, User, Info, Menu, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="p-4 flex justify-between items-center">
      <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-12 h-12 text-[#f0d989]" />
      </button>
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg hidden md:block"></span>
        <div className="flex gap-1">
          {[User, Info, Menu, Settings].map((Icon, index) => (
            <div key={index} className="w-10 h-10 bg-[#f0d989] flex items-center justify-center">
              <Icon className="w-6 h-6 text-black" />
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
