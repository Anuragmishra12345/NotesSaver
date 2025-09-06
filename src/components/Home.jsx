import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPaste, updateToPaste } from '../redux/PasteSlice';
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.pastes.pastes);

  // ✅ Pre-fill form if editing
  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId,pastes]);

  function createPaste() {
    if (!title.trim() || !value.trim()) {
    toast.error("Please enter both title and content!");
    return;
  }
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      {/* Title Input + Button */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Enter title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createPaste}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all"
        >
          {pasteId ? "Update My Note" : "Create My Note"}
        </button>
      </div>

      {/* Textarea */}
      <div className="mt-6">
        <textarea
          className="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 p-4 text-gray-700 resize-none"
          value={value}
          placeholder="Enter your content here..."
          onChange={(e) => setValue(e.target.value)}
          rows={15}
        />
      </div>
    </div>
  );
};

export default Home;
