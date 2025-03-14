import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/',
});

export const createBeneficiario = (data) => api.post('/api/v1/beneficiaries', data);
export const createDependente = (beneficiarioId, data) =>
    api.post(`/api/v1/dependents?beneficiaryId=${beneficiarioId}`, data);
export const getBeneficiarios = () => api.get('/api/v1/beneficiaries');
export const getDependentesByBeneficiario = (id) => api.get(`/api/v1/dependents/beneficiary/{beneficiaryId}?beneficiaryId=${id}`);