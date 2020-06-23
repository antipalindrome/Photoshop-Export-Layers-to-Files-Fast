/// <reference path="JavaScript.d.ts" />

/**
 * The global BridgeTalk object.
 */
declare var BridgeTalk: any

/**
 * The Infinity global property is a predefined variable with the value for infinity.
 */
declare var Infinity: number

/**
 * The NaN global property is a predefined variable with the value NaN (Not-a-Number), as specified by the IEEE-754 standard.
 */
declare var NaN: number

/**
 * The application object
 */
declare var app: Application
declare interface Application {}

/**
 * Displays an alert box
 * @param message The text to display
 * @param title The title of the alert; ignored on the Macintosh
 * @param errorIcon Display an Error icon; ignored on the Macintosh
 */
declare function alert(message: string, title?: string, errorIcon?: boolean): void

/**
 * Displays an alert box with Yes and No buttons; returns true for Yes
 * @param message The text to display
 * @param noAsDefault Set to true to set the No button as the default button
 * @param title The title of the alert; ignored on the Macintosh
 */
declare function confirm(message: string, noAsDefault?: boolean, title?: string): boolean

/**
 * Decodes a string created with encodeURI().
 * @param uri The text to decode.
 */
declare function decodeURI(uri: string): string

/**
 * Decodes a string created with encodeURIComponent().
 * @param uri The text to decode.
 */
declare function decodeURIComponent(uri: string): string

/**
 * Encodes a string after RFC2396.
 * Create an UTF-8 ASCII encoded version of this string. The string is converted into UTF-8. Every non-alphanumeric character is encoded as a percent escape
 * character of the form %xx, where xx is the hex value of the character. After the conversion to UTF-8 encoding and escaping, it is guaranteed that the string does not contain characters codes greater than 127. The list of characters not to be encoded is -_.!~*'();/?:@&=+$,#. The method returns false on errors.
 * @param text The text to encode.
 */
declare function encodeURI(text: string): string

/**
 * Encodes a string after RFC2396.
 * Create an UTF-8 ASCII encoded version of this string. The string is converted into UTF-8. Every non-alphanumeric character is encoded as a percent escape
 * character of the form %xx, where xx is the hex value of the character. After the conversion to UTF-8 encoding and escaping, it is guaranteed that the string does not contain characters codes greater than 127. The list of characters not to be encoded is -_.!~*'(). The method returns false on errors.
 * @param text The text to encode.
 */
declare function encodeURIComponent(text: string): string

/**
 * Creates a URL-encoded string from aString.
 * In the new string, characters of aString that require URL encoding are replaced with the format %xx, where xx is the hexadecimal value of the character code in the Unicode character set.This format is used to transmit information appended to a URL during, for example, execution of the GET method.Use the unescape() global function to translate the string back into its original format. Returns a string which is aString URL-encoded.
 * @param aString The string to be encoded.
 */
declare function escape(aString: string): string

/**
 * Evaluates its argument as a JavaScript script, and returns the result of evaluation.
 * You can pass the result of an object's toSource() method to reconstruct that object.
 * @param stringExpression The string to evaluate.
 */
declare function eval(stringExpression: string): any

/**
 * Evaluates an expression and reports whether the result is a finite number.
 * Returns true if the expression is a finite number, false otherwise. False if the value is infinity or negative infinity.
 * @param expression Any valid JavaScript expression.
 */
declare function isFinite(expression: number): boolean

/**
 * Evaluates an expression and reports whether the result is "Not-a-Number" (NaN).
 * Returns true if the result of evaluation is not a number (NaN), false if the value is a number.
 * @param expression Any valid JavaScript expression.
 */
declare function isNaN(expression: number): boolean

/**
 * Returns true if the supplied string is a valid XML name.
 * @param name The XML name to test.
 */
declare function isXMLName(name: string): boolean

/**
 * Localizes a ZString-encoded string and merges additional arguments into the string.
 * @param what The string to localize. A ZString-encoded string that can contain placeholder for additional arguments in the form %1 to %n.
 * @param arguments Optional argument(s) to be merged into the string. There may be more than one argument.
 */
declare function localize(what: string, ...arguments: any[]): string

/**
 * Extracts a floating-point number from a string.
 * Parses a string to find the first set of characters that can be converted to a floating point number, and returns that number, or NaN if it does not encounter characters that it can converted to a number.The function supports exponential notation.
 * @param text The string from which to extract a floating point number.
 */
declare function parseFloat(text: string): number

/**
 * Extracts an integer from a string.
 * Parses a string to find the first set of characters, in a specified base, that can be converted to an integer, and returns that integer, or NaN if it does not encounter characters that it can convert to a number.
 * @param text The string from which to extract an integer.
 * @param base The base of the string to parse (from base 2 to base 36). If not supplied, base is determined by the format of string.
 */
declare function parseInt(text: string, base?: number): number

/**
 * Displays a dialog allowing the user to enter text
 * Returns null if the user cancelled the dialog, the text otherwise
 * @param prompt The text to display
 * @param default_ The default text to preset the edit field with
 * @param title The title of the dialog;
 */
declare function prompt(prompt: string, default_?: string, title?: string): string

/**
 * Defines the default XML namespace.
 * This is a replacement function for the standard JavaScript statement set default xml namespace.
 * @param namespace The namespace to use. Omit this parameter to return to the empty namespace. This is either a Namespace object or a string.
 */
declare function setDefaultXMLNamespace(namespace: Namespace): void

/**
 * Translates URL-encoded string into a regular string, and returns that string.
 * Use the escape() global function to URL-encode strings.
 * @param stringExpression The URL-encoded string to convert.
 */
declare function unescape(stringExpression: string): string

/**
 * Creates a source code representation of the supplied argument, and returns it as a string.
 * @param what The object to uneval.
 */
declare function uneval(what: any): string
