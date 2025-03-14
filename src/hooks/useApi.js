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

  const getBeneficiarios = async () => {
    setLoading(true);
    try {
      const response = await api.getBeneficiarios();
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