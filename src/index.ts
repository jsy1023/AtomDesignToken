/**
 * AtomSystem / AtomDesignToken Public API
 * Universal Design Token & UI Library
 */

// 1. Design Token Specifications & Models
export * from '../lib/data/tokens';
export * from '../lib/data/components';
export * from '../lib/data/patterns';
export * from '../lib/data/awesomeThemes';
export * from '../lib/data/themeEditorDefaults';

// 2. Theme Engines & Utilities
export * from '../lib/services/themeEngine';
export * from '../lib/utils';

// 3. Re-export basic CSS path helper
export const ATOM_UI_CSS_PATH = 'atomsystem/css/atom-ui.css';

/**
 * CLI Banner & Metadata
 */
export const ATOM_VERSION = '0.1.48';
export const ATOM_LIB_NAME = 'atomsystem';
