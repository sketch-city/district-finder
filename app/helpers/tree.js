var _ = require('lodash');

/**
 * Tree helper library.
 * Helper methods to deal with adjacency lists and trees.
 */
var tree = {


  /**
   * Converts an adjacency list to tree format.
   *
   * I honestly don't know what this is doing or how the second loop affects topLevelNodes,
   * but it does and the commenter on stackoverflow knew how and the output is what we need.
   *
   * @param {array} elements - The array of elements returned from the DB.
   * @param {string} fk - The name of the foreign key.
   * @param {string} pk - The name of the primary key.
   * @param {string} fk - The name of the foreign key.
   *
   * @see {@link http://stackoverflow.com/a/21343255}
   */
  al2tree: function(elements, props, pk, fk) {
    var nodes = [];
    var topLevelNodes = [];
    var lookupList = {};

    var i;
    for (i = 0; i < elements.length; i++) {
      var element = {
        id: elements[i][pk],
        parent_id: ((elements[i][fk] === null) ? null : elements[i][fk]),
        children: []
      };

      // Make sure we keep the properties we need
      var j;
      for (j = 0; j < props.length; j++) {
        var prop = props[j];
        element[prop] = elements[i][prop];
      }

      lookupList[element.id] = element;
      nodes.push(element);
      if (element.parent_id === null) {
        topLevelNodes.push(element);
      }
    }

    for (i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (n.parent_id !== null) {
        lookupList[n.parent_id].children = lookupList[n.parent_id].children.concat([n]);
      }
    }

    return topLevelNodes;
  },


  /**
   * Converts an adjacency list to tree format.
   *
   * @param {array} elements - Array returned from al2tree. Trees of objects.
   *
   * @see {@link http://stackoverflow.com/a/21343255}
   */
  tree2sortedArray: function(elements, props) {
    var sortedElements = [];

    // Recursion magic?!
    function traverse(elements, depth) {
      var i;
      for (i in elements) {
        var element = elements[i];

        // Only do this stuff if it's an object / array of objects
        if (element !== null && typeof(element)=="object") {

          // Just kidding, we don't actually want to do the things in this next block in arrays of objects
          // Also some dumb check because datetimes are returned as objects?!
          if (!(element instanceof Array) && !(i === 'expires_at' || i === 'uploaded_at')) {
            var cleanElement = {};

            // Make sure we keep the properties we need
            var j;
            for (j = 0; j < props.length; j++) {
              var prop = props[j];
              cleanElement[prop] = element[prop];
            }

            // Add depth
            _.merge(cleanElement, {"depth": depth});

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
