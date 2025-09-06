import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Calendar} from "lucide-react";

const ViewPastes = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.pastes.pastes);

  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return <p className="text-center text-red-500 mt-10 text-lg font-semibold">⚠️ Paste not found!</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border">
      {/* Title */}
      <div className="flex flex-row gap-7">
        <input
          className="w-full p-3 rounded-xl border text-lg font-semibold bg-gray-50"
          type="text"
          value={paste.title}
          disabled
        />
      </div>

      {/* Content */}
      <div className="mt-5">
        <textarea
          className="w-full rounded-xl mt-4 min-h-[300px] p-4 border bg-gray-50 text-gray-700"
          value={paste.content}
          rows={20}
          disabled
        />
      </div>

      {/* Footer */}
      <div className="mt-3 text-sm text-gray-500 flex items-center gap-2">
        <Calendar size={16} className="text-gray-400" />
        {new Date(paste.createdAt).toLocaleString()}
      </div>
    </div>
  );
};

export default ViewPastes;
