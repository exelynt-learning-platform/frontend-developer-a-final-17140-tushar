export const MOCK_COUNTRIES = [
  { id: '1', name: 'United States', code: 'US' },
  { id: '2', name: 'India', code: 'IN' },
  { id: '3', name: 'Canada', code: 'CA' },
  { id: '4', name: 'United Kingdom', code: 'UK' },
  { id: '5', name: 'Australia', code: 'AU' },
  { id: '6', name: 'Germany', code: 'DE' }
];

export const MOCK_EMPLOYEES = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '9876543210',
    country: 'United States',
    state: 'California',
    district: 'Los Angeles'
  },
  {
    id: '2',
    name: 'Sarah Connor',
    email: 'sarah.c@example.com',
    mobile: '9123456780',
    country: 'India',
    state: 'Karnataka',
    district: 'Bengaluru Urban'
  },
  {
    id: '3',
    name: 'Michael Scott',
    email: 'michael.scott@dundermifflin.com',
    mobile: '9988776655',
    country: 'Canada',
    state: 'Ontario',
    district: 'Toronto'
  }
];

const BASE_URL = 'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1';

const fetchWithTimeout = async (url, options = {}, timeoutMs = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export const fetchCountriesApi = async () => {
  try {
    const res = await fetchWithTimeout(`${BASE_URL}/country`, {}, 5000);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item, index) => {
        if (typeof item === 'string') return { id: String(index), name: item };
        const name = item.country || item.name || item.countryName || item.title || `Country ${item.id || index}`;
        return { id: String(item.id || index), name };
      });
    }
    return MOCK_COUNTRIES;
  } catch (err) {
    console.warn('Country API fetch failed or timed out, using fallback mock data.', err);
    return MOCK_COUNTRIES;
  }
};

export const fetchEmployeesApi = async () => {
  try {
    const res = await fetchWithTimeout(`${BASE_URL}/employee`, {}, 5000);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : MOCK_EMPLOYEES;
  } catch (err) {
    console.warn('Employees API fetch failed, using fallback mock data.', err);
    return MOCK_EMPLOYEES;
  }
};

export const fetchEmployeeByIdApi = async (id) => {
  try {
    const res = await fetchWithTimeout(`${BASE_URL}/employee/${id}`, {}, 5000);
    if (res.status === 404) {
      return null;
    }
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(`Employee ID ${id} API fetch failed, checking local store / fallback.`, err);
    const found = MOCK_EMPLOYEES.find((emp) => String(emp.id) === String(id));
    if (found) return found;
    throw err;
  }
};

export const createEmployeeApi = async (employeeData) => {
  try {
    const res = await fetchWithTimeout(
      `${BASE_URL}/employee`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData)
      },
      5000
    );
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const updateEmployeeApi = async (id, employeeData) => {
  try {
    const res = await fetchWithTimeout(
      `${BASE_URL}/employee/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData)
      },
      5000
    );
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const deleteEmployeeApi = async (id) => {
  try {
    const res = await fetchWithTimeout(
      `${BASE_URL}/employee/${id}`,
      {
        method: 'DELETE'
      },
      5000
    );
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return id;
  } catch (err) {
    throw err;
  }
};
