import { useState } from 'react';
import * as api from '../services/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBeneficiario = async (data) => {
    setLoading(true);
    try {
      const response = await api.createBeneficiario(data);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 409) {
        const errorMessage = err.response.data.detail || 'Erro ao cadastrar: dados já existem.';
        throw new Error(errorMessage); // Lança o erro com a mensagem do detail
      }
      setError(err.message);
      throw err; // Outros erros genéricos
    }
  };

  const createDependente = async (beneficiarioId, data) => {
    setLoading(true);
    try {
      const response = await api.createDependente(beneficiarioId, data);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const getBeneficiarios = async (query = '', page = 0, size = 10) => {
    setLoading(true);
    try {
      const params = {
        page,
        size,
        sort: 'name,asc',
      };
      if (query) {
        params.name = query;
      }
      const endpoint = query ? '/api/v1/beneficiaries/search' : '/api/v1/beneficiaries';
      const response = await api.getBeneficiarios(endpoint, params);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const getDependentesByBeneficiario = async (id) => {
    setLoading(true);
    try {
      const response = await api.getDependentesByBeneficiario(id);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return {
    createBeneficiario,
    createDependente,
    getBeneficiarios,
    getDependentesByBeneficiario,
    loading,
    error,
  };
};