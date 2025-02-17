export const stakeTokens = async (amount: number) => {
    const response = await fetch('/api/stake', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
    return response.json();
  };