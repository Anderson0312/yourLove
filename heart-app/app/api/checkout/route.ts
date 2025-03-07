import { NextResponse } from "next/server";

const API_BASE_URL2 = 'http://localhost:4000/api'

export async function POST(req: Request) {
    try {
      const { items } = await req.json();;
  
      const response = await fetch(`${API_BASE_URL2}/checkout/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao criar sessão de checkout');
      }
  
      const { url } = await response.json();
      return NextResponse.json({ url });
    } catch (error) {
      return NextResponse.json({ error: 'Falha ao iniciar checkout' }, { status: 500 });
    }
  }