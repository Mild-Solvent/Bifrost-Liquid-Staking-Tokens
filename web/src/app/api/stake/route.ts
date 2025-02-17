import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { amount } = await req.json();
  
  // Mock blockchain interaction
  return NextResponse.json({
    success: true,
    vTokenAmount: amount,
    newApy: (12.5 + Math.random() * 0.5).toFixed(2)
  });
}