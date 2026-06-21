export const getDisplayImg = (url) => {
  if (!url) return '';
  if (url.startsWith('https://placehold.co/')) {
    try {
      const parsed = new URL(url);
      const pathname = parsed.pathname;
      const text = parsed.searchParams.get('text') || '';
      
      const parts = pathname.split('/').filter(Boolean);
      if (parts.length >= 3) {
        const size = parts[0];
        const bgColor = '#' + parts[1];
        const textColor = '#' + parts[2];
        const [w, h] = size.split('x').map(Number);
        
        // Use system-ui or Thonburi / Arial for standard Thai font support in SVG
        const fontSize = Math.round(h * 0.28);
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
          <rect width="100%" height="100%" fill="${bgColor}"/>
          <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="${fontSize}px" fill="${textColor}">${decodeURIComponent(text)}</text>
        </svg>`;
        return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
      }
    } catch (e) {
      console.error("Error parsing placehold.co URL:", e);
    }
  }
  return url;
};
