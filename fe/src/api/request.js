import axios from "axios";

const BASE_ROUTE = "/api/v1";

export class ApiRequest {
  /**
   *
   * @param {string} endpoint
   * @param {{
   *  authenticate?: boolean,
   *  query?: object
   * }} options
   * @returns {object}
   */
  static async get(endpoint, options = {}) {
    try {
      /** @type {import("axios").AxiosRequestConfig} */
      let axiosOptions = {};
      if (options.authenticate) {
        let access_token = sessionStorage.getItem("access_token");
        if (access_token) {
          axiosOptions.headers = { Authorization: `Bearer ${sessionStorage.getItem("access_token")}` };
        } else {
          throw new Error(`Cannot authenticate api ${endpoint}, access_token is not saved`);
        }
      }
      if (options.query) axiosOptions.params = options.query;
      let response = await axios.get(`${BASE_ROUTE}/${endpoint}`, axiosOptions);
      if (response.status < 400) {
        return Promise.resolve(response.data);
      } else {
        throw new Error(`Error ${response.status} calling ${endpoint} api`);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   *
   * @param {string} endpoint
   * @param {{
   *  authenticate?: boolean,
   *  query?: object,
   *  data?: object
   * }} options
   * @returns {object}
   */
  static async post(endpoint, options = {}) {
    try {
      /** @type {import("axios").AxiosRequestConfig} */
      let axiosOptions = {};
      if (options.authenticate) {
        let access_token = sessionStorage.getItem("access_token");
        if (access_token) {
          axiosOptions.headers = { Authorization: `Bearer ${sessionStorage.getItem("access_token")}` };
        } else {
          throw new Error(`Cannot authenticate api ${endpoint}, access_token is not saved`);
        }
      }
      if (options.query) axiosOptions.data = options.query;
      let response = await axios.post(`${BASE_ROUTE}/${endpoint}`, options.data || null, axiosOptions);
      if (response.status < 400) {
        return Promise.resolve(response.data);
      } else {
        throw new Error(`Error ${response.status} calling ${endpoint} api`);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   *
   * @param {string} endpoint
   * @param {{
   *  authenticate?: boolean,
   *  query?: object,
   *  data?: object
   * }} options
   * @returns {object}
   */
  static async delete(endpoint, options = {}) {
    try {
      /** @type {import("axios").AxiosRequestConfig} */
      let axiosOptions = {};
      if (options.authenticate) {
        let access_token = sessionStorage.getItem("access_token");
        if (access_token) {
          axiosOptions.headers = { Authorization: `Bearer ${sessionStorage.getItem("access_token")}` };
        } else {
          throw new Error(`Cannot authenticate api ${endpoint}, access_token is not saved`);
        }
      }
      if (options.query) axiosOptions.data = options.query;
      if (options.data) axiosOptions.data = options.data;
      let response = await axios.delete(`${BASE_ROUTE}/${endpoint}`, axiosOptions);
      if (response.status < 400) {
        return Promise.resolve(response.data);
      } else {
        throw new Error(`Error ${response.status} calling ${endpoint} api`);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   *
   * @param {string} endpoint
   * @param {{
   *  authenticate?: boolean,
   *  query?: object,
   *  data?: object
   * }} options
   * @returns {object}
   */
  static async put(endpoint, options = {}) {
    try {
      /** @type {import("axios").AxiosRequestConfig} */
      let axiosOptions = {};
      if (options.authenticate) {
        let access_token = sessionStorage.getItem("access_token");
        if (access_token) {
          axiosOptions.headers = { Authorization: `Bearer ${sessionStorage.getItem("access_token")}` };
        } else {
          throw new Error(`Cannot authenticate api ${endpoint}, access_token is not saved`);
        }
      }
      if (options.query) axiosOptions.data = options.query;
      let response = await axios.put(`${BASE_ROUTE}/${endpoint}`, options.data || null, axiosOptions);
      if (response.status < 400) {
        return Promise.resolve(response.data);
      } else {
        throw new Error(`Error ${response.status} calling ${endpoint} api`);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
