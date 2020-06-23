/// <reference path="JavaScript.d.ts" />

interface ExternalObjectConstructor {
  readonly prototype: ExternalObject

  /**
   * Creates a new ExternalObject object.
   */
  new (lib: string): ExternalObject
  (lib: string): ExternalObject
}
declare const ExternalObject: ExternalObjectConstructor

interface ExternalObject {
  /**
   * Set to true to write status information to standard output (the
   * JavaScript Console in the ExtendScript Toolkit). Set to false to turn
   * logging off. Default is false.
   */
  log: boolean

  /**
   * A set of alternate paths in which to search for the shared library files, a
   * single string with multiple path specifications delimited by semicolons
   * (;). Paths can be absolute or relative to the Folder.startup location.
   */
  searchFolders: string

  /**
   * The version of the library, as returned by ESGetVersion()
   */
  version: number

  /**
   * Reports whether a compiled C/C++ library can be found, but does not load it. If logging is on, the
   * paths searched are reported to the JavaScript Console in the ExtendScript Toolkit.
   * Returns true if the library is found, false otherwise.
   * @param spec The file specification for the compiled library, with or without path information.
   */
  search(spec: string): boolean

  /**
   * Explicitly shuts down the ExternalObject dynamic library wrapped by this instance.
   * It can be helpful to force a shutdown of the external library if termination of external libraries during
   * the shutdown of the hosting application does not occur in the correct order.
   */
  terminate(): undefined
}

interface CSXSEventConstructor {
  readonly prototype: CSXSEvent

  /**
   * Creates a new CSXSEvent object.
   */
  new (type?: string, scope?: string, data?: string): CSXSEvent
  (type?: string, scope?: string, data?: string): CSXSEvent
}
declare const CSXSEvent: CSXSEventConstructor

interface CSXSEvent {
  /**
   * Retrieves the unique identifier of the application from which this event was dispatched.
   */
  readonly appId: string

  /**
   * Retrieves or sets the payload of this event.
   */
  data: string

  /**
   * Retrieves the unique identifier of the extension from which this event was dispatched.
   */
  readonly extensionId: string

  /**
   * Retrieves the scope of this event.
   */
  scope: string

  /**
   * Retrieves the type of this event.
   */
  type: string

  /**
   * Dispatch the event
   */
  dispatch(): void
}
