import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  getData: null,
  isLoading: true,
  grapState1: null,
  grapState2: null,
  grapState3: null,
  checkLoading: false,
  checkBoxId:null
};
const CvSlice = createSlice({
  name: "CvSlice",
  initialState,
  reducers: {
    setData(state, action) {
      state.getData = action.payload;
    },
    setloading(state, action) {
      state.isLoading = action.payload;
    },
    setGraphState1(state, action) {

      state.grapState1 = action.payload;
    },
    setGraphState2(state, action) {
      state.grapState2 = action.payload;
    },
    setGraphState3(state, action) {
      state.grapState3 = action.payload;
    },
    setCheckloading(state,action){
        state.checkLoading=action.payload
    },
    setCheckBoxId(state,action){
      
      state.checkBoxId=action.payload
  }
  },
});
export const { setData, setloading,setGraphState1,setGraphState3,setGraphState2,setCheckloading,setCheckBoxId } = CvSlice.actions;
export default CvSlice.reducer;
