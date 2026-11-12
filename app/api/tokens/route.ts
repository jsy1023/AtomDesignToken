import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { compileTokensToCss } from '@/src/tokenCompiler';

export async function GET() {
  const cwd = process.cwd();
  const tokenJsonPath = path.join(cwd, 'tokens', 'token.json');

  if (!fs.existsSync(tokenJsonPath)) {
    return NextResponse.json({ error: 'tokens/token.json not found' }, { status: 404 });
  }

  try {
    const rawData = fs.readFileSync(tokenJsonPath, 'utf-8');
    const tokens = JSON.parse(rawData);
    return NextResponse.json({ tokens });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to read token.json: ' + error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  // Security Guard: Restrict file modification to local development environments only
  const host = req.headers.get('host') || '';
  const isLocal = host.includes('localhost') || host.includes('127.0.0.1') || process.env.NODE_ENV === 'development';

  if (!isLocal) {
    return NextResponse.json({
      error: 'Forbidden: Studio token modification is only available in local development environments (npx atomsystem studio).',
    }, { status: 403 });
  }

  const cwd = process.cwd();
  const tokenJsonPath = path.join(cwd, 'tokens', 'token.json');
  const tokensJsonAltPath = path.join(cwd, 'tokens', 'tokens.json');
  const cssPath = path.join(cwd, 'css', 'atom-ui.css');

  try {
    const body = await req.json();
    const newTokens = body.tokens;

    if (!newTokens || typeof newTokens !== 'object') {
      return NextResponse.json({ error: 'Invalid tokens payload' }, { status: 400 });
    }

    // 1. Save tokens/token.json & tokens/tokens.json
    const tokensDir = path.dirname(tokenJsonPath);
    if (!fs.existsSync(tokensDir)) {
      fs.mkdirSync(tokensDir, { recursive: true });
    }

    const formattedJson = JSON.stringify(newTokens, null, 2);
    fs.writeFileSync(tokenJsonPath, formattedJson, 'utf-8');
    if (fs.existsSync(tokensJsonAltPath)) {
      fs.writeFileSync(tokensJsonAltPath, formattedJson, 'utf-8');
    }

    // 2. Auto-compile into css/atom-ui.css
    try {
      const compiledCss = compileTokensToCss(newTokens);
      // Read existing css/atom-ui.css to preserve semantic UI classes
      let fullCss = compiledCss;
      if (fs.existsSync(cssPath)) {
        const existingCss = fs.readFileSync(cssPath, 'utf-8');
        const splitIndex = existingCss.indexOf('/* === Universal Component Classes === */');
        if (splitIndex !== -1) {
          fullCss = compiledCss + '\n' + existingCss.slice(splitIndex);
        }
      }
      fs.writeFileSync(cssPath, fullCss, 'utf-8');
    } catch (compileErr) {
      console.warn('Auto compile CSS warning:', compileErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully updated tokens/token.json and recompiled css/atom-ui.css',
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to save tokens: ' + error.message }, { status: 500 });
  }
}
