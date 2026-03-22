import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
  CircularProgress,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useWords } from '../hooks/useWords';
import { validateWordForm } from '../lib/validation';

export default function WordForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { words, loading, createWord, updateWord } = useWords();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    word: '',
    description: '',
    useCase: '',
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const word = words.find((w) => w.id === id);

  useEffect(() => {
    if (isEdit && word) {
      setForm({
        word: word.word,
        description: word.description,
        useCase: word.useCase,
      });
    }
  }, [isEdit, word]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setErrors({});

    const result = validateWordForm(form);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0];
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      if (isEdit) {
        await updateWord(id, result.data);
        navigate(`/words/${id}`);
      } else {
        const created = await createWord(result.data);
        navigate(`/words/${created.id}`);
      }
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  if (isEdit) {
    if (!word && words.length === 0 && loading) {
      return (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress />
        </Box>
      );
    }
    if (!word && !loading) {
      return (
        <Box textAlign="center" py={8}>
          <Typography color="text.secondary" gutterBottom>
            Palavra não encontrada.
          </Typography>
          <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
            Voltar à lista
          </Button>
        </Box>
      );
    }
  }

  return (
    <Card sx={{ maxWidth: 640 }}>
      <CardContent>
        <Typography variant="h5" component="h2" fontWeight={600} mb={3}>
          {isEdit ? 'Editar palavra' : 'Nova palavra'}
        </Typography>
        {submitError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Palavra"
              name="word"
              value={form.word}
              onChange={handleChange}
              placeholder="Ex: Serendipity"
              error={Boolean(errors.word)}
              helperText={errors.word}
              fullWidth
              required
            />
            <TextField
              label="Descrição"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Explicação sobre a palavra"
              error={Boolean(errors.description)}
              helperText={errors.description}
              fullWidth
              required
              multiline
              rows={3}
            />
            <TextField
              label="Caso de uso"
              name="useCase"
              value={form.useCase}
              onChange={handleChange}
              placeholder="Um exemplo de uso da palavra"
              error={Boolean(errors.useCase)}
              helperText={errors.useCase}
              fullWidth
              required
              multiline
              rows={3}
            />
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="flex-start"
              pt={1}
            >
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
              >
                {isEdit ? 'Salvar' : 'Cadastrar'}
              </Button>
              <Button
                component={Link}
                to={isEdit ? `/words/${id}` : '/'}
                variant="outlined"
                startIcon={<CancelIcon />}
              >
                Cancelar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
