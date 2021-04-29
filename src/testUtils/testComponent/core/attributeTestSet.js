class AttributeTestSet {
  /**
   * @param {Object} set
   * @param {string} set.attr
   * @param {*} [set.value=]
   */
  constructor({ attr, value }) {
    this.attr = attr;
    this.value = value;

    Object.freeze(this);
  }
}

export default AttributeTestSet;
