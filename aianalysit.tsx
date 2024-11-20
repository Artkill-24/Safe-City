import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface AIAnalysisProps {
  reports: any[];
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ reports }) => {
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const analyzeReports = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reports }),
      });
      
      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error('Error analyzing reports:', error);
    }
    setLoading(false);
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>AI Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <button
          onClick={analyzeReports}
          disabled={loading || reports.length === 0}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Reports'}
        </button>
        
        {analysis && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <pre className="whitespace-pre-wrap">{analysis}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIAnalysis;
