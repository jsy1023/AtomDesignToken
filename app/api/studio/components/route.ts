import { NextRequest, NextResponse } from 'next/server';
import { submitComponentSpec } from '@/lib/services/studioRegistryServer';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const host = req.headers.get('host') || '';
  const isLocal = host.includes('localhost') || host.includes('127.0.0.1') || process.env.NODE_ENV === 'development';

  if (!isLocal) {
    return NextResponse.json(
      {
        success: false,
        errors: ['Forbidden: Component registration is only available in local development environments.'],
      },
      { status: 403 }
    );
  }

  try {
    const rawText = await req.text();
    if (!rawText || !rawText.trim()) {
      return NextResponse.json(
        { success: false, errors: ['Empty request body. Provide a component specification JSON.'] },
        { status: 400 }
      );
    }

    const parsed = JSON.parse(rawText);
    const spec = parsed?.spec && typeof parsed.spec === 'object' ? parsed.spec : parsed;
    const result = submitComponentSpec(process.cwd(), spec);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.errors || ['Validation failed.'] },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      component: result.component,
      registry: result.registry,
      filesWritten: result.filesWritten,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, errors: [`Invalid JSON or write failure: ${message}`] },
      { status: 400 }
    );
  }
}
