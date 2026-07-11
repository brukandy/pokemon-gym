const SET_SIZE = 122;
const CDN_BASE = 'https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/CRI';

function padNumber(n) {
  return String(n).padStart(3, '0');
}

export const CRI_CARDS = Array.from({ length: SET_SIZE }, (_, i) => {
  const number = i + 1;
  const padded = padNumber(number);
  return {
    id: `CRI-${padded}`,
    number,
    name: `Carta CRI #${padded}`,
    imageUrl: `${CDN_BASE}/CRI_${padded}_R_EN_SM.png`,
  };
});

export function drawRandomCard() {
  const index = Math.floor(Math.random() * CRI_CARDS.length);
  return CRI_CARDS[index];
}

export const SET_TOTAL = SET_SIZE;
