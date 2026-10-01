/**
 * AtomSystem Universal UI Helper (Vanilla JS / jQuery / Framework Interop)
 * Works directly in the browser or as an ES Module.
 */

export class AtomUI {
  /**
   * Set theme dynamically on root element (.white, .dark, or custom)
   * @param {string} themeName e.g., 'white', 'dark'
   */
  static setTheme(themeName) {
    const root = document.documentElement;
    root.classList.remove('white', 'dark');
    if (themeName) {
      root.classList.add(themeName);
    }
  }

  /**
   * Open an Atom modal dialog
   * @param {string|HTMLElement} modalSelector
   */
  static openModal(modalSelector) {
    const el = typeof modalSelector === 'string' ? document.querySelector(modalSelector) : modalSelector;
    if (el) {
      el.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  /**
   * Close an Atom modal dialog
   * @param {string|HTMLElement} modalSelector
   */
  static closeModal(modalSelector) {
    const el = typeof modalSelector === 'string' ? document.querySelector(modalSelector) : modalSelector;
    if (el) {
      el.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  /**
   * Auto-initialize data-atom attributes for Vanilla JS / jQuery users
   */
  static init() {
    if (typeof document === 'undefined') return;

    // Modal Triggers [data-atom-modal="target-id"]
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-atom-modal-open]');
      if (trigger) {
        const targetId = trigger.getAttribute('data-atom-modal-open');
        AtomUI.openModal(targetId);
      }

      const closeBtn = e.target.closest('[data-atom-modal-close]');
      if (closeBtn) {
        const targetModal = closeBtn.closest('.atom-backdrop');
        if (targetModal) {
          AtomUI.closeModal(targetModal);
        }
      }

      // Close when clicking outside modal content
      if (e.target.classList.contains('atom-backdrop')) {
        AtomUI.closeModal(e.target);
      }
    });
  }
}

// Auto init in browser
if (typeof window !== 'undefined') {
  window.AtomUI = AtomUI;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AtomUI.init());
  } else {
    AtomUI.init();
  }
}
