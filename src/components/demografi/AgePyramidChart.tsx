'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AgeDistributionYear } from '@/types/demografi';
import { useState } from 'react';

interface AgePyramidChartProps {
  data: AgeDistributionYear[];
}

export function AgePyramidChart({ data }: AgePyramidChartProps) {
  const [selectedYear, setSelectedYear] = useState(data[data.length - 1]?.year || 2023);

  const yearData = data.find(d => d.year === selectedYear);

  // Transform data for pyramid (negative values for males)
  const pyramidData = yearData?.ageGroups.map(group => ({
    ageGroup: group.ageGroup,
    male: -group.male, // Negative for left side
    female: group.female,
    maleAbs: group.male, // Absolute for tooltip
    femaleAbs: group.female
  })) || [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">
          Aldersfordeling
        </h3>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {data.map(d => (
            <option key={d.year} value={d.year}>{d.year}</option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={pyramidData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            type="number"
            tickFormatter={(value) => Math.abs(value).toLocaleString('nb-NO')}
            stroke="#6b7280"
          />
          <YAxis
            type="category"
            dataKey="ageGroup"
            stroke="#6b7280"
            width={80}
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            formatter={(_value: number, name: string, props: any) => {
              const absValue = name === 'male' ? props.payload.maleAbs : props.payload.femaleAbs;
              return [absValue.toLocaleString('nb-NO'), name === 'male' ? 'Mann' : 'Kvinne'];
            }}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px'
            }}
          />
          <Legend
            formatter={(value) => value === 'male' ? 'Mann' : 'Kvinne'}
            wrapperStyle={{ paddingTop: '20px' }}
          />
          <Bar dataKey="male" fill="#3b82f6" name="male" stackId="a" />
          <Bar dataKey="female" fill="#ec4899" name="female" stackId="a" />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Menn totalt</p>
          <p className="text-2xl font-bold text-blue-900">
            {yearData?.ageGroups.reduce((sum, g) => sum + g.male, 0).toLocaleString('nb-NO')}
          </p>
        </div>
        <div className="bg-pink-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Kvinner totalt</p>
          <p className="text-2xl font-bold text-pink-900">
            {yearData?.ageGroups.reduce((sum, g) => sum + g.female, 0).toLocaleString('nb-NO')}
          </p>
        </div>
      </div>
    </div>
  );
}
