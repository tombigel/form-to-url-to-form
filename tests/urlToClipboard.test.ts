/// <reference types="vitest" />
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { urlToClipboard } from '../src/index';

describe('urlToClipboard', () => {
  const mockWriteText = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    // Mock the clipboard API
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockWriteText
      },
      writable: true
    });

    // Mock location
    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://example.com/page?param=value',
        search: '?param=value'
      },
      writable: true
    });
  });

  afterEach(() => {
    mockWriteText.mockClear();
  });

  it('should copy the full URL to clipboard by default', async () => {
    await urlToClipboard();

    expect(mockWriteText).toHaveBeenCalledTimes(1);
    expect(mockWriteText).toHaveBeenCalledWith('https://example.com/page?param=value');
  });

  it('should copy only the search params when searchOnly is true', async () => {
    await urlToClipboard({ searchOnly: true });

    expect(mockWriteText).toHaveBeenCalledTimes(1);
    expect(mockWriteText).toHaveBeenCalledWith('?param=value');
  });
});
