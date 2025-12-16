// src/constants/maskOptions.ts

export interface MaskOption {
  prefix: number;
  mask: string;
  label: string;
}

export const maskOptions: MaskOption[] = Array.from({ length: 33 }, (_, i) => {
  const prefix = i;
  const mask = prefixToSubnetMask(prefix);
  return {
    prefix,
    mask,
    label: `${prefix}/${mask}`,
  };
});

function prefixToSubnetMask(prefix: number): string {
  if (prefix < 0 || prefix > 32) return '0.0.0.0';

  const binary = '1'.repeat(prefix).padEnd(32, '0');
  const octets = [];
  for (let i = 0; i < 4; i++) {
    const chunk = binary.slice(i * 8, (i + 1) * 8);
    octets.push(parseInt(chunk, 2));
  }
  return octets.join('.');
}