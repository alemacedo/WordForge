import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useWords } from '../hooks/useWords';

export default function WordList() {
  const { words, loading, error, deleteWord } = useWords();

  const handleDelete = async (id, e) => {
    e.preventDefault();
    if (window.confirm('Deseja realmente excluir esta palavra?')) {
      try {
        await deleteWord(id);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading && words.length === 0) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="warning" sx={{ mb: 2 }}>
        {error} (exibindo dados do localStorage)
      </Alert>
    );
  }

  return (
    <Box>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        gap={2}
        mb={3}
      >
        <Typography variant="h5" component="h1" fontWeight={600}>
          Palavras
        </Typography>
        <Button
          component={Link}
          to="/words/new"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ alignSelf: { xs: 'stretch', sm: 'center' } }}
        >
          Nova palavra
        </Button>
      </Box>

      {words.length === 0 ? (
        <Card>
          <CardContent sx={{ py: 8, textAlign: 'center' }}>
            <Typography color="text.secondary" gutterBottom>
              Nenhuma palavra cadastrada.
            </Typography>
            <Button
              component={Link}
              to="/words/new"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Cadastrar primeira palavra
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {words.map((word) => (
            <Grid item xs={12} sm={6} md={4} key={word.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    component={Link}
                    to={`/words/${word.id}`}
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      textDecoration: 'none',
                      color: 'primary.main',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    {word.word}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {word.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', flexWrap: 'wrap', gap: 0.5 }}>
                  <IconButton
                    component={Link}
                    to={`/words/${word.id}`}
                    size="small"
                    color="primary"
                    aria-label="Ver"
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    component={Link}
                    to={`/words/${word.id}/edit`}
                    size="small"
                    color="primary"
                    aria-label="Editar"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={(e) => handleDelete(word.id, e)}
                    aria-label="Excluir"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
