import { useState, useEffect } from 'react';
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

const initialState = {
  LCP: null,
  INP: null,
  CLS: null,
  FCP: null,
  TTFB: null,
};

function reportHandler(setMetrics) {
  return (metric) => {
    setMetrics((prev) => ({
      ...prev,
      [metric.name]: {
        value: metric.value,
        rating: metric.rating,
        id: metric.id,
      },
    }));
  };
}

export function useWebVitals() {
  const [metrics, setMetrics] = useState(initialState);

  useEffect(() => {
    const report = reportHandler(setMetrics);
    onCLS(report);
    onINP(report);
    onLCP(report);
    onFCP(report);
    onTTFB(report);
  }, []);

  return metrics;
}
