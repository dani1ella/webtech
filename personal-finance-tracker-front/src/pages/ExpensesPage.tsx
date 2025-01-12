import React, { useState } from 'react';
import { format } from 'date-fns';
import { Plus, Search } from 'lucide-react';
import { DataTable } from '../components/shared/DataTable';
import { TransactionForm } from '../components/transactions/TransactionForm';
import type { Transaction } from '../types/finance';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

const mockExpenses: Transaction[] = [
  {
    id: '1',
    date: new Date('2024-03-01'),
    amount: 1200,
    category: 'Housing',
    description: 'Monthly Rent',
    type: 'expense',
  },
  // Add more mock data as needed
];

const columnHelper = createColumnHelper<Transaction>();

const columns: ColumnDef<Transaction, any>[] = [  // Explicitly type the columns here
  columnHelper.accessor('date', {
    header: 'Date',
    cell: (info) => {
      const dateValue = info.getValue() as Date;
      return format(dateValue, 'MMM d, yyyy');
    },
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: (info) => {
      const amount = info.getValue() as number;
      return `$${amount.toLocaleString()}`;
    },
  }),
  columnHelper.accessor('category', {
    header: 'Category',
  }),
  columnHelper.accessor('description', {
    header: 'Description',
  }),
];

export function ExpensesPage() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExpenses = mockExpenses.filter((expense) =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddExpense = (data: Transaction) => {
    console.log('Adding expense:', data);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Expenses</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage and track your expenses
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Expense
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search expenses..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white shadow rounded-lg">
        <DataTable
          data ={filteredExpenses}
          columns ={columns}
          pageSize ={10}
        />
      </div>

      {showForm && (
        <TransactionForm
          type="expense"
          onSubmit={handleAddExpense}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
