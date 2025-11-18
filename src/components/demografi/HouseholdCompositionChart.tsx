'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { HouseholdTypeYear } from '@/types/demografi';
import { useState } from 'react';

interface HouseholdCompositionChartProps {
  data: HouseholdTypeYear[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const HOUSEHOLD_LABELS: Record<string, string> = {
  'Par uten hjemmeboende barn': 'Par uten barn',
  'Par med barn': 'Par med barn',
  'Aleneboende': 'Aleneboende',
  'Enslig forelder med barn': 'Enslig forelder',
  'Andre husholdninger': 'Andre'
};

export function HouseholdCompositionChart({ data }: HouseholdCompositionChartProps) {
  const [selectedYear, setSelectedYear] = useState(data[data.length - 1]?.year || 2023);
  const [viewMode, setViewMode] = useState<'pie' | 'trend'>('pie');

  const yearData = data.find(d => d.year === selectedYear);

  // Data for pie chart
  const pieData = yearData?.households.map(h => ({
    name: HOUSEHOLD_LABELS[h.type] || h.type,
    value: h.count,
    fullName: h.type
  })) || [];

  // Data for trend chart (all years)
  const trendData = data.map(yearItem => {
    const dataPoint: any = { year: yearItem.year };
    yearItem.households.forEach(h => {
      dataPoint[HOUSEHOLD_LABELS[h.type] || h.type] = h.count;
    });
    return dataPoint;
  });

  const total = yearData?.households.reduce((sum, h) => sum + h.count, 0) || 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <h3 className="text-xl font-semibold text-gray-900">
          Husholdningssammensetning
        </h3>
        <div className="flex gap-3">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('pie')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'pie'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Fordeling
            </button>
            <button
              onClick={() => setViewMode('trend')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'trend'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Utvikling
            </button>
          </div>
          {viewMode === 'pie' && (
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              {data.map(d => (
                <option key={d.year} value={d.year}>{d.year}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {viewMode === 'pie' ? (
        <>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${((entry.value / total) * 100).toFixed(1)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [value.toLocaleString('nb-NO') + ' husholdninger', '']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {pieData.map((item, index) => (
              <div
                key={item.name}
                className="p-3 rounded-lg border-2"
                style={{ borderColor: COLORS[index % COLORS.length] }}
              >
                <p className="text-xs text-gray-600">{item.name}</p>
                <p className="text-lg font-bold" style={{ color: COLORS[index % COLORS.length] }}>
                  {item.value.toLocaleString('nb-NO')}
                </p>
                <p className="text-xs text-gray-500">
                  {((item.value / total) * 100).toFixed(1)}%
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" stroke="#6b7280" />
            <YAxis stroke="#6b7280" tickFormatter={(value) => value.toLocaleString('nb-NO')} />
            <Tooltip
              formatter={(value: number) => [value.toLocaleString('nb-NO'), '']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px'
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="Par uten barn" stackId="a" fill={COLORS[0]} />
            <Bar dataKey="Par med barn" stackId="a" fill={COLORS[1]} />
            <Bar dataKey="Aleneboende" stackId="a" fill={COLORS[2]} />
            <Bar dataKey="Enslig forelder" stackId="a" fill={COLORS[3]} />
            <Bar dataKey="Andre" stackId="a" fill={COLORS[4]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
