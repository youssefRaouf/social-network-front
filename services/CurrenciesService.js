import Api from './Api';

export default class CurrenciesService {
  static pageSize = 10;
  static getCurrencies(page) {
    return Api.doRequest(
      `cryptocurrency/listings/latest?limit=${
        CurrenciesService.pageSize
      }&start=${page}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      },
    ).then(response => response.json());
  }
}
