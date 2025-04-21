/**
 * Options for formToUrl function
 */
export interface FormToUrlOptions {
    /** Whether to replace the current history state instead of pushing a new one */
    replace?: boolean;
}
/**
 * Options for urlToClipboard function
 */
export interface UrlToClipboardOptions {
    /** When set to true, copy only the search params part of the url */
    searchOnly?: boolean;
}
/**
 * Serialize form data to a search params string and push it to the URL without reloading the page (using the history API)
 * @param form - The HTML form element to serialize
 * @param options - Options for controlling the behavior
 */
export declare function formToUrl(form: HTMLFormElement, options?: FormToUrlOptions): void;
/**
 * Parse the search params and set form values
 * @param form - The HTML form element to populate with URL values
 */
export declare function urlToForm(form: HTMLFormElement): void;
/**
 * Write current url to clipboard
 * @param options - Options for controlling what part of the URL to copy
 * @returns Promise that resolves when the URL has been copied
 */
export declare function urlToClipboard(options?: UrlToClipboardOptions): Promise<void>;
