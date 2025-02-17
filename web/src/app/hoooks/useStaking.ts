import { useState } from 'react';
import { stakeTokens } from '../utils/staking';

export const useStaking = () => {
  const [amount, setAmount] = useState('');
  const [apy, setApy] = useState('12.5');

  const handleStake = async () => {
    if (!amount) return;
    const result = await stakeTokens(parseFloat(amount));
    setApy(result.newApy);
  };

  return { amount, setAmount, apy, handleStake };
};