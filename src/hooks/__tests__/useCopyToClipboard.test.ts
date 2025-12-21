import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useCopyToClipboard } from '../useCopyToClipboard';

describe('useCopyToClipboard', () => {
    beforeEach(() => {
        // Mock navigator.clipboard
        Object.assign(navigator, {
            clipboard: {
                writeText: vi.fn().mockResolvedValue(undefined),
            },
        });
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.useRealTimers();
    });

    it('should initialize with isCopied as false', () => {
        const { result } = renderHook(() => useCopyToClipboard());
        expect(result.current.isCopied).toBe(false);
    });

    it('should copy text successfully and set isCopied to true temporarily', async () => {
        const { result } = renderHook(() => useCopyToClipboard());

        await act(async () => {
            const success = await result.current.copyToClipboard('test text');
            expect(success).toBe(true);
        });

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
        expect(result.current.isCopied).toBe(true);

        // Advance timer to check if it resets
        act(() => {
            vi.advanceTimersByTime(2000);
        });

        expect(result.current.isCopied).toBe(false);
    });

    it('should handle clipboard error', async () => {
        const error = new Error('Clipboard error');
        Object.assign(navigator, {
            clipboard: {
                writeText: vi.fn().mockRejectedValue(error),
            },
        });
        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });

        const { result } = renderHook(() => useCopyToClipboard());

        await act(async () => {
            const success = await result.current.copyToClipboard('test text');
            expect(success).toBe(false);
        });

        expect(result.current.isCopied).toBe(false);
        expect(consoleSpy).toHaveBeenCalledWith('Copy failed', error);
        consoleSpy.mockRestore();
    });
});
