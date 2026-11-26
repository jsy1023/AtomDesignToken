import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { compileTokensToCss } from '@/src/tokenCompiler';

export async function GET() {
  const cwd = process.cwd();
  const tokensJsonPath = path.join(cwd, 'tokens', 'tokens.json');

  if (!fs.existsSync(tokensJsonPath)) {
    return NextResponse.json({ error: 'tokens/tokens.json not found' }, { status: 404 });
  }

  try {
    const rawData = fs.readFileSync(tokensJsonPath, 'utf-8');
    if (!rawData || !rawData.trim()) {
      return NextResponse.json({ tokens: {} });
    }
    const tokens = JSON.parse(rawData);
    return NextResponse.json({ tokens }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to read tokens.json: ' + error.message }, { status: 500 });
  }
}

const LOCAL_ORIGIN_RE = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i;

function getCorsHeaders(origin: string | null, allowNull = false): Record<string, string> {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Atom-Client',
  };
  if (origin && (LOCAL_ORIGIN_RE.test(origin) || (allowNull && origin === 'null'))) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Vary'] = 'Origin';
  }
  return headers;
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  if (origin && !LOCAL_ORIGIN_RE.test(origin) && origin !== 'null') {
    return NextResponse.json({ error: 'Forbidden origin' }, { status: 403 });
  }
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(origin, true),
  });
}

export async function POST(req: NextRequest) {
  // Security Guard: Restrict file modification to local development environments & local origins only
  const host = req.headers.get('host') || '';
  const origin = req.headers.get('origin');
  const secFetchSite = req.headers.get('sec-fetch-site');
  const isLocalHost =
    (host.startsWith('localhost') || host.startsWith('127.0.0.1')) &&
    process.env.NODE_ENV !== 'production';
  const isAllowedOrigin = !origin
    ? secFetchSite !== 'cross-site'
    : LOCAL_ORIGIN_RE.test(origin) || origin === 'null';

  if (!isLocalHost || !isAllowedOrigin) {
    return NextResponse.json({
      error: 'Forbidden: Studio token modification is only available in local development environments (npx atomsystem studio).',
    }, { status: 403 });
  }

  const cwd = process.cwd();
  const tokensJsonPath = path.join(cwd, 'tokens', 'tokens.json');
  const cssPath = path.join(cwd, 'css', 'atom-ui.css');

  try {
    const rawText = await req.text();
    if (!rawText || !rawText.trim()) {
      return NextResponse.json({ error: 'Empty payload' }, { status: 400 });
    }
    const body = JSON.parse(rawText);
    const newTokens = body.tokens;

    if (!newTokens || typeof newTokens !== 'object') {
      return NextResponse.json({ error: 'Invalid tokens payload' }, { status: 400 });
    }

    // 1. Save unified SSOT tokens/tokens.json
    const tokensDir = path.dirname(tokensJsonPath);
    if (!fs.existsSync(tokensDir)) {
      fs.mkdirSync(tokensDir, { recursive: true });
    }

    const formattedJson = `${JSON.stringify(newTokens, null, 2)}\n`;
    fs.writeFileSync(tokensJsonPath, formattedJson, 'utf-8');

    // 2. Auto-compile into css/atom-ui.css
    try {
      const compiledCss = compileTokensToCss(newTokens);
      const customCss = typeof body.css === 'string' ? body.css : '';
      let combinedCss = customCss ? `${customCss}\n\n${compiledCss}` : compiledCss;

      // Read existing css/atom-ui.css to preserve semantic UI classes
      let fullCss = combinedCss;
      if (fs.existsSync(cssPath)) {
        const existingCss = fs.readFileSync(cssPath, 'utf-8');
        const splitIndex = existingCss.indexOf('/* === Universal Component Classes === */');
        if (splitIndex !== -1) {
          fullCss = combinedCss + '\n' + existingCss.slice(splitIndex);
        }
      }
      fs.writeFileSync(cssPath, fullCss, 'utf-8');
    } catch (compileErr) {
      console.warn('Auto compile CSS warning:', compileErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully updated tokens/tokens.json and recompiled css/atom-ui.css',
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to save tokens: ' + error.message }, { status: 500 });
  }
}
