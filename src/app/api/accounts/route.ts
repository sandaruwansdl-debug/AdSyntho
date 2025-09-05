import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const adAccounts = await prisma.adAccount.findMany({
      where: {
        userId: session.user.id,
        isActive: true
      },
      select: {
        id: true,
        platform: true,
        accountId: true,
        accountName: true,
        isActive: true,
        lastSyncAt: true,
        syncStatus: true,
        createdAt: true,
        _count: {
          select: {
            campaigns: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ accounts: adAccounts })
  } catch (error) {
    console.error('Error fetching accounts:', error)
    return NextResponse.json({ error: 'Failed to fetch accounts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { platform, accountId, accountName, accessToken, refreshToken, expiresAt } = await request.json()

    // Validate required fields
    if (!platform || !accountId || !accountName || !accessToken) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if account already exists
    const existingAccount = await prisma.adAccount.findFirst({
      where: {
        userId: session.user.id,
        platform: platform,
        accountId: accountId
      }
    })

    if (existingAccount) {
      return NextResponse.json({ error: 'Account already connected' }, { status: 409 })
    }

    // Create new ad account
    const adAccount = await prisma.adAccount.create({
      data: {
        userId: session.user.id,
        platform: platform,
        accountId: accountId,
        accountName: accountName,
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        isActive: true,
        syncStatus: 'pending'
      }
    })

    return NextResponse.json({ 
      success: true, 
      account: adAccount,
      message: 'Account connected successfully' 
    })
  } catch (error) {
    console.error('Error creating account:', error)
    return NextResponse.json({ error: 'Failed to connect account' }, { status: 500 })
  }
}
