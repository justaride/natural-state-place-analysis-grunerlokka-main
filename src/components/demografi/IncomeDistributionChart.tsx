'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IncomeDistributionYear } from '@/types/demografi';
import { useState } from 'react';

interface IncomeDistributionChartProps {
  data: IncomeDistributionYear[];
}

export function IncomeDistributionChart({ data }: IncomeDistributionChartProps) {
  const [selectedYear, setSelectedYear] = useState(data[data.length - 1]?.year || 2023);
  const [comparisonYear, setComparisonYear] = useState<number | null>(null);

  const yearData = data.find(d => d.year === selectedYear);
  const comparisonData = comparisonYear ? data.find(d => d.year === comparisonYear) : null;

  // Combine data for comparison
  const chartData = yearData?.incomeBrackets.map((bracket, idx) => {
    const dataPoint: any = {
      bracket: formatBracket(bracket.bracket),
      [selectedYear]: Math.round(bracket.count),
    };

    if (comparisonData && comparisonYear !== null) {
      dataPoint[comparisonYear] = Math.round(comparisonData.incomeBrackets[idx]?.count || 0);
    }

    return dataPoint;
  }) || [];

  function formatBracket(bracket: string): string {
    // Shorten bracket labels for better display
    return bracket
      .replace('NOK ', '')
      .replace(' NOK', '')
      .replace('0 NOK', '0')
      .replace(' - ', '-')
      .replace('k', 'k');
  }

  const colors = ['#3b82f6', '#10b981'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <h3 className="text-xl font-semibold text-gray-900">
          Inntektsfordeling
        </h3>
        <div className="flex gap-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Hovedår</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              {data.map(d => (
                <option key={d.year} value={d.year}>{d.year}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Sammenlign med</label>
            <select
              value={comparisonYear || ''}
              onChange={(e) => setComparisonYear(e.target.value ? Number(e.target.value) : null)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            >
              <option value="">Ingen</option>
              {data.filter(d => d.year !== selectedYear).map(d => (
                <option key={d.year} value={d.year}>{d.year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 80 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="bracket"
            stroke="#6b7280"
            angle={-45}
            textAnchor="end"
            height={100}
            style={{ fontSize: '11px' }}
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
            formatter={(value: number) => [value.toLocaleString('nb-NO') + ' personer', '']}
          />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          <Bar dataKey={selectedYear.toString()} fill={colors[0]} name={`${selectedYear}`} />
          {comparisonYear && (
            <Bar dataKey={comparisonYear.toString()} fill={colors[1]} name={`${comparisonYear}`} />
          )}
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Laveste inntekt (0 NOK)</p>
          <p className="text-2xl font-bold text-blue-900">
            {Math.round(yearData?.incomeBrackets[0]?.count || 0).toLocaleString('nb-NO')}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Høyeste inntekt (1.5M+)</p>
          <p className="text-2xl font-bold text-green-900">
            {Math.round(yearData?.incomeBrackets[yearData.incomeBrackets.length - 1]?.count || 0).toLocaleString('nb-NO')}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Totalt antall</p>
          <p className="text-2xl font-bold text-purple-900">
            {Math.round(yearData?.incomeBrackets.reduce((sum, b) => sum + b.count, 0) || 0).toLocaleString('nb-NO')}
          </p>
        </div>
      </div>
    </div>
  );
}
