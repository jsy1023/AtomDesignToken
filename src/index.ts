/**
 * AtomSystem / AtomDesignToken Public API
 * Universal Design Token & UI Library
 */

// 1. Design Token Specifications & Studio SSOT Registry Models
export * from '../lib/data/tokens';
export * from '../lib/data/components';
export * from '../lib/data/patterns';
export * from '../lib/data/awesomeThemes';
export * from '../lib/data/themeEditorDefaults';
export * from '../lib/data/studioData';
export * from '../lib/tokens';

// 2. Theme / Studio Engines & Utilities
export * from '../lib/services/themeEngine';
export * from '../lib/services/studioEngine';
export * from '../lib/utils';
export * from './refactorEngine';

// 3. Real-world UseCase Solutions
export * from '../components/usecases/EnterpriseDashboardUseCase';

// 4. Re-export basic CSS & Registry paths
export const ATOM_UI_CSS_PATH = 'atomsystem/css/atom-ui.css';
export const ATOM_TOKENS_PATH = 'atomsystem/tokens.json';
export const ATOM_STUDIO_REGISTRY_PATH = ATOM_TOKENS_PATH;

/**
 * CLI Banner & Metadata
 */
export const ATOM_VERSION = '0.15.1';
export const ATOM_LIB_NAME = 'atomsystem';
