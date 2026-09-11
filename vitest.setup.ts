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

// Node 25는 동작하지 않는 localStorage 전역을 미리 정의한다. vitest의 jsdom 환경은
// 이미 전역에 있는 키를 덮어쓰지 않아 jsdom의 Storage가 가려진다. 되돌려 놓는다.
const jsdomWindow = (globalThis as { jsdom?: { window: Window } }).jsdom?.window;
if (jsdomWindow) {
    Object.defineProperty(globalThis, 'localStorage', {
        get: () => jsdomWindow.localStorage,
        configurable: true,
    });
}

// Runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
});
