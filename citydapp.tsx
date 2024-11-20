import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Map from './Map';
import ReportForm from './ReportForm';
import AIAnalysis from './AIAnalysis';

const SafeCityDApp = () => {
  const [account, setAccount] = useState(null);
  const [reports, setReports] = useState([]);
  const [reportingContract, setReportingContract] = useState(null);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts'
        });
        setAccount(accounts[0]);
        setupContract();
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const setupContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_REPORTING_CONTRACT!,
      ['function submitReport(string,string,uint256[]) public returns (uint256)',
       'function getAllReports() public view returns (tuple(uint256,address,string,string,uint256[],uint256,string)[])',
      ],
      signer
    );
    setReportingContract(contract);
    loadReports();
  };

  const loadReports = async () => {
    if (reportingContract) {
      try {
        const allReports = await reportingContract.getAllReports();
        setReports(allReports);
      } catch (error) {
        console.error("Error loading reports:", error);
      }
    }
  };

  const handleSubmitReport = async (reportData) => {
    try {
      const tx = await reportingContract.submitReport(
        reportData.description,
        reportData.type,
        reportData.location
      );
      await tx.wait();
      loadReports();
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Safe City</CardTitle>
      </CardHeader>
      <CardContent>
        {!account ? (
          <button 
            onClick={connectWallet}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <ReportForm onSubmit={handleSubmitReport} />
            <div className="mt-8">
              <Map reports={reports} />
            </div>
            <AIAnalysis reports={reports} />
            <div className="mt-4 text-sm text-gray-500">
              Connected: {account}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SafeCityDApp;
