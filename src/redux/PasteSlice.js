import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes:localStorage.getItem("pastes")?JSON.parse(localStorage.getItem("pastes")):[]
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPaste:(state,action)=>{
      const paste=action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes",JSON.stringify(state.pastes));
      toast.success("Paste created successfully");
    },
    updateToPaste:(state,action)=>{
      const paste = action.payload;
      const index = state.pastes.findIndex(p => p._id === paste._id);
      if (index !== -1) {
        state.pastes[index] = paste;
        toast.success("Paste updated successfully!");
      }
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
    },
    resetToPastes:(state,action)=>{
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes cleared!");
    },
    removeFromPaste:(state,action)=> {
      const pasteId = action.payload;
      state.pastes = state.pastes.filter((p) => p._id !== pasteId);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Deleted Successfully");
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, resetToPastes,removeFromPaste } = pasteSlice.actions

export default pasteSlice.reducer 