import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  // Security Guard: Restrict file modification to local development environments only
  const host = req.headers.get('host') || '';
  const isLocal = host.includes('localhost') || host.includes('127.0.0.1') || process.env.NODE_ENV === 'development';

  if (!isLocal) {
    return NextResponse.json(
      {
        error: 'Forbidden: Studio token modification is only available in local development environments.',
      },
      { status: 403 }
    );
  }

  const cwd = process.cwd();
  const tokenJsonPath = path.join(cwd, 'tokens', 'token.json');
  const tokensJsonAltPath = path.join(cwd, 'tokens', 'tokens.json');
  const cssPath = path.join(cwd, 'css', 'atom-ui.css');

  try {
    const rawText = await req.text();
    if (!rawText || !rawText.trim()) {
      return NextResponse.json({ error: 'Empty request payload' }, { status: 400 });
    }

    const body = JSON.parse(rawText);
    const { tokensJson, cssString } = body;

    // 1. Save tokens/token.json & tokens/tokens.json if provided
    if (tokensJson) {
      const tokensDir = path.dirname(tokenJsonPath);
      if (!fs.existsSync(tokensDir)) {
        fs.mkdirSync(tokensDir, { recursive: true });
      }

      const formattedJson = typeof tokensJson === 'string'
        ? tokensJson
        : JSON.stringify(tokensJson, null, 2);

      fs.writeFileSync(tokenJsonPath, formattedJson, 'utf-8');
      if (fs.existsSync(tokensJsonAltPath)) {
        fs.writeFileSync(tokensJsonAltPath, formattedJson, 'utf-8');
      }
    }

    // 2. Save css/atom-ui.css if provided (preserve Universal Component Classes)
    if (cssString && typeof cssString === 'string') {
      const cssDir = path.dirname(cssPath);
      if (!fs.existsSync(cssDir)) {
        fs.mkdirSync(cssDir, { recursive: true });
      }
      let fullCss = cssString;
      if (fs.existsSync(cssPath) && !cssString.includes('/* === Universal Component Classes === */')) {
        const existingCss = fs.readFileSync(cssPath, 'utf-8');
        const splitIndex = existingCss.indexOf('/* === Universal Component Classes === */');
        if (splitIndex !== -1) {
          fullCss = `${cssString.trimEnd()}\n\n${existingCss.slice(splitIndex)}`;
        }
      }
      fs.writeFileSync(cssPath, fullCss, 'utf-8');
    }

    return NextResponse.json({
      success: true,
      message: 'Studio changes successfully saved to project files (token.json & atom-ui.css)',
    });
  } catch (error: any) {
    console.error('Error saving studio project files:', error);
    return NextResponse.json(
      { error: 'Failed to save studio files: ' + (error?.message || 'Unknown error') },
      { status: 500 }
    );
  }
}
