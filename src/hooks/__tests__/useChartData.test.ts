import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useChartData, ChartDataPoint } from '../useChartData';

describe('useChartData', () => {
    it('should determine "up" trend correctly', () => {
        const data: ChartDataPoint[] = [
            { date: '2023-01-01', close: 100, volume: 1000 },
            { date: '2023-01-02', close: 110, volume: 1200 },
        ];
        const { result } = renderHook(() => useChartData(data));

        expect(result.current.trend).toBe('up');
        expect(result.current.lineColor).toBe('var(--color-success)');
    });

    it('should determine "down" trend correctly', () => {
        const data: ChartDataPoint[] = [
            { date: '2023-01-01', close: 100, volume: 1000 },
            { date: '2023-01-02', close: 90, volume: 1200 },
        ];
        const { result } = renderHook(() => useChartData(data));

        expect(result.current.trend).toBe('down');
        expect(result.current.lineColor).toBe('var(--color-destructive)');
    });

    it('should determine "neutral" trend for insufficient data', () => {
        const data: ChartDataPoint[] = [
            { date: '2023-01-01', close: 100, volume: 1000 },
        ];
        const { result } = renderHook(() => useChartData(data));

        expect(result.current.trend).toBe('neutral');
        expect(result.current.lineColor).toBe('var(--color-primary)');
    });
});
