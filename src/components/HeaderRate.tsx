import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EuroIcon from "@mui/icons-material/Euro";
import { useEffect } from "react";
import currencyOperations from "../redux/currencyOperations";
import { useDispatch } from "react-redux";
import { useAllSelectors } from "../hooks/useAllSelectors";
import { AppDispatch } from "../redux/store";

export const HeaderRate: React.FC<{ className: string }> = () => {
  const dispatch: AppDispatch = useDispatch();

  const { headerRate1, headerRate2, headerCurrencies } = useAllSelectors();

  useEffect(() => {
    headerCurrencies.forEach((el) => {
      dispatch(currencyOperations.getHeaderRateApi({ from: "UAH", to: el }));
    });
  }, [headerCurrencies, dispatch]);

  return (
    <div className="headerRateList">
      <div className="headerRateItem">
        <AttachMoneyIcon sx={{ fontSize: 22 }} />
        {headerRate1}
      </div>
      <div className="headerRateItem">
        <EuroIcon sx={{ fontSize: 20 }} />
        {headerRate2}
      </div>
    </div>
  );
};
