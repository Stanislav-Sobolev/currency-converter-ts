import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useAllSelectors = () => {
  const headerRate1 = useSelector(
    (state: RootState) => state.currency.savedRates["UAHUSD"]
  );
  const headerRate2 = useSelector(
    (state: RootState) => state.currency.savedRates["UAHEUR"]
  );
  const headerCurrencies = useSelector(
    (state: RootState) => state.currency.headerCurrencies
  );

  const currency1 = useSelector((state: RootState) => state.currency.currency1);
  const currency2 = useSelector((state: RootState) => state.currency.currency2);
  const defaultCurrency1 = useSelector(
    (state: RootState) => state.currency.defaultCurrency1
  );
  const defaultCurrency2 = useSelector(
    (state: RootState) => state.currency.defaultCurrency2
  );
  const rate = useSelector((state: RootState) => state.currency.rate);
  const supportedCurrencies = useSelector(
    (state: RootState) => state.currency.supportedCurrencies
  );
  const pending = useSelector((state: RootState) => state.currency.pending);
  const error = useSelector((state: RootState) => state.currency.error);

  return {
    headerRate1,
    headerRate2,
    headerCurrencies,
    currency1,
    currency2,
    defaultCurrency1,
    defaultCurrency2,
    rate,
    supportedCurrencies,
    pending,
    error,
  };
};
