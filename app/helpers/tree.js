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
  tree2sortedArray: function(elements) {
    var sortedElements = [];

    // Recursion magic?!
    function traverse(elements, depth) {
      for (var i in elements) {
        var element = elements[i];

        // Only do this stuff if it's an object / array of objects
        if (element !== null && typeof(element)=="object") {

          // Just kidding, we don't actually want to do the things in here in arrays of objects
          if (!(element instanceof Array)) {

            // Remove junk, add depth attribute
            var cleanElement = {
              "name": element.name,
              "depth": depth,
              "id": element.id
            };

            // Add the element to the sorted array
            sortedElements.push(cleanElement);
            depth++;
          }

          // Here is where we go around again
          traverse(element, depth);
          depth--;
        }
      }
    }

    // Start the traversing
    traverse(elements, 0);

    return sortedElements;
  }


};

module.exports = tree;
