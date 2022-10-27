import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import currencyOperations from "./currencyOperations";

type CurrencyState = {
  headerCurrency1: string;
  headerCurrency2: string;
  headerCurrencies: string[];
  defaultCurrency1: string;
  defaultCurrency2: string;
  currency1: string;
  currency2: string;
  rate: string | number;
  savedRates: { [x: string]: number | string };
  supportedCurrencies: Array<string>;
  pending: boolean;
  error: string;
};

const initialState: CurrencyState = {
  headerCurrency1: "USD",
  headerCurrency2: "EUR",
  headerCurrencies: ["USD", "EUR"],
  defaultCurrency1: "UAH",
  defaultCurrency2: "USD",
  currency1: "UAH",
  currency2: "USD",
  rate: "",
  savedRates: { UAHUSD: "", UAHEUR: "" },
  supportedCurrencies: ["UAH", "USD", "EUR", "GBP"], // Add more currencies here
  pending: false,
  error: "",
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurrency1: (state, action: PayloadAction<string>) => {
      state.currency1 = action.payload;
    },
    changeCurrency2: (state, action: PayloadAction<string>) => {
      state.currency2 = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(currencyOperations.getRateApi.fulfilled, (state, action) => {
        const isNewRate = action.payload.fetchedRates;
        if (isNewRate) {
          state.savedRates[isNewRate] = action.payload.rate;
        }
        state.rate = action.payload.rate;
        state.pending = false;
        state.error = "";
      })
      .addCase(currencyOperations.getRateApi.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = "Error! Try again";
        }

        state.pending = false;
      })
      .addCase(currencyOperations.getRateApi.pending, (state) => {
        state.pending = true;
      })

      .addCase(
        currencyOperations.getHeaderRateApi.fulfilled,
        (state, action) => {
          const isNewRate = action.payload.fetchedRates;
          if (isNewRate) {
            state.savedRates[isNewRate] = action.payload.rate;
          }
          state.pending = false;
          state.error = "";
        }
      )
      .addCase(
        currencyOperations.getHeaderRateApi.rejected,
        (state, action) => {
          if (action.payload) {
            state.error = action.payload.errorMessage;
          } else {
            state.error = "Error! Try again";
          }

          state.pending = false;
        }
      )
      .addCase(currencyOperations.getHeaderRateApi.pending, (state) => {
        state.pending = true;
      })
      .addDefaultCase((state, action) => {
        state.error = "Wrong request! Try again";
      });
  },

  // [currencyOperations.getRateApi.fulfilled](
  //   state,
  //   action: PayloadAction<{ rate: number; fetchedRates?: string }>
  // ) {
  //   const isNewRate = action.payload.fetchedRates;
  //   if (isNewRate) {
  //     state.savedRates[isNewRate] = action.payload.rate;
  //   }
  //   state.rate = action.payload.rate;
  //   state.pending = false;
  // },

  //   [currencyOperations.getRateApi.pending](state) {
  //     state.pending = true;
  //   },

  // [currencyOperations.getRateApi.rejected](state, action) {
  //   if (action.payload) {
  //     state.error = action.payload.errorMessage;
  //   } else {
  //     state.error = action.error;
  //   }

  //   state.pending = false;
  // },

  // [currencyOperations.getHeaderRateApi.fulfilled](
  //   state,
  //   action: PayloadAction<{ rate: string; fetchedRates?: string }>
  // ) {
  //   const isNewRate = action.payload.fetchedRates;
  //   if (isNewRate) {
  //     state.savedRates[isNewRate] = action.payload.rate;
  //   }
  //   state.pending = false;
  // },
  // [currencyOperations.getHeaderRateApi.pending](state) {
  //   state.pending = true;
  // },
  // [currencyOperations.getHeaderRateApi.rejected](
  //   state,
  //   action: PayloadAction<string>
  // ) {
  //   state.error = action.payload;
  //   state.pending = false;
  // },
});

export const { changeCurrency1, changeCurrency2 } = currencySlice.actions;
