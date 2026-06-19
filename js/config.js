/* ============================================================
   config.js — App-wide constants
   Change values here; never hardcode them elsewhere.
   ============================================================ */

const CONFIG = Object.freeze({
  // QR generation
  QR: {
    DEFAULT_SIZE:        260,         // pixels
    ERROR_CORRECTION:    'H',         // H = 30% recovery — máxima tolerancia a daño físico
    COLOR_DARK_DEFAULT:  '#1a1c24',   // near-black for print contrast
    COLOR_LIGHT:         '#ffffff',
    EXPORT_QUIET_ZONE:   20,          // extra white border on saved PNG (px)
    EXPORT_FILENAME:     'qr-karen-daniela.png',
    OVERLAY_DELAY_MS:    200,         // wait for QRCode lib to render canvas
  },



  // Social links — update portfolio URL here
  SOCIAL: {
  LINKEDIN:  'https://www.linkedin.com/in/karen-daniela-diaz-trochez-dev/'
  },
});
