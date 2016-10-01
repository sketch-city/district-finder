/**
 * Text formatting helper library.
 * Helper methods to deal with adjacency lists and trees.
 */
var textFormatting = {


  /**
   * Adds left padding to format the text for hierarchical select input fields.
   *
   * @param {string} text - The text to add padding to.
   * @param {number} depth - How deep is this item? Defines the amount of padding to add.
   * @param {string} [spacer=" "] - What to fill it with. Defaults to a space.
   */
  formatDepth: function(text, depth, spacer, startChar) {
    if (depth) {
      spacer = spacer || " ";
      startChar = startChar || "";
      var formatted = Array((depth*2) + 1).join(spacer);
      text = startChar + formatted + text;
    }
    return text;
  }


};

module.exports = textFormatting;
