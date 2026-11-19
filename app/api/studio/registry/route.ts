import { NextResponse } from 'next/server';
import { loadProjectRegistry } from '@/lib/services/studioRegistryServer';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cwd = process.cwd();
    const { registry, discoveredFiles, existsOnDisk } = loadProjectRegistry(cwd);
    return NextResponse.json({
      registry,
      discoveredFiles,
      existsOnDisk,
      syncedAt: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to load studio registry: ' + message },
      { status: 500 }
    );
  }
}
