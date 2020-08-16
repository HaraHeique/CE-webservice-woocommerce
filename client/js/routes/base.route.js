export const PORT = "5000";
export const PORT_FAKE_API = "3000"
export const PREFIX = "webservice";

export const defaultHosts = {
  localhost: `localhost:${PORT}`,
  localhostFakeApi: `localhost:${PORT_FAKE_API}`,
  customLocalHost: `10.0.2.15:${PORT}`
};

export const USE_FAKE_API = false;

export const baseUrl = USE_FAKE_API ? `http://${defaultHosts.localhostFakeApi}` :
                                      `http://${defaultHosts.localhost}/${PREFIX}`;