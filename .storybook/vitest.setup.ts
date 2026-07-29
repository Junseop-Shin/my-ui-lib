import { setProjectAnnotations } from '@storybook/react-vite';
import * as projectAnnotations from './preview';

const annotations = setProjectAnnotations([projectAnnotations]);

// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll);
