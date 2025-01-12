import React, { useState } from 'react';
import { DollarSign, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { MetricCard } from '../components/dashboard/MetricCard';
import { ExpenseChart } from '../components/dashboard/ExpenseChart';
import { IncomeExpenseChart } from '../components/dashboard/IncomeExpenseChart';

const mockData = {
  metrics: {
    totalIncome: 5000,
    totalExpenses: 3000,
    netBalance: 2000,
  },
  expensesByCategory: [
    { category: 'Housing', amount: 1200 },
    { category: 'Food', amount: 800 },
    { category: 'Transportation', amount: 400 },
    { category: 'Entertainment', amount: 300 },
    { category: 'Utilities', amount: 300 },
  ],
  monthlyData: [
    { month: 'Jan', income: 4800, expenses: 2900 },
    { month: 'Feb', income: 5000, expenses: 3000 },
    { month: 'Mar', income: 5200, expenses: 3100 },
  ],
};

export function DashboardPage() {
  // State for modal visibility and inputs
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [newIncome, setNewIncome] = useState(0);
  const [newExpense, setNewExpense] = useState(0);

  // Handle the "Add Income" button click
  const handleAddIncome = () => {
    setShowIncomeModal(true);
  };

  // Handle the "Add Expense" button click
  const handleAddExpense = () => {
    setShowExpenseModal(true);
  };

  // Handle income form submission
  const handleIncomeSubmit = () => {
    mockData.metrics.totalIncome += newIncome;
    mockData.metrics.netBalance += newIncome;
    setShowIncomeModal(false);
    setNewIncome(0);
  };

  // Handle expense form submission
  const handleExpenseSubmit = () => {
    mockData.metrics.totalExpenses += newExpense;
    mockData.metrics.netBalance -= newExpense;
    setShowExpenseModal(false);
    setNewExpense(0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Your financial overview and summary
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Income"
          value={`$${mockData.metrics.totalIncome.toLocaleString()}`}
          icon={TrendingUp}
          trend={{ value: 8.2, isPositive: true }}
        />
        <MetricCard
          title="Total Expenses"
          value={`$${mockData.metrics.totalExpenses.toLocaleString()}`}
          icon={TrendingDown}
          trend={{ value: 5.1, isPositive: false }}
        />
        <MetricCard
          title="Net Balance"
          value={`$${mockData.metrics.netBalance.toLocaleString()}`}
          icon={Wallet}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseChart data={mockData.expensesByCategory} />
        <IncomeExpenseChart data={mockData.monthlyData} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleAddIncome}
            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <DollarSign className="mr-2 h-5 w-5" />
            Add Income
          </button>
          <button
            onClick={handleAddExpense}
            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            <Wallet className="mr-2 h-5 w-5" />
            Add Expense
          </button>
        </div>
      </div>

      {/* Add Income Modal */}
      {showIncomeModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-1/3">
            <h3 className="text-xl font-medium">Add Income</h3>
            <input
              type="number"
              value={newIncome}
              onChange={(e) => setNewIncome(Number(e.target.value))}
              className="border border-gray-300 rounded-md shadow-sm px-3 py-2 mt-4 w-full"
              placeholder="Enter income amount"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleIncomeSubmit}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                Add Income
              </button>
              <button
                onClick={() => setShowIncomeModal(false)}
                className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Expense Modal */}
      {showExpenseModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-1/3">
            <h3 className="text-xl font-medium">Add Expense</h3>
            <input
              type="number"
              value={newExpense}
              onChange={(e) => setNewExpense(Number(e.target.value))}
              className="border border-gray-300 rounded-md shadow-sm px-3 py-2 mt-4 w-full"
              placeholder="Enter expense amount"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleExpenseSubmit}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Add Expense
              </button>
              <button
                onClick={() => setShowExpenseModal(false)}
                className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
