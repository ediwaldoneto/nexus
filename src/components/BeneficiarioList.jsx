import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Pagination,
} from '@mui/material';

const BeneficiarioList = ({
  beneficiarios,
  page,
  setPage,
  itemsPerPage,
  onSelectBeneficiario,
}) => {
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedBeneficiarios = beneficiarios.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Box sx={{ padding: 2 }}>
      {beneficiarios.length === 0 ? (
        <Typography align="center" color="textSecondary">
          Nenhum beneficiário encontrado.
        </Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {paginatedBeneficiarios.map((beneficiario) => (
              <Grid item xs={12} sm={6} md={4} key={beneficiario.id}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardActionArea onClick={() => onSelectBeneficiario(beneficiario)}>
                    <CardContent sx={{ padding: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          color: '#003087',
                          marginBottom: 0.5,
                        }}
                      >
                        {beneficiario.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: '#666', fontSize: '0.9rem' }}
                      >
                        <strong>CPF:</strong> {beneficiario.cpf}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            <Pagination
              count={Math.ceil(beneficiarios.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{
                '& .MuiPaginationItem-root': {
                  fontSize: '0.9rem',
                },
                '& .Mui-selected': {
                  backgroundColor: '#003087',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#0056b3',
                  },
                },
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default BeneficiarioList;