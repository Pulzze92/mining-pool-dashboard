import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const response = await fetch(
      `https://6872860b76a5723aacd505be.mockapi.io/api/mining-pools/pool/${id}`
    );

    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to load pool' }, { status: 500 });
  }
}
