import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="animate-spin text-6xl text-[#f0d989]">
        ♟
      </div>
    </div>
  );
};

export default Loader; 