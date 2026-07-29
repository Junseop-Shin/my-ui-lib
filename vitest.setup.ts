import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// jsdom은 PointerEvent를 구현하지 않는다. Base UI 컴포넌트가 포인터 이벤트를
// 생성하므로 최소 구현을 채워 넣는다.
if (typeof window !== 'undefined' && !window.PointerEvent) {
    class PointerEventPolyfill extends MouseEvent {
        readonly pointerId: number;
        readonly width: number;
        readonly height: number;
        readonly pressure: number;
        readonly tangentialPressure: number;
        readonly tiltX: number;
        readonly tiltY: number;
        readonly twist: number;
        readonly pointerType: string;
        readonly isPrimary: boolean;

        constructor(type: string, params: PointerEventInit = {}) {
            super(type, params);
            this.pointerId = params.pointerId ?? 0;
            this.width = params.width ?? 1;
            this.height = params.height ?? 1;
            this.pressure = params.pressure ?? 0;
            this.tangentialPressure = params.tangentialPressure ?? 0;
            this.tiltX = params.tiltX ?? 0;
            this.tiltY = params.tiltY ?? 0;
            this.twist = params.twist ?? 0;
            this.pointerType = params.pointerType ?? 'mouse';
            this.isPrimary = params.isPrimary ?? false;
        }
    }

    window.PointerEvent = PointerEventPolyfill as unknown as typeof PointerEvent;
}

// Runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
});
