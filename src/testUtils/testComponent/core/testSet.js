class TestSet {
  /**
   * @param {Object} settings
   * @param {boolean} settings.isInDocument
   * @param {string} settings.name
   * @param {function} settings.element
   */
  constructor({ isInDocument, name, element }) {
    this.isInDocument = isInDocument;
    this.name = name;
    this.element = element;
    Object.freeze(this);
  }
}

export default TestSet;
