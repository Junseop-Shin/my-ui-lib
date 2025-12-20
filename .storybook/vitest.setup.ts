import { setProjectAnnotations } from '@storybook/react';
import * as projectAnnotations from './preview';

const annotations = setProjectAnnotations([projectAnnotations]);

// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll);
