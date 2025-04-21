/// <reference types="vitest" />
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { urlToForm } from '../src/index';

describe('urlToForm', () => {
  let form: HTMLFormElement;
  let resetSpy: vi.SpyInstance;

  beforeEach(() => {
    // Create a form for each test
    document.body.innerHTML = `
      <form id="test-form">
        <input type="text" name="name" value="Default">
        <input type="email" name="email" value="default@example.com">
        <input type="checkbox" name="subscribe" value="newsletter">
        <input type="radio" name="gender" value="male">
        <input type="radio" name="gender" value="female">
        <select name="country">
          <option value="us">USA</option>
          <option value="ca">Canada</option>
        </select>
        <select name="interests" multiple>
          <option value="sports">Sports</option>
          <option value="music">Music</option>
          <option value="movies">Movies</option>
        </select>
      </form>
    `;

    form = document.getElementById('test-form') as HTMLFormElement;
    resetSpy = vi.spyOn(form, 'reset').mockImplementation(() => {});
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('should reset the form when URL has no search params', () => {
    // Mock empty search string
    Object.defineProperty(window, 'location', {
      value: { search: '' },
      writable: true
    });

    urlToForm(form);

    expect(resetSpy).toHaveBeenCalledTimes(1);
  });

  it('should populate form fields from URL search params', () => {
    // Mock URL search string
    Object.defineProperty(window, 'location', {
      value: { search: '?name=John&email=john%40example.com&subscribe=newsletter&gender=male&country=us&interests=sports&interests=movies' },
      writable: true
    });

    urlToForm(form);

    // Check that each field was populated correctly
    expect((form.elements.namedItem('name') as HTMLInputElement).value).toBe('John');
    expect((form.elements.namedItem('email') as HTMLInputElement).value).toBe('john@example.com');
    expect((form.elements.namedItem('subscribe') as HTMLInputElement).checked).toBe(true);

    const maleRadio = form.querySelector('input[name="gender"][value="male"]') as HTMLInputElement;
    const femaleRadio = form.querySelector('input[name="gender"][value="female"]') as HTMLInputElement;
    expect(maleRadio.checked).toBe(true);
    expect(femaleRadio.checked).toBe(false);

    const countrySelect = form.elements.namedItem('country') as HTMLSelectElement;
    expect(countrySelect.value).toBe('us');

    const interestsSelect = form.elements.namedItem('interests') as HTMLSelectElement;
    const options = Array.from(interestsSelect.options);
    expect(options[0].selected).toBe(true);  // sports
    expect(options[1].selected).toBe(false); // music
    expect(options[2].selected).toBe(true);  // movies
  });

  it('should uncheck checkboxes and radios not in search params', () => {
    // First check the checkbox and radio
    const checkbox = form.querySelector('input[name="subscribe"]') as HTMLInputElement;
    const radio = form.querySelector('input[name="gender"][value="male"]') as HTMLInputElement;
    checkbox.checked = true;
    radio.checked = true;

    // Mock URL search string without checkbox and radio
    Object.defineProperty(window, 'location', {
      value: { search: '?name=John&email=john%40example.com' },
      writable: true
    });

    urlToForm(form);

    // Check that they're unchecked
    expect(checkbox.checked).toBe(false);
    expect(radio.checked).toBe(false);
  });
});
