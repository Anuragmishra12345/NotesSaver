import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPaste, resetToPastes } from '../redux/PasteSlice';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

import {
  Pencil,
  Eye,
  Trash2,
  Copy,
  Share2,
  Calendar,
  RotateCcw
} from "lucide-react";

const Pastes = () => {
  const pastes = useSelector((state) => state.pastes.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredData = pastes.filter((paste) =>
    paste.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleEdit(paste) {
    navigate(`/home?pasteId=${paste._id}`);
  }

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
    toast.error("Note deleted");
  }

  function handleShare(paste) {
    const url = `${window.location.origin}/pastes/${paste._id}`;
    if (navigator.share) {
      navigator
        .share({
          title: paste.title,
          text: "Check out my note!",
          url: url,
        })
        .then(() => toast.success("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Search bar */}
      <input
        className="p-3 rounded-lg w-full md:w-[600px] mt-5 border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="search"
        placeholder="Search your notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Notes list */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="flex flex-col justify-between border rounded-xl shadow-md p-5 bg-white hover:shadow-lg transition"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {paste.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-5">
                  {paste.content}
                </p>
              </div>

              {/* Action buttons */}
              <div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleEdit(paste)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" title='edit'
                  >
                    <Pencil size={18} />
                  </button>
                  <a
                    href={`/pastes/${paste._id}`}
                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition" title='view'
                  >
                    <Eye size={18} />
                  </a>
                  <button
                    onClick={() => handleDelete(paste?._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition" title='delete'
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard");
                    }}
                    className="px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition" title='copy'
                  >
                    <Copy size={18} />
                  </button>
                  <button
                    onClick={() => handleShare(paste)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition" title='share'
                  >
                    <Share2 size={18} />
                  </button>
                </div>

                <div className="mt-3 text-sm text-gray-500 flex items-center gap-2">
  <Calendar size={16} className="text-gray-400" />
  {new Date(paste.createdAt).toLocaleString()}
</div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10 col-span-full">
            No notes found. Try creating one!
          </p>
        )}
      </div>

      {/* Reset button */}
      {pastes.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={() => {
              dispatch(resetToPastes());
              toast.success("All notes reset");
            }}
            className="mt-10 flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md"
          >
           <RotateCcw size={18} />
           Resel All
          </button>
        </div>
      )}
    </div>
  );
};

export default Pastes;
