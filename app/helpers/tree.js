var _ = require('lodash');

/**
 * Tree helper library.
 * Helper methods to deal with adjacency lists and trees.
 */
var tree = {


  /**
   * Converts an adjacency list to tree format.
   *
   * @param {array} elements - The array of elements returned from the DB.
   * @param {string} fk - The name of the foreign key.
   * @param {string} pk - The name of the primary key.
   * @param {string} fk - The name of the foreign key.
   *
   * @see {@link http://stackoverflow.com/a/21343255}
   */
  al2tree: function(elements, name, pk, fk) {
    var nodes = [];
    var toplevelNodes = [];
    var lookupList = {};

    var i;
    for (i = 0; i < elements.length; i++) {
      var element = {
        id: elements[i][pk],
        name: elements[i][name],
        parent_id: ((elements[i][fk] === null) ? null : elements[i][fk]),
        children: []
      };
      lookupList[element.id] = element;
      nodes.push(element);
      if (element.parent_id === null) {
        toplevelNodes.push(element);
      }
    }

    for (i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (n.parent_id !== null) {
        lookupList[n.parent_id].children = lookupList[n.parent_id].children.concat([n]);
      }
    }

    return toplevelNodes;
  },

  /**
   * Converts an adjacency list to tree format.
   *
   * @param {array} elements - Array returned from al2tree. Trees of objects.
   *
   * @see {@link http://stackoverflow.com/a/21343255}
   */
  tree2formattedArray: function(elements) {
    var sortedElements = [];

    function formatDepth(text, depth, spacer) {
      if (depth) {
        spacer = spacer || " ";
        var formatted = Array((depth*2) + 1).join(spacer);
        text = formatted + text;
      }
      return text;
    }

    function traverse(elements, depth) {
      for (var i in elements) {
        var element = elements[i];

        if (element !== null && typeof(element)=="object") {

            if (!(element instanceof Array)) {
              var cleanElement = {
                "name": formatDepth(element.name, depth),
                "id": element.id
              };

              sortedElements.push(cleanElement);
              depth++;
            }

          traverse(element, depth);
          depth--;
        }
      }
    }

    traverse(elements, 0);

    return sortedElements;
  }


};

module.exports = tree;
