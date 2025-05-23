import { Eye, Trophy, HandshakeIcon, ShoppingCart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#e63054] fixed bottom-0 left-0 w-full z-10 p-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {[Eye, Trophy].map((Icon, index) => (
            <div key={index} className="w-12 h-12 bg-black flex items-center justify-center">
              <Icon className="w-8 h-8 text-[#f0d989]" />
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="w-12 h-12 bg-black flex items-center justify-center">
            <HandshakeIcon className="w-8 h-8 text-[#f0d989]" />
          </div>
          <div className="w-12 h-12 bg-black flex items-center justify-center">
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-b-[24px] border-b-[#f0d989] border-r-[12px] border-r-transparent"></div>
          </div>
          <div className="w-12 h-12 bg-black flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-[#f0d989]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
