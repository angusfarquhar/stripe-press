export const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const API_ROUTES = {
  PRODUCTS: {
    BASE: `${API_BASE_URL}/v1/products`,
    SEARCH: `${API_BASE_URL}/v1/products/search`,
  },
  CHECKOUT: {
    BASE: `${API_BASE_URL}/v1/checkouts`,
  },
  PAYMENTS: {
    BASE: `${API_BASE_URL}/v1/payments`,
  },
};
