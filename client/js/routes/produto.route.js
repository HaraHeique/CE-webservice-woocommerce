const PORT = "4200";
const PORT_FAKE_API = "3000"
const PREFIX = "webservice";

const defaultHosts = {
  localhost: `localhost:${PORT}`,
  localhostFakeApi: `localhost:${PORT_FAKE_API}`,
  customLocalHost: `10.0.2.15:${PORT}`
};

const USE_FAKE_API = true;

export const baseUrl = USE_FAKE_API ? `http://${defaultHosts.localhostFakeApi}` :
                                      `http://${defaultHosts.localhost}/${PREFIX}`;

export const endpoints = {
  getAllProducts: `${baseUrl}/produto`,
  getProductById: `${baseUrl}/produto/{id}`,
  addProduct: `${baseUrl}/produto`,
  deleteProduct: `${baseUrl}/produto/{id}`,
  updateProduct: `${baseUrl}/produto/{id}`
}