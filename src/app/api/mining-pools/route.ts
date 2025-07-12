import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://6872860b76a5723aacd505be.mockapi.io/api/mining-pools/pool');

    if (!response.ok) {
      throw new Error(`Ошибка! Статус: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Ошибка загрузки пуллов:', error);
    return NextResponse.json({ error: 'Ошибка загрузки пуллов' }, { status: 500 });
  }
}
