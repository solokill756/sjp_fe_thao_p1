export interface SelectOption {
  value: string;
  label: string;
}
export interface FormState {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  streetAddress: string;
  apartment: string;
  townCity: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  createAccount: boolean;
  shipToDifferentAddress: boolean;
  orderNotes: string;
  shippingMethod: string;
  paymentMethod: string;
  agreeTerms: boolean;
}

export const countryOptions: SelectOption[] = [
  { value: 'US', label: 'United States (US)' },
  { value: 'VN', label: 'Vietnam (VN)' },
];

export const stateOptions: SelectOption[] = [
  { value: 'CA', label: 'California' },
  { value: 'DN', label: 'Da Nang' },
  { value: 'HN', label: 'Ha Noi' },
];
