import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Budget } from '../types/finance';

const mockBudgets: Budget[] = [
  {
    id: '1',
    category: 'Housing',
    limit: 1500,
    spent: 1200,
  },
  {
    id: '2',
    category: 'Food',
    limit: 800,
    spent: 600,
  },
  // Add more mock data as needed
];

export function BudgetPage() {
  const [showForm, setShowForm] = useState(false);

  const getProgressColor = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Budget</h1>
          <p className="mt-2 text-sm text-gray-600">
            Set and track your spending limits
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Budget
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockBudgets.map((budget) => (
          <div key={budget.id} className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">{budget.category}</h3>
              <span className="text-sm text-gray-500">
                ${budget.spent.toLocaleString()} of ${budget.limit.toLocaleString()}
              </span>
            </div>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${(budget.spent / budget.limit) * 100}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getProgressColor(
                    budget.spent,
                    budget.limit
                  )}`}
                />
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{((budget.spent / budget.limit) * 100).toFixed(1)}% spent</span>
              <span>${(budget.limit - budget.spent).toLocaleString()} remaining</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}