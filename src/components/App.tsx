import React from "react";
import { HeaderRate } from "./HeaderRate";
import { useState, useEffect } from "react";
import { CurrencyField } from "./CurrencyField";
import currencyOperations from "../redux/currencyOperations";
import { useDispatch } from "react-redux";
import { changeCurrency1, changeCurrency2 } from "../redux/currencySlice";
import { useAllSelectors } from "../hooks/useAllSelectors";
import BarLoader from "react-spinners/BarLoader";
import { Toaster } from "react-hot-toast";
import { AppDispatch } from "../redux/store";
import { EventType } from "../types";

export const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const {
    currency1,
    currency2,
    defaultCurrency1,
    defaultCurrency2,
    rate,
    pending,
  } = useAllSelectors();

  const [amount1, setAmount1] = useState<string | number>(1);
  const [amount2, setAmount2] = useState<string | number>(1);

  useEffect(() => {
    dispatch(currencyOperations.getRateApi({ from: currency1, to: currency2 }));
  }, [currency1, currency2, dispatch]);

  useEffect(() => {
    if (rate) {
      setAmount1((prev) => {
        setAmount2(Number((Number(prev) * Number(rate)).toFixed(2)));
        return prev;
      });
    }
  }, [rate, dispatch]);

  function handleCurrencyChange(e: EventType) {
    const selector = e.target.name;
    const { value } = e.target;
    if (selector === "1") {
      dispatch(changeCurrency1(value));
    } else {
      dispatch(changeCurrency2(value));
    }
  }

  function handleAmountChange(e: EventType) {
    const selector = e.target.name;
    const value = e.target.value.trim();

    if (value === "") {
      setAmount1("");
      setAmount2("");
      return;
    }

    if (selector === "1") {
      setAmount2(Number.parseFloat((Number(value) * Number(rate)).toFixed(2)));
      setAmount1(Number(value));
    } else {
      setAmount1(Number.parseFloat((Number(value) / Number(rate)).toFixed(2)));
      setAmount2(Number(value));
    }
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className="header">
        <HeaderRate className="headerRate" />
      </div>
      <div className="loadSpinner">
        <BarLoader color="#36d7b7" width={220} loading={pending} />
      </div>
      <div className="carrencyFieldWrapper">
        <CurrencyField
          numberField="1"
          defaultCurrency={defaultCurrency1}
          amount={amount1}
          onCurrencyChange={handleCurrencyChange}
          onAmountChange={handleAmountChange}
        />
        <CurrencyField
          numberField="2"
          defaultCurrency={defaultCurrency2}
          amount={amount2}
          onCurrencyChange={handleCurrencyChange}
          onAmountChange={handleAmountChange}
        />
      </div>
    </>
  );
};
