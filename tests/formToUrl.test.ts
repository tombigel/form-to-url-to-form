/// <reference types="vitest" />
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formToUrl } from '../src/index';

describe('formToUrl', () => {
  let form: HTMLFormElement;
  let pushStateSpy: vi.SpyInstance;
  let replaceStateSpy: vi.SpyInstance;

  beforeEach(() => {
    // Create a form for each test
    document.body.innerHTML = `
      <form id="test-form">
        <input type="text" name="name" value="John">
        <input type="email" name="email" value="john@example.com">
        <input type="checkbox" name="subscribe" value="newsletter" checked>
        <input type="radio" name="gender" value="male" checked>
        <input type="radio" name="gender" value="female">
        <select name="country">
          <option value="us" selected>USA</option>
          <option value="ca">Canada</option>
        </select>
        <select name="interests" multiple>
          <option value="sports" selected>Sports</option>
          <option value="music">Music</option>
          <option value="movies" selected>Movies</option>
        </select>
      </form>
    `;

    form = document.getElementById('test-form') as HTMLFormElement;

    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://example.com/page',
        search: ''
      },
      writable: true
    });

    // Spy on history methods
    pushStateSpy = vi.spyOn(history, 'pushState').mockImplementation(() => {});
    replaceStateSpy = vi.spyOn(history, 'replaceState').mockImplementation(() => {});
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('should serialize form data to URL search params', () => {
    formToUrl(form);

    expect(pushStateSpy).toHaveBeenCalledTimes(1);

    // Check that the URL contains the correct search params
    const url = pushStateSpy.mock.calls[0][2] as string;
    expect(url).toContain('name=John');
    expect(url).toContain('email=john%40example.com');
    expect(url).toContain('subscribe=newsletter');
    expect(url).toContain('gender=male');
    expect(url).toContain('country=us');
    expect(url).toContain('interests=sports');
    expect(url).toContain('interests=movies');
  });

  it('should use replaceState when replace option is true', () => {
    formToUrl(form, { replace: true });

    expect(pushStateSpy).not.toHaveBeenCalled();
    expect(replaceStateSpy).toHaveBeenCalledTimes(1);

    // Check that the URL contains the correct search params
    const url = replaceStateSpy.mock.calls[0][2] as string;
    expect(url).toContain('name=John');
  });

  it('should log error when history API is not available', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    history.pushState = undefined as any;
    history.replaceState = undefined as any;

    formToUrl(form);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Your browser does not support the history.pushState API')
    );
  });
});
