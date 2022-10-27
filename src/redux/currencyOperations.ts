import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { Credentials, GetRateResponse, GetRateError } from "../types";
import { RootState } from "../redux/store";

const apiKey = "e3ccf9546dc351bab55215ba";
axios.defaults.baseURL = `https://v6.exchangerate-api.com/v6/${apiKey}/pair`;

const getRateApi = createAsyncThunk<
  GetRateResponse,
  Credentials,
  {
    state: RootState;
    rejectValue: GetRateError;
  }
>("currency/getRateApi", async (credentials, thunkAPI) => {
  try {
    const { from, to } = credentials;
    const state = thunkAPI.getState();
    const savedRates = state.currency.savedRates;

    const fetchedRates = from + to;

    if (savedRates[fetchedRates]) {
      return { rate: Number(savedRates[fetchedRates]) };
    }

    const { data } = await axios.get(`/${from}/${to}`);
    return { rate: data.conversion_rate, fetchedRates };
  } catch (error: any) {
    toast.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

const getHeaderRateApi = createAsyncThunk<
  GetRateResponse,
  Credentials,
  {
    state: RootState;
    rejectValue: GetRateError;
  }
>("currency/getHeaderRateApi", async (credentials, thunkAPI) => {
  try {
    const { from, to } = credentials;
    const state = thunkAPI.getState();
    const savedRates = state.currency.savedRates;
    const fetchedRates = from + to;

    if (savedRates[fetchedRates]) {
      return { rate: Number(savedRates[fetchedRates]) };
    }

    const { data } = await axios.get(`/${from}/${to}`);
    return { rate: data.conversion_rate, fetchedRates };
  } catch (error: any) {
    toast.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

const currencyOperations = {
  getRateApi,
  getHeaderRateApi,
};
export default currencyOperations;
