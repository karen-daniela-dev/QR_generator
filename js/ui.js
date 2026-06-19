/* ============================================================
   ui.js — DOM selectors & UI helper functions
   Single responsibility: expose DOM elements and UI utilities.
   No business logic here; no direct QR or storage calls.
   ============================================================ */

const UI = (() => {

  /* ── DOM selectors (resolved once at init) ── */
  const el = {};

  function init() {
    el.urlInput      = document.getElementById('url-input');
    el.urlError      = document.getElementById('url-error');
    el.sizeSelect    = document.getElementById('size-select');
    el.colorInput    = document.getElementById('color-input');
    el.colorLabel    = document.getElementById('color-label');
    el.btnGenerate   = document.getElementById('btn-generate');
    el.btnClear      = document.getElementById('btn-clear');
    el.qrOutput      = document.getElementById('qr-output');
    el.qrFrame       = document.getElementById('qr-frame');
    el.btnSave       = document.getElementById('btn-save');
    el.btnCopy       = document.getElementById('btn-copy');
    el.portfolioBtn  = document.getElementById('portfolio-btn');
  }

  /* ── Validation ── */
  function validateURL(value) {
    if (!value.trim()) return 'Ingresa una URL o texto.';
    return null;
  }

  function showError(message) {
    el.urlError.textContent   = message || '';
    el.urlInput.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function clearError() {
    showError('');
  }

  /* ── QR output visibility ── */
  function showQROutput() {
    el.qrOutput.classList.add('is-visible');
    el.qrOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideQROutput() {
    el.qrOutput.classList.remove('is-visible');
    el.qrFrame.innerHTML = '';
  }

  /* ── Copy button feedback ── */
  function setCopySuccess() {
    const original = el.btnCopy.innerHTML;
    el.btnCopy.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
           stroke-linecap="round" stroke-linejoin="round" class="icon icon--sm">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      Copiado
    `;
    el.btnCopy.classList.add('btn--copied');
    setTimeout(() => {
      el.btnCopy.innerHTML = original;
      el.btnCopy.classList.remove('btn--copied');
    }, 2000);
  }

  /* ── Reset entire form ── */
  function resetForm() {
    el.urlInput.value = '';
    clearError();
    hideQROutput();
    el.urlInput.focus();
  }

  /* ── Color label sync ── */
  function updateColorLabel(hex) {
    el.colorLabel.textContent = hex;
  }

  /* ── Apply social links from config ── */
  function applySocialLinks() {
    const linkedin = document.querySelector('[aria-label="LinkedIn de Karen Daniela"]');
    if (linkedin) linkedin.href = CONFIG.SOCIAL.LINKEDIN;
    if (el.portfolioBtn) el.portfolioBtn.href = CONFIG.SOCIAL.PORTFOLIO;
  }

  return {
    init,
    el,
    validateURL,
    showError,
    clearError,
    showQROutput,
    hideQROutput,
    setCopySuccess,
    resetForm,
    updateColorLabel,
    applySocialLinks,
  };
})();
