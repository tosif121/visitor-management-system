import { fetcher } from './apiBase';

export async function visitorRegister(params) {
  try {
    const response = await fetcher('POST', process.env.VISITOR_REGISTRATION, params);
    return response;
  } catch (err) {
    return null;
  }
}

export async function visitorById(id) {
  try {
    const response = await fetcher('GET', `${process.env.VISITOR_BY_ID}${id}`);
    return response;
  } catch (err) {
    return null;
  }
}
