'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PopulationDataPoint } from '@/types/demografi';

interface PopulationTrendChartProps {
  data: PopulationDataPoint[];
}

export function PopulationTrendChart({ data }: PopulationTrendChartProps) {
  const firstYear = data[0];
  const lastYear = data[data.length - 1];
  const growthRate = firstYear && lastYear
    ? ((lastYear.population - firstYear.population) / firstYear.population * 100).toFixed(1)
    : '0.0';

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold mb-4 text-gray-900">
        Befolkningsutvikling 2017-2023
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="year"
            stroke="#6b7280"
            style={{ fontSize: '14px' }}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '14px' }}
            tickFormatter={(value) => value.toLocaleString('nb-NO')}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px'
            }}
            formatter={(value: number) => [value.toLocaleString('nb-NO'), '']}
            labelFormatter={(label) => `År ${label}`}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => {
              if (value === 'population') return 'Befolkning';
              if (value === 'trendline') return 'Trendlinje';
              return value;
            }}
          />
          <Line
            type="monotone"
            dataKey="population"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ fill: '#2563eb', r: 5 }}
            activeDot={{ r: 7 }}
            name="population"
          />
          <Line
            type="monotone"
            dataKey="trendline"
            stroke="#9ca3af"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="trendline"
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Befolkning 2017</p>
          <p className="text-2xl font-bold text-blue-900">
            {firstYear?.population.toLocaleString('nb-NO') || 'N/A'}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Befolkning 2023</p>
          <p className="text-2xl font-bold text-blue-900">
            {lastYear?.population.toLocaleString('nb-NO') || 'N/A'}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Vekst</p>
          <p className="text-2xl font-bold text-green-900">
            +{growthRate}%
          </p>
        </div>
      </div>
    </div>
  );
}
