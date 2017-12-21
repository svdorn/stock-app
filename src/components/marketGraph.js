import React, {Component} from 'react';
import { LineChart, Line } from 'recharts';

<LineChart width={400} height={400} data={data}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
</LineChart>