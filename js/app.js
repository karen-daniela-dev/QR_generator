/* ============================================================
   app.js — Application orchestrator (entry point)
   Single responsibility: wire modules together and handle events.
   No business logic here; delegates to UI, QREngine, History.
   ============================================================ */

(() => {
  /* ── Boot ── */
  function init() {
    UI.init();
    UI.applySocialLinks();
  
    bindEvents();
  }

  /* ── Event bindings ── */
  function bindEvents() {
    const { el } = UI;

    // Generate QR
    el.btnGenerate.addEventListener('click', onGenerate);

    // Allow Enter key in URL field
    el.urlInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') onGenerate();
    });

    // Clear all
    el.btnClear.addEventListener('click', () => {
      UI.resetForm();
      el.colorInput.value = CONFIG.QR.COLOR_DARK_DEFAULT;
      UI.updateColorLabel(CONFIG.QR.COLOR_DARK_DEFAULT);
      el.sizeSelect.value = CONFIG.QR.DEFAULT_SIZE;
     
    });

    // Save PNG
    el.btnSave.addEventListener('click', () => {
      QREngine.exportPNG(el.qrFrame, CONFIG.QR.EXPORT_FILENAME);
    });

    // Copy to clipboard
    el.btnCopy.addEventListener('click', async () => {
      try {
        await QREngine.copyToClipboard(el.qrFrame);
        UI.setCopySuccess();
      } catch {
        alert('Tu navegador no soporta copiar imágenes al portapapeles. Usa "Guardar PNG".');
      }
    });

    // Color picker → update label in real time
    el.colorInput.addEventListener('input', () => {
      UI.updateColorLabel(el.colorInput.value);
    });

    // Clear error on typing
    el.urlInput.addEventListener('input', UI.clearError);
  }

  /* ── Handlers ── */

  async function onGenerate() {
    const { el } = UI;
    const url   = el.urlInput.value.trim();
    const error = UI.validateURL(url);

    if (error) {
      UI.showError(error);
      el.urlInput.focus();
      return;
    }

    UI.clearError();

    const size  = parseInt(el.sizeSelect.value, 10);
    const color = el.colorInput.value;

    await QREngine.generate(el.qrFrame, url, { size, colorDark: color });

    UI.showQROutput();
    
  }


  /* ── Start ── */
  document.addEventListener('DOMContentLoaded', init);
})();
