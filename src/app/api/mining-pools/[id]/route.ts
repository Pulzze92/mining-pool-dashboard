import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    console.log('Запрос пулла с ID:', id);

    const response = await fetch(
      `https://6872860b76a5723aacd505be.mockapi.io/api/mining-pools/pool/${id}`
    );

    console.log('Статус ответа:', response.status);

    if (!response.ok) {
      throw new Error(`Ошибка! Статус: ${response.status}`);
    }

    const data = await response.json();
    console.log('Данные получены:', data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Ошибка загрузки пулла:', error);
    return NextResponse.json({ error: 'Ошибка загрузки пулла' }, { status: 500 });
  }
}
