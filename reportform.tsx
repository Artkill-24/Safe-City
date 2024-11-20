import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ReportFormProps {
  onSubmit: (reportData: any) => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    type: 'SECURITY',
    description: '',
    location: [45.4642, 9.1900] // Default Milano center
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      ...formData,
      description: ''
    });
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Report Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="SECURITY">Security Issue</option>
              <option value="INFRASTRUCTURE">Infrastructure Problem</option>
              <option value="VANDALISM">Vandalism</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows={3}
              placeholder="Describe the issue..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit Report
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReportForm;
