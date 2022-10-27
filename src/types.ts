export interface GetRateResponse {
  rate: number;
  fetchedRates?: string;
}

export type Credentials = {
  from: string;
  to: string;
};

export interface GetRateError {
  errorMessage: string;
}

export type EventType = {
  target: { name: string; value: string };
};

export type CurrencyFieldProps = {
  numberField: string;
  defaultCurrency: string;
  amount: string | number;
  onCurrencyChange: (e: EventType) => void;
  onAmountChange: (e: EventType) => void;
};
