import React, { useState } from 'react';
import { format } from 'date-fns';
import { Plus, Search } from 'lucide-react';
import { DataTable } from '../components/shared/DataTable';
import { TransactionForm } from '../components/transactions/TransactionForm';
import type { Transaction } from '../types/finance';

const mockIncome: Transaction[] = [
  {
    id: '1',
    date: new Date('2024-03-01'),
    amount: 5000,
    category: 'Salary',
    description: 'Monthly Salary',
    type: 'income',
  },
  // Add more mock data as needed
];

const columns = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: (info: any) => format(info.getValue(), 'MMM d, yyyy'),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: (info: any) => `$${info.getValue().toLocaleString()}`,
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
];

export function IncomePage() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIncome = mockIncome.filter((income) =>
    income.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    income.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddIncome = (data: any) => {
    console.log('Adding income:', data);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Income</h1>
          <p className="mt-2 text-sm text-gray-600">
            Track your income sources
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Income
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search income..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white shadow rounded-lg">
        <DataTable
          data={filteredIncome}
          columns={columns}
          pageSize={10}
        />
      </div>

      {showForm && (
        <TransactionForm
          type="income"
          onSubmit={handleAddIncome}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}