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
      setError(err.message);
      setLoading(false);
      throw err;
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
        sort: 'name,asc', // Sempre ordenado por nome em ordem ascendente
      };
      if (query) {
        params.name = query; // Adiciona o parâmetro name apenas se houver query
      }
      const endpoint = query ? '/api/v1/beneficiaries/search' : '/api/v1/beneficiaries';
      const response = await api.getBeneficiarios(endpoint, params);
      setLoading(false);
      return response.data; // Espera-se { content: [], totalElements: number }
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