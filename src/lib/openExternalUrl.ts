export const openExternalUrl = (url: string) => {
  // In embedded previews, opening external sites inside the iframe can fail (ERR_BLOCKED_BY_RESPONSE).
  // Prefer opening a real new tab/window.
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (opened) {
    opened.opener = null;
    return;
  }

  // Fallback: navigate current window
  window.location.href = url;
};
