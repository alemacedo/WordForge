import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Alert,
} from '@mui/material';
import { useWebVitals } from '../hooks/useWebVitals';

const METRIC_INFO = {
  LCP: {
    name: 'Largest Contentful Paint',
    unit: 'ms',
    description: 'Carregamento do maior elemento de conteúdo visível.',
  },
  INP: {
    name: 'Interaction to Next Paint',
    unit: 'ms',
    description: 'Responsividade geral às interações do usuário (substitui FID).',
  },
  CLS: {
    name: 'Cumulative Layout Shift',
    unit: '',
    description: 'Estabilidade visual (mudanças de layout inesperadas).',
  },
  FCP: {
    name: 'First Contentful Paint',
    unit: 'ms',
    description: 'Tempo até o primeiro conteúdo ser renderizado.',
  },
  TTFB: {
    name: 'Time to First Byte',
    unit: 'ms',
    description: 'Tempo até o servidor responder.',
  },
};

function formatValue(data, unit) {
  if (!data || data.value == null) return '-';
  const value = data.value;
  if (unit === 'ms') return `${Math.round(value)} ms`;
  return value.toFixed(3);
}

function RatingChip({ rating }) {
  if (!rating) return null;
  const colorMap = { good: 'success', 'needs-improvement': 'warning', poor: 'error' };
  const labelMap = {
    good: 'Bom',
    'needs-improvement': 'Melhorar',
    poor: 'Ruim',
  };
  return <Chip label={labelMap[rating]} color={colorMap[rating]} size="small" />;
}

function MetricCard({ name, metric, info }) {
  const data = metric || { value: null, rating: null };
  const value = data.value !== null ? formatValue(data, info.unit) : 'Aguardando...';

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="overline" color="text.secondary" fontWeight={600}>
            {name}
          </Typography>
          <RatingChip rating={data.rating} />
        </Box>
        <Typography variant="h4" component="div" fontWeight={600}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          {info.name}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
          {info.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function WebVitals() {
  const metrics = useWebVitals();

  return (
    <Box>
      <Typography variant="h5" component="h1" fontWeight={600} mb={2}>
        Web Vitals
      </Typography>
      <Alert severity="info" sx={{ mb: 3 }}>
        Métricas de desempenho do Core Web Vitals coletadas em tempo real. Os valores são
        atualizados conforme cada métrica é reportada pelo navegador.
      </Alert>
      <Grid container spacing={2}>
        {Object.entries(METRIC_INFO).map(([key, info]) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <MetricCard name={key} metric={metrics[key]} info={info} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
