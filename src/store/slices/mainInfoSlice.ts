import { createSlice } from "@reduxjs/toolkit";
import { myMainInfo } from "../../const";

const initialState: myMainInfo = {
  step1: {
    teyinat: "",
    tesnifat: "",
    nomenklatur: "",
    konfidensial: false,
    mezmun: ""
  },
  step2: {
    emrinMezmunu: "",
    preambula: "",
    bendler: [],
    esas_metn: ""
  },
  step3: {},
  step4: {
    imzalama: {}
  }
};
export const mainInfoSlice = createSlice({
  name: "mainInfo",
  initialState,
  reducers: {
    //Pushing step1 information
    setStep1: (state: myMainInfo, action: any) => {
      state.step1 = {
        ...state.step1,
        [action.payload.key]: action.payload.value
      };
      localStorage.setItem("step1", JSON.stringify(state.step1));
    },
    //Pushing step2 Emrin mezmunu
    setStep2_emrMezmun: (state: myMainInfo, { payload }) => {
      state.step2.emrinMezmunu = payload;
    },
    //Pushing step2 Preambula
    setStep2_preambula: (state: myMainInfo, { payload }) => {
      state.step2.preambula = payload;
    },
    //Pushing step2 Esas- metn
    setStep2_esasMetn: (state: myMainInfo, { payload }) => {
      state.step2.esas_metn = payload;
    },
    //Pushing step2  bend to table
    setStep2_bendler: (state: myMainInfo, action: any) => {
      // state.step2={...state.step2, bendler:[...state.step2.bendler, action.payload]}
      state.step2.bendler = [...state.step2.bendler, action.payload];
      console.log(action.payload);
    },
    //Change step2 table to the new value
    setStep2_edit: (state: myMainInfo, action: any) => {
      state.step2.bendler = state.step2.bendler.map((item: any) => {
        if (item.id === action.payload.id) {
          return { ...item, bend: action.payload.newValue };
        } else return item;
      });
    },
    //Remove step2 table info
    setStep2_remove: (state: myMainInfo, { payload }) => {
      state.step2.bendler = state.step2.bendler.filter(
        (item: any) => item.id !== payload
      );
    },
    // Pushing step4 info to the object
    setStep4_imza: (state: myMainInfo, { payload }) => {
      state.step4.imzalama = payload;
    },
    //Remove info from object
    setStep4_RemoveImza: (state: myMainInfo, { payload }) => {
      state.step4.imzalama = Object.keys(
        state.step4.imzalama
      ).filter((item: any) => {
        item.id !== payload;
      });
    }
  }
});
export default mainInfoSlice.reducer;
export const {
  setStep1,
  setStep2_bendler,
  setStep2_remove,
  setStep2_edit,
  setStep4_imza,
  setStep2_emrMezmun,
  setStep2_preambula,
  setStep2_esasMetn,
  setStep4_RemoveImza
} = mainInfoSlice.actions;
