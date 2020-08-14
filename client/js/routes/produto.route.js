const PORT = "8080";
const PREFIX = "webservice";

const defaultHosts = {
  localhost: `127.0.0.1:${PORT}`,
  customLocalHost: `10.0.2.15:${PORT}`
};

export const baseUrl = `http://${defaultHosts.customLocalHost}/${PREFIX}`;

export const endpoints = {
  getAllProducts: `${baseUrl}/produto`,
  getProductById: `${baseUrl}/produto/{id}`,
  addProduct: `${baseUrl}/produto`,
  deleteProduct: `${baseUrl}/produto/{id}`,
  updateProduct: `${baseUrl}/produto`,
  statsProducts: `${baseUrl}/stats`
}