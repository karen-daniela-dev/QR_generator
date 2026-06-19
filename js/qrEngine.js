/* ============================================================
   qrEngine.js — QR generation & export logic
   Single responsibility: generate QR codes and export them.
   No UI state, no DOM selection outside its API params.
   ============================================================ */

const QREngine = (() => {

  /**
   * Generate a QR code into a container element.
   * Clears the container first.
   *
   * Best-practice settings applied:
   *  - Error correction H (30%) — tolera daño físico (rasgaduras, manchas)
   *  - Near-black color (not pure #000) — better on uncoated paper
   *  - Size driven by caller (S/M/L selection)
   *
   * @param {HTMLElement} container  DOM node to render into
   * @param {string}      text       URL or text to encode
   * @param {object}      opts
   * @param {number}      opts.size  Canvas size in px
   * @param {string}      opts.colorDark  Hex color for dark modules
   * @returns {Promise<void>}
   */
  function generate(container, text, { size, colorDark } = {}) {
    container.innerHTML = '';

    const qrSize      = size      || CONFIG.QR.DEFAULT_SIZE;
    const qrColorDark = colorDark || CONFIG.QR.COLOR_DARK_DEFAULT;

    return new Promise((resolve) => {
      new QRCode(container, {
        text,
        width:          qrSize,
        height:         qrSize,
        colorDark:      qrColorDark,
        colorLight:     CONFIG.QR.COLOR_LIGHT,
        correctLevel:   QRCode.CorrectLevel[CONFIG.QR.ERROR_CORRECTION],
      });
      // QRCode library renders synchronously but we give the browser
      // one tick to paint before resolving
      setTimeout(resolve, CONFIG.QR.OVERLAY_DELAY_MS);
    });
  }

  /**
   * Export the current QR canvas as a PNG download.
   * Adds a clean quiet zone (white margin) per ISO 18004 recommendation.
   *
   * @param {HTMLElement} container
   * @param {string}      filename
   */
  function exportPNG(container, filename) {
    const canvas = container.querySelector('canvas');
    if (!canvas) return;

    const margin = CONFIG.QR.EXPORT_QUIET_ZONE;
    const out    = document.createElement('canvas');
    out.width    = canvas.width  + margin * 2;
    out.height   = canvas.height + margin * 2;

    const ctx = out.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, out.width, out.height);
    ctx.drawImage(canvas, margin, margin);

    const link = document.createElement('a');
    link.download = filename || CONFIG.QR.EXPORT_FILENAME;
    link.href = out.toDataURL('image/png');
    link.click();
  }

  /**
   * Copy the QR canvas as a PNG blob to the clipboard.
   * @param {HTMLElement} container
   * @returns {Promise<void>}
   */
  async function copyToClipboard(container) {
    const canvas = container.querySelector('canvas');
    if (!canvas) throw new Error('No canvas found');

    return new Promise((resolve, reject) => {
      canvas.toBlob(async (blob) => {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          resolve();
        } catch (e) {
          reject(e);
        }
      }, 'image/png');
    });
  }

  return { generate, exportPNG, copyToClipboard };
})();
