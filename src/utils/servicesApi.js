import { fetcher } from './apiBase';

export async function visitorRegister(params) {
  try {
    const response = await fetcher('POST', process.env.VISITOR_REGISTRATION, params);
    return response;
  } catch (err) {
    return null;
  }
}
