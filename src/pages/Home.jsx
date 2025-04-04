import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography, Button, Grid, Snackbar, Alert, Divider, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import BeneficiarioForm from '../components/BeneficiarioForm';
import BeneficiarioList from '../components/BeneficiarioList';
import DependenteForm from '../components/DependenteForm';
import { useApi } from '../hooks/useApi';

// Função para formatar a data no formato DD/MM/YYYY
const formatDate = (dateString) => {
  if (!dateString) return 'Não informado';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

// Função para formatar a data e hora atuais
const getCurrentDateTime = () => {
  const now = new Date();
  return now.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const Home = () => {
  const { createBeneficiario, createDependente, getBeneficiarios, getDependentesByBeneficiario, loading, error } = useApi();
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedBeneficiarioId, setSelectedBeneficiarioId] = useState(null);
  const [selectedBeneficiario, setSelectedBeneficiario] = useState(null);
  const [selectedDependente, setSelectedDependente] = useState(null);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); // Mensagem de erro
  const [openErrorDialog, setOpenErrorDialog] = useState(false); // Controla o Dialog de erro
  const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());
  const [openDialog, setOpenDialog] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const size = 10;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(getCurrentDateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchPage = async (pageNumber, query) => {
    try {
      const response = await getBeneficiarios(query, pageNumber, size);
      console.log('API Response:', response);
      const results = Array.isArray(response?.content) ? response.content : [];
      const total = Number(response?.totalElements) || 0;
      setBeneficiarios(results);
      setTotalCount(total);
      setHasSearched(true);
    } catch (err) {
      console.error('Erro ao buscar beneficiários:', err);
      setBeneficiarios([]);
      setTotalCount(0);
      setHasSearched(true);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(0);
    fetchPage(0, query);
  };

  const handlePageChange = (newPage) => {
    const apiPage = newPage - 1;
    setPage(apiPage);
    if (hasSearched) {
      fetchPage(apiPage, searchQuery);
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    if (newValue === 0) {
      setHasSearched(false);
      setBeneficiarios([]);
      setTotalCount(0);
      setPage(0);
    }
  };

  const handleBeneficiarioSubmit = async (beneficiarioData) => {
    try {
      const newBeneficiario = await createBeneficiario(beneficiarioData);
      setBeneficiarios([...beneficiarios, { ...newBeneficiario, dependents: newBeneficiario.dependents || [] }]);
      setSelectedBeneficiarioId(newBeneficiario.id);
      setSuccessMessage('Beneficiário cadastrado com sucesso!');
      setErrorMessage(null);
      setOpenErrorDialog(false); // Fecha o Dialog em caso de sucesso
      return true;
    } catch (err) {
      console.error('Erro ao cadastrar beneficiário:', err);
      setErrorMessage(err.message); // Define a mensagem de erro
      setOpenErrorDialog(true); // Abre o Dialog de erro
      return false;
    }
  };

  const handleDependenteSubmit = async (dependenteData, beneficiarioId) => {
    if (!beneficiarioId) return false;
    try {
      await createDependente(beneficiarioId, dependenteData);
      fetchPage(page, searchQuery);
      setSuccessMessage('Dependente cadastrado com sucesso!');
      setErrorMessage(null);
      setOpenErrorDialog(false);
      return true;
    } catch (err) {
      console.error('Erro ao cadastrar dependente:', err);
      setErrorMessage(err.message);
      setOpenErrorDialog(true);
      return false;
    }
  };

  const handleDependenteSubmitFromList = async (dependenteData, beneficiarioId) => {
    try {
      await createDependente(beneficiarioId, dependenteData);
      fetchPage(page, searchQuery);
      setSuccessMessage('Dependente cadastrado com sucesso!');
      setErrorMessage(null);
      setOpenErrorDialog(false);
      return true;
    } catch (err) {
      console.error('Erro ao cadastrar dependente:', err);
      setErrorMessage(err.message);
      setOpenErrorDialog(true);
      return false;
    }
  };

  const handleSelectBeneficiario = async (beneficiario) => {
    try {
      const dependentes = await getDependentesByBeneficiario(beneficiario.id);
      setSelectedBeneficiario({ ...beneficiario, dependents: dependentes || [] });
      setSelectedDependente(null);
      setOpenDialog(true);
    } catch (err) {
      console.error('Erro ao buscar dependentes:', err);
      setSelectedBeneficiario({ ...beneficiario, dependents: [] });
      setOpenDialog(true);
    }
  };

  const handleSelectDependente = (dependente) => {
    setSelectedDependente(dependente);
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage(null);
  };

  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
    setErrorMessage(null); // Limpa a mensagem ao fechar
  };

  const handleBack = () => {
    setSelectedTab(0);
    setSelectedBeneficiario(null);
    setSelectedBeneficiarioId(null);
    setSelectedDependente(null);
    setPage(0);
    setHasSearched(false);
    setBeneficiarios([]);
    setTotalCount(0);
    setSuccessMessage(null);
    setErrorMessage(null);
    setOpenErrorDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBeneficiario(null);
    setSelectedDependente(null);
  };

  return (
    <Box
      sx={{
        padding: { xs: 1, sm: 2 },
        backgroundColor: '#E0E0E0',
        height: '100vh',
        border: '1px solid #D3D3D3',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        maxWidth: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Typography
        variant="h4"
        sx={{ backgroundColor: '#003087', color: 'white', padding: '5px 10px', borderRadius: '4px 4px 0 0' }}
      >
        Sistema de Cadastro
      </Typography>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        centered
        sx={{ backgroundColor: '#E0E0E0', borderBottom: '1px solid #D3D3D3' }}
      >
        <Tab label="Buscar" />
        <Tab label="Cadastrar Beneficiário" />
        <Tab label="Cadastrar Dependente" />
      </Tabs>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          overflowY: 'auto',
        }}
      >
        <Box
          sx={{
            width: 200,
            padding: 2,
            borderRight: '1px solid #D3D3D3',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#003087',
              fontWeight: 'bold',
            }}
          >
            {currentDateTime}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            padding: { xs: 1, sm: 2 },
            overflowY: 'auto',
          }}
        >
          {selectedTab === 0 && (
            <Box sx={{ textAlign: 'center' }}>
              <TextField
                label="Buscar por nome (começa com)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Digite o início do nome"
                helperText="Deixe em branco para listar todos os beneficiários."
                fullWidth
                size="small"
                sx={{ marginRight: 1 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSearch(searchQuery)}
                disabled={loading}
                sx={{ marginTop: 1, marginBottom: 1 }}
              >
                {loading ? 'Carregando...' : 'Buscar'}
              </Button>
              {error && <Typography color="error">Erro: {error}</Typography>}
              {hasSearched && (
                <BeneficiarioList
                  beneficiarios={beneficiarios}
                  page={page + 1}
                  setPage={handlePageChange}
                  size={size}
                  totalCount={totalCount}
                  onSelectBeneficiario={handleSelectBeneficiario}
                />
              )}
            </Box>
          )}

          {selectedTab === 1 && (
            <Box>
              <BeneficiarioForm onSubmit={handleBeneficiarioSubmit} onBack={handleBack} />
            </Box>
          )}

          {selectedTab === 2 && (
            <Box>
              <DependenteForm
                beneficiarios={beneficiarios}
                onSubmit={handleDependenteSubmitFromList}
                selectedBeneficiarioId={selectedBeneficiarioId}
                handleDependenteSubmit={handleDependenteSubmit}
                onBack={handleBack}
              />
            </Box>
          )}
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#003087', color: 'white' }}>
          Detalhes do Beneficiário
        </DialogTitle>
        <DialogContent>
          {selectedBeneficiario && (
            <Box
              sx={{
                padding: 2,
                backgroundColor: '#f9f9f9',
                borderRadius: 2,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                Dados Pessoais
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Typography>
                    <strong>Nome:</strong> {selectedBeneficiario.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <strong>CPF:</strong> {selectedBeneficiario.cpf}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <strong>RG:</strong> {selectedBeneficiario.rg || 'Não informado'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <strong>Data de Nascimento:</strong> {formatDate(selectedBeneficiario.birthDate) || 'Não informada'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <strong>E-mail:</strong> {selectedBeneficiario.email || 'Não informado'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <strong>Telefone:</strong> {selectedBeneficiario.phone || 'Não informado'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <strong>Nome da Mãe:</strong> {selectedBeneficiario.motherName || 'Não informado'}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ marginY: 2 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                Endereço
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>
                    <strong>Endereço:</strong> {selectedBeneficiario.address}, {selectedBeneficiario.number} - {selectedBeneficiario.neighborhood}, {selectedBeneficiario.city} - {selectedBeneficiario.state}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <strong>CEP:</strong> {selectedBeneficiario.cep || 'Não informado'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <strong>Complemento:</strong> {selectedBeneficiario.complement || 'Não informado'}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ marginY: 2 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                Outras Informações
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>
                    <strong>Necessidades:</strong> {selectedBeneficiario.needs || 'Nenhuma'}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ marginY: 2 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                Dependentes
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {(selectedBeneficiario.dependents ?? []).length > 0 ? (
                    selectedBeneficiario.dependents.map((dep, index) => (
                      <Typography
                        key={index}
                        sx={{ marginBottom: 1, cursor: 'pointer', color: '#003087' }}
                        onClick={() => handleSelectDependente(dep)}
                        style={{ textDecoration: selectedDependente === dep ? 'underline' : 'none' }}
                      >
                        Nome: {dep.name} | CPF: {dep.cpf || 'Não informado'}
                      </Typography>
                    ))
                  ) : (
                    <Typography>Nenhum</Typography>
                  )}
                </Grid>
              </Grid>

              {selectedDependente && (
                <Box
                  sx={{
                    marginTop: 3,
                    padding: 3,
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#003087', marginBottom: 2 }}>
                    Detalhes do Dependente
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography>
                        <strong>Nome:</strong> {selectedDependente.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography>
                        <strong>CPF:</strong> {selectedDependente.cpf || 'Não informado'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography>
                        <strong>RG:</strong> {selectedDependente.rg || 'Não informado'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography>
                        <strong>Data de Nascimento:</strong> {formatDate(selectedDependente.birthDate) || 'Não informada'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <strong>Necessidades:</strong> {selectedDependente.needs?.join(', ') || 'Nenhuma'}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setSelectedDependente(null)}
                    sx={{ marginTop: 2 }}
                  >
                    Fechar Detalhes
                  </Button>
                </Box>
              )}

              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCloseDialog}
                sx={{ marginTop: 3 }}
              >
                Fechar Detalhes
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog para mensagens de erro */}
      <Dialog open={openErrorDialog} onClose={handleCloseErrorDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#d32f2f', color: 'white' }}>
          Erro ao Cadastrar
        </DialogTitle>
        <DialogContent sx={{ padding: 3 }}>
          <Typography variant="body1" align="center" color="error">
            {errorMessage || 'Erro desconhecido ao cadastrar.'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog} variant="contained" color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para mensagens de sucesso */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;