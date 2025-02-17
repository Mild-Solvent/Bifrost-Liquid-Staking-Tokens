import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { amount, fromChain, toChain } = await req.json();
  
  return NextResponse.json({
    success: true,
    convertedAmount: amount,
    txHash: `0x${Math.random().toString(16).slice(2)}`
  });
}