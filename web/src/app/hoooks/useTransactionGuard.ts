import { useEffect, useState } from 'react';

export const useTransactionGuard = (txData: any) => {
  const [risk, setRisk] = useState<{ level: string; message: string }>();

  useEffect(() => {
    const checkRisk = async () => {
      // Simulate risk analysis
      const riskLevel = Math.random() > 0.8 ? 'high' : 'low';
      setRisk({
        level: riskLevel,
        message: riskLevel === 'high' 
          ? 'Potential risk detected!' 
          : 'Transaction appears safe'
      });
    };

    if (txData) checkRisk();
  }, [txData]);

  return risk;
};