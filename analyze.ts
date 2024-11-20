import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { reports } = req.body;

  try {
    const response = await fetch('https://api.llama-api.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LLAMA_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-2-70b-chat',
        messages: [
          {
            role: 'system',
            content: 'You are a security expert analyzing urban incident reports.'
          },
          {
            role: 'user',
            content: `Analyze these security reports and provide insights: ${JSON.stringify(reports)}`
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    return res.status(200).json({ 
      analysis: data.choices[0].message.content 
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Analysis failed' });
  }
}
