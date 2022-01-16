import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getSession } from 'next-auth/react'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const session = await getSession()

    if (session) {
            return NextResponse.next()
    }

    return new Response('Auth required', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
    })
}
