import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Accept': 'application/json',
  },
});

export const createBeneficiario = (data) => api.post('/api/v1/beneficiaries', data);
export const createDependente = (beneficiarioId, data) =>
  api.post(`/api/v1/dependents?beneficiaryId=${beneficiarioId}`, data);
export const getBeneficiarios = (endpoint, params) => api.get(endpoint, { params });
export const getDependentesByBeneficiario = (id) => api.get(`/api/v1/dependents/beneficiary/{beneficiaryId}?beneficiaryId=${id}`);