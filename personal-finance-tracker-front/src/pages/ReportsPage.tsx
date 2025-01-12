import React, { useState } from 'react';
import { format } from 'date-fns';
import { Download } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const mockData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Income',
      data: [4500, 5000, 4800, 5200, 5100, 4900],
      backgroundColor: '#10B981',
    },
    {
      label: 'Expenses',
      data: [3000, 3200, 2900, 3400, 3100, 3300],
      backgroundColor: '#EF4444',
    },
  ],
};

export function ReportsPage() {
  const [dateRange, setDateRange] = useState({
    start: format(new Date().setMonth(new Date().getMonth() - 6), 'yyyy-MM-dd'),
    end: format(new Date(), 'yyyy-MM-dd'),
  });

  // CSV export function
  const handleCSVDownload = () => {
    const header = ['Month', 'Income', 'Expenses'];
    const data = mockData.labels.map((label, index) => [
      label,
      mockData.datasets[0].data[index],
      mockData.datasets[1].data[index],
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,' + header.join(',') + '\n';
    data.forEach((row) => {
      csvContent += row.join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'financial_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF export function
  const handlePDFDownload = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Financial Report', 20, 20);

    const tableData = mockData.labels.map((label, index) => [
      label,
      mockData.datasets[0].data[index],
      mockData.datasets[1].data[index],
    ]);

    doc.autoTable({
      head: [['Month', 'Income', 'Expenses']],
      body: tableData,
      startY: 30,
    });

    doc.save('financial_report.pdf');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <p className="mt-2 text-sm text-gray-600">
          Generate and download financial reports
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="space-x-4">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, start: e.target.value }))
              }
              className="border border-gray-300 rounded-md shadow-sm px-3 py-2"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, end: e.target.value }))
              }
              className="border border-gray-300 rounded-md shadow-sm px-3 py-2"
            />
          </div>
          <div className="space-x-2">
            <button
              onClick={handlePDFDownload}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Download className="h-4 w-4 mr-2" />
              PDF
            </button>
            <button
              onClick={handleCSVDownload}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-2" />
              CSV
            </button>
          </div>
        </div>

        <div className="h-96">
          <Bar
            data={mockData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
