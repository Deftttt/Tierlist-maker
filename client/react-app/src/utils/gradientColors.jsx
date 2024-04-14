export function getGradientColor(index) {
    const hue = (index * 30) % 360;
    return `hsl(${hue}, 100%, 50%)`;
  }