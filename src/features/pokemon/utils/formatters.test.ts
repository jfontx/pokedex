import { describe, it, expect } from 'vitest';
import { cleanFlavorText, formatName, formatDexNumber } from './formatters';

describe('formatters', () => {
  describe('cleanFlavorText', () => {
    it('removes form feeds and newlines', () => {
      expect(cleanFlavorText('Spits fire that\nis hot enough to\fmelt boulders.')).toBe(
        'Spits fire that is hot enough to melt boulders.'
      );
    });

    it('handles empty strings', () => {
      expect(cleanFlavorText('')).toBe('');
    });
  });

  describe('formatName', () => {
    it('capitalizes simple names', () => {
      expect(formatName('pikachu')).toBe('Pikachu');
    });

    it('replaces dashes with spaces and capitalizes each word', () => {
      expect(formatName('mr-mime')).toBe('Mr Mime');
      expect(formatName('charizard-mega-x')).toBe('Charizard Mega X');
    });
  });

  describe('formatDexNumber', () => {
    it('pads to 4 digits', () => {
      expect(formatDexNumber(1)).toBe('#0001');
      expect(formatDexNumber(25)).toBe('#0025');
      expect(formatDexNumber(150)).toBe('#0150');
      expect(formatDexNumber(1000)).toBe('#1000');
    });
  });
});
