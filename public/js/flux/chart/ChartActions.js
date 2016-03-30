'use strict';

export type Action =
{
	type: 'chart/line',
	data: object
} |
{
	type: 'chart/pie',
	data: object
};