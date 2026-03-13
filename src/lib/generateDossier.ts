const inferCapacityBand = (quantData: string) => {
  const match = quantData.match(/\$?([\d,.]+)\s*([kKmMbB]?)/);
  if (!match) return 'Capacity band: Unknown (insufficient quantitative inputs).';

  const numericPart = match[1];
  const suffixPart = match[2];
  if (!numericPart) return 'Capacity band: Unknown (input parsing issue).';

  const value = Number(numericPart.replace(/,/g, ''));
  if (Number.isNaN(value)) return 'Capacity band: Unknown (input parsing issue).';

  const suffix = (suffixPart ?? '').toLowerCase();
  const multiplier =
    suffix === 'k'
      ? 1_000
      : suffix === 'm'
        ? 1_000_000
        : suffix === 'b'
          ? 1_000_000_000
          : 1;

  const normalized = value * multiplier;

  if (normalized >= 10_000_000) return 'Capacity band: Transformational major gift (8-figure potential).';
  if (normalized >= 1_000_000) return 'Capacity band: Principal gift trajectory (7-figure potential).';
  if (normalized >= 250_000) return 'Capacity band: Major gift capacity (mid 6-figure potential).';
  return 'Capacity band: Leadership annual + emerging major donor potential.';
};
