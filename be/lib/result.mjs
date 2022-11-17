/**
 * @typedef {{
 * success: boolean,
 * message: string,
 * errors: Array<string>
 * }} IResult
 */

class Result {
  /**
   * @type {boolean}
   * @private
   */
  success;

  /**
   * @type {Array<string>}
   * @private
   */
  errors;

  /**
   * @type {string}
   * @private
   */
  successMessage;

  /**
   * @type {string}
   * @private
   */
  unsuccessMessage;

  /**
   *
   * @param {string} successMessage
   * @param {string} unsuccessMessage
   */
  constructor(successMessage, unsuccessMessage) {
    this.success = true;
    this.successMessage = successMessage;
    this.unsuccessMessage = unsuccessMessage;
    this.errors = [];
  }

  /**
   *
   * @param {string} message
   */
  addError(message) {
    this.success = false;
    this.errors.push(message);
  }

  /**
   *
   * @returns {IResult}
   */
  getResult() {
    return {
      success: this.success,
      message: this.success ? this.successMessage : this.unsuccessMessage,
      errors: this.errors
    };
  }
}

export { Result };
