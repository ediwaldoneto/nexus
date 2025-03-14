import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Autocomplete,
} from '@mui/material';

const DependenteForm = ({
  beneficiarios,
  onSubmit,
  selectedBeneficiarioId,
  handleDependenteSubmit,
  onBack,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      cpf: '',
      rg: '',
      birthDate: '',
      needs: '',
      beneficiarioId: selectedBeneficiarioId || '',
    },
  });

  const hasBeneficiarios = beneficiarios.length > 0;
  const nameValue = watch('name');
  const beneficiarioIdValue = watch('beneficiarioId');

  const onFormSubmit = async (data) => {
    const dependenteData = {
      name: data.name,
      cpf: data.cpf,
      rg: data.rg,
      birthDate: data.birthDate ? `${data.birthDate}T00:00:00.000Z` : '',
      needs: data.needs ? data.needs.split(',').map((need) => need.trim()) : [],
    };

    if (selectedBeneficiarioId) {
      const success = await handleDependenteSubmit(dependenteData);
      if (success) {
        reset({
          name: '',
          cpf: '',
          rg: '',
          birthDate: '',
          needs: '',
          beneficiarioId: selectedBeneficiarioId || '', // Mantém o beneficiarioId pré-selecionado
        });
      }
    } else {
      const success = await onSubmit(dependenteData, data.beneficiarioId);
      if (success) {
        reset({
          name: '',
          cpf: '',
          rg: '',
          birthDate: '',
          needs: '',
          beneficiarioId: '', // Limpa o beneficiarioId
        });
      }
    }
  };

  // Opção padrão para o Autocomplete (baseada no selectedBeneficiarioId)
  const defaultBeneficiario = beneficiarios.find(b => b.id === selectedBeneficiarioId) || null;

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: '0 auto',
        padding: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <Typography
        variant="h6"
        sx={{ marginBottom: 1, color: '#003087', textAlign: 'center' }}
      >
        Cadastro do Dependente
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onFormSubmit)}>
        {!hasBeneficiarios && (
          <Typography color="error" gutterBottom align="center">
            Nenhum beneficiário cadastrado. Cadastre um beneficiário primeiro.
          </Typography>
        )}

        {!selectedBeneficiarioId && hasBeneficiarios && (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Controller
                name="beneficiarioId"
                control={control}
                rules={{ required: 'Beneficiário é obrigatório' }}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={beneficiarios}
                    getOptionLabel={(option) => `${option.name} (CPF: ${option.cpf})`}
                    value={beneficiarios.find(b => b.id === value) || null}
                    onChange={(event, newValue) => {
                      onChange(newValue ? newValue.id : '');
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Beneficiário"
                        size="small"
                        fullWidth
                        required
                        error={!!errors.beneficiarioId}
                        helperText={errors.beneficiarioId?.message || 'Digite para buscar beneficiário'}
                      />
                    )}
                  />
                )}
              />
            </Grid>
          </Grid>
        )}

        <Typography
          variant="subtitle1"
          sx={{ marginTop: 1, marginBottom: 0.5, fontWeight: 'bold' }}
        >
          Dados Pessoais
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Nome é obrigatório' }}
              render={({ field }) => (
                <TextField
                  label="Nome Completo *"
                  size="small"
                  {...field}
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="cpf"
              control={control}
              render={({ field }) => (
                <TextField
                  label="CPF"
                  size="small"
                  {...field}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="rg"
              control={control}
              render={({ field }) => (
                <TextField
                  label="RG"
                  size="small"
                  {...field}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Data de Nascimento"
                  type="date"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  {...field}
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>

        <Typography
          variant="subtitle1"
          sx={{ marginTop: 1, marginBottom: 0.5, fontWeight: 'bold' }}
        >
          Necessidades Especiais
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Controller
              name="needs"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Necessidades"
                  size="small"
                  {...field}
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="Exemplo: Deficiência Física, Deficiência Visual"
                />
              )}
            />
            <Typography
              variant="caption"
              sx={{ color: '#666', marginTop: 0.5 }}
            >
              Separe as necessidades por vírgula (ex.: Deficiência Física, Deficiência Visual)
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="small"
            disabled={
              !hasBeneficiarios || // Desabilita se não houver beneficiários
              (!selectedBeneficiarioId && !beneficiarioIdValue) || // Desabilita se não houver beneficiário selecionado
              !nameValue // Desabilita se o nome não estiver preenchido
            }
          >
            CADASTRAR DEPENDENTE
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => onBack()}
          >
            VOLTAR
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DependenteForm;