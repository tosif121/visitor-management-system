import Axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.BASE_API_URL || '';

function generateHeaders(contentType = 'application/json') {
  const headers = {
    'Content-Type': contentType,
  };

  const token = Cookies.get('vms_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

async function makeRequest(method, url, params, contentType = 'application/json') {
  try {
    const headers = generateHeaders(contentType);
    const config = {
      method,
      url: `${API_BASE_URL}${url}`,
      headers,
      ...(method === 'GET' ? { params } : { data: params }),
    };

    const response = await Axios(config);
    return handleResponse(response.data);
  } catch (error) {
    return handleErrorResponse(error);
  }
}

function handleErrorResponse(error) {
  const errorMessage =
    error.response?.data?.message || error.response?.message || error.message || 'An unexpected error occurred';

  return {
    status: error.response?.status || false,
    data: null,
    message: errorMessage,
  };
}

function handleResponse(response) {
  // Check if response meets success criteria
  const isSuccessful =
    response.status === true ||
    (response.data && Object.keys(response.data).length > 0) ||
    (Array.isArray(response.data) && response.data.length > 0);

  if (isSuccessful) {
    return {
      status: response.status || true,
      data: response.data || null,
      message: response.message || 'Success',
    };
  }

  return {
    status: false,
    data: null,
    message: response.message || 'No data available',
  };
}

async function fetcher(method, url, params) {
  return makeRequest(method, url, params);
}

async function filesFetch(method, url, params) {
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    if (params[key] !== null && params[key] !== undefined) {
      formData.append(key, params[key]);
    }
  });

  return makeRequest(method, url, formData, 'multipart/form-data');
}

export { fetcher, filesFetch };
