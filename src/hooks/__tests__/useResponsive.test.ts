import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useResponsive } from '../useResponsive';

describe('useResponsive', () => {
    // Helper to change window width
    const setWindowWidth = (width: number) => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: width,
        });
        window.dispatchEvent(new Event('resize'));
    };

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return initial state based on window width', () => {
        setWindowWidth(1200);
        const { result } = renderHook(() => useResponsive());

        expect(result.current.isDesktop).toBe(true);
        expect(result.current.isTablet).toBe(false);
        expect(result.current.isMobile).toBe(false);
    });

    it('should detect mobile width', () => {
        const { result } = renderHook(() => useResponsive());

        act(() => {
            setWindowWidth(500);
        });

        expect(result.current.isMobile).toBe(true);
        expect(result.current.isTablet).toBe(false);
        expect(result.current.isDesktop).toBe(false);
    });

    it('should detect tablet width', () => {
        const { result } = renderHook(() => useResponsive());

        act(() => {
            setWindowWidth(800);
        });

        expect(result.current.isTablet).toBe(true);
        expect(result.current.isMobile).toBe(false);
        expect(result.current.isDesktop).toBe(false);
    });

    it('should detect desktop width', () => {
        const { result } = renderHook(() => useResponsive());

        act(() => {
            setWindowWidth(1200);
        });

        expect(result.current.isDesktop).toBe(true);
        expect(result.current.isMobile).toBe(false);
        expect(result.current.isTablet).toBe(false);
    });
});
