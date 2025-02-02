import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // const res = await fetch(process.env.PATH_URL_BACKEND + '/api/posts', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // const result = await res.json();
  // return NextResponse.json({ result });
  return NextResponse.json({ success: true });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/otp/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    // console.log('-----otp data-----');
    // console.log(res);
    // console.log(res.ok);

    if (res.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' });
  }
}
