import tokensJson from '../../tokens/tokens.json';
import { AtomTokenSystem, isUnifiedTokensDocument } from './AtomTokenSystem';
import { ComponentTokenLayer } from './ComponentTokens';
import { PaletteTokenLayer } from './PaletteTokens';
import { ThemeTokenLayer } from './ThemeTokens';
import { TokenReferenceResolver } from './TokenReferenceResolver';
import type { UnifiedTokensDocument } from './types';

export * from './types';
export * from './TokenReferenceResolver';
export * from './PaletteTokens';
export * from './ThemeTokens';
export * from './ComponentTokens';
export * from './AtomTokenSystem';

export const UNIFIED_TOKENS_DOCUMENT: UnifiedTokensDocument =
  tokensJson as unknown as UnifiedTokensDocument;

/**
 * Canonical SSOT singleton loaded directly from `tokens/tokens.json`.
 * Provides object-oriented navigation and alias resolution across `palette`, `theme`, and `components`.
 */
export const atomTokens: AtomTokenSystem = AtomTokenSystem.fromDocument(
  UNIFIED_TOKENS_DOCUMENT
);

export const paletteTokens: PaletteTokenLayer = atomTokens.palette;
export const themeTokens: ThemeTokenLayer = atomTokens.theme;
export const componentTokens: ComponentTokenLayer = atomTokens.components;
export const tokenResolver: TokenReferenceResolver = atomTokens.resolver;

export { isUnifiedTokensDocument };
