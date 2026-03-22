import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useWords } from '../hooks/useWords';

export default function WordDetail() {
  const { id } = useParams();
  const { words } = useWords();
  const word = words.find((w) => w.id === id);

  if (!word) {
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

  return (
    <Card>
      <CardContent>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', sm: 'center' }}
          gap={2}
          mb={3}
        >
          <Typography variant="h4" component="h1" fontWeight={600}>
            {word.word}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              component={Link}
              to={`/words/${word.id}/edit`}
              variant="contained"
              startIcon={<EditIcon />}
            >
              Editar
            </Button>
            <Button
              component={Link}
              to="/"
              variant="outlined"
              startIcon={<ArrowBackIcon />}
            >
              Voltar
            </Button>
          </Stack>
        </Box>
        <Box display="flex" flexDirection="column" gap={3}>
          <Box>
            <Typography
              variant="overline"
              color="text.secondary"
              fontWeight={600}
              display="block"
              mb={1}
            >
              Descrição
            </Typography>
            <Typography variant="body1">{word.description}</Typography>
          </Box>
          <Box>
            <Typography
              variant="overline"
              color="text.secondary"
              fontWeight={600}
              display="block"
              mb={1}
            >
              Caso de uso
            </Typography>
            <Typography variant="body1">{word.useCase}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
