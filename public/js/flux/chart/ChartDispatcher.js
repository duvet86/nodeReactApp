'use strict';

import { Dispatcher } from 'flux';

import type { Action } from './ChartActions';

const instance: Dispatcher<Action> = new Dispatcher();
export default instance;

// So we can conveniently do, `import {dispatch} from './ChartDispatcher';`
export const dispatch = instance.dispatch.bind(instance);