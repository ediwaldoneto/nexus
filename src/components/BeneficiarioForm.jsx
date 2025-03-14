import React, { useState } from 'react';
import { Box, TextField, MenuItem, Button, Typography, Grid } from '@mui/material';

// Lista completa das UFs
const ufs = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

const BeneficiarioForm = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    rg: '',
    email: '',
    phone: '',
    motherName: '',
    birthDate: '',
    address: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    cep: '',
    complement: '',
    needs: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData).then((success) => {
      if (success) {
        // Limpa os campos se o cadastro for bem-sucedido
        setFormData({
          name: '',
          cpf: '',
          rg: '',
          email: '',
          phone: '',
          motherName: '',
          birthDate: '',
          address: '',
          number: '',
          neighborhood: '',
          city: '',
          state: '',
          cep: '',
          complement: '',
          needs: '',
        });
      }
    });
  };

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
        Cadastro do Beneficiário
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        {/* Dados Pessoais */}
        <Typography
          variant="subtitle1"
          sx={{ marginTop: 1, marginBottom: 0.5, fontWeight: 'bold' }}
        >
          Dados Pessoais
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Nome Completo *"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="CPF *"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="RG"
              name="rg"
              value={formData.rg}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="E-mail"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="Telefone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="Nome da Mãe"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="Data de Nascimento"
              name="birthDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.birthDate}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {/* Endereço */}
        <Typography
          variant="subtitle1"
          sx={{ marginTop: 1, marginBottom: 0.5, fontWeight: 'bold' }}
        >
          Endereço
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Logradouro"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              size="small"
              label="Número"
              name="number"
              value={formData.number}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              size="small"
              label="Bairro"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              size="small"
              label="Cidade"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              size="small"
              select
              label="Estado"
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              {ufs.map((uf) => (
                <MenuItem key={uf.value} value={uf.value}>
                  {uf.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="CEP"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="Complemento"
              name="complement"
              value={formData.complement}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {/* Necessidades Especiais */}
        <Typography
          variant="subtitle1"
          sx={{ marginTop: 1, marginBottom: 0.5, fontWeight: 'bold' }}
        >
          Necessidades Especiais
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Necessidades"
              name="needs"
              value={formData.needs}
              onChange={handleChange}
              multiline
              rows={2}
              placeholder="Exemplo: Deficiência Física, Deficiência Visual"
            />
            <Typography
              variant="caption"
              sx={{ color: '#666', marginTop: 0.5 }}
            >
              Separe as necessidades por vírgula (ex.: Deficiência Física, Deficiência Visual)
            </Typography>
          </Grid>
        </Grid>

        {/* Botões */}
        <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="small"
          >
            CADASTRAR BENEFICIÁRIO
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

export default BeneficiarioForm;