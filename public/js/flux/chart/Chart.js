'use strict';

import Immutable from 'immutable';

const LineRecord = Immutable.Record({
	labels: undefined,
    datasets: undefined
});

const PieRecord = Immutable.Record({
	value: undefined,
	color: undefined,
	highlight: undefined,
	label: undefined
});

export class Line extends LineRecord {
	labels: array;
    datasets: array;
}

export class Pie extends PieRecord {
	value: number;
	color: string;
	highlight: string;
	label: string;
}