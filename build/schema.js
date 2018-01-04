'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _graphqlTools = require('graphql-tools');

var schemaString = '\n  schema {\n    query: Query\n    mutation: Mutation\n  }\n\n  # The query type, represents all of the entry points into our object graph\n  type Query {\n    hero(episode: Episode): Character\n    reviews(episode: Episode!): [Review]\n    search(text: String): [SearchResult]\n    character(id: ID!): Character\n    droid(id: ID!): Droid\n    human(id: ID!): Human\n    starship(id: ID!): Starship\n  }\n\n  # The mutation type, represents all updates we can make to our data\n  type Mutation {\n    createReview(episode: Episode, review: ReviewInput!): Review\n  }\n\n  # The episodes in the Star Wars trilogy\n  enum Episode {\n    # Star Wars Episode IV: A New Hope, released in 1977.\n    NEWHOPE\n    # Star Wars Episode V: The Empire Strikes Back, released in 1980.\n    EMPIRE\n    # Star Wars Episode VI: Return of the Jedi, released in 1983.\n    JEDI\n  }\n\n  # A character from the Star Wars universe\n  interface Character {\n    # The ID of the character\n    id: ID!\n    # The name of the character\n    name: String!\n    # The friends of the character, or an empty list if they have none\n    friends: [Character]\n    # The friends of the character exposed as a connection with edges\n    friendsConnection(first: Int, after: ID): FriendsConnection!\n    # The movies this character appears in\n    appearsIn: [Episode]!\n  }\n\n  # Units of height\n  enum LengthUnit {\n    # The standard unit around the world\n    METER\n    # Primarily used in the United States\n    FOOT\n  }\n\n  # A humanoid creature from the Star Wars universe\n  type Human implements Character {\n    # The ID of the human\n    id: ID!\n    # What this human calls themselves\n    name: String!\n    # Height in the preferred unit, default is meters\n    height(unit: LengthUnit = METER): Float\n    # Mass in kilograms, or null if unknown\n    mass: Float\n    # This human\'s friends, or an empty list if they have none\n    friends: [Character]\n    # The friends of the human exposed as a connection with edges\n    friendsConnection(first: Int, after: ID): FriendsConnection!\n    # The movies this human appears in\n    appearsIn: [Episode]!\n    # A list of starships this person has piloted, or an empty list if none\n    starships: [Starship]\n  }\n\n  # An autonomous mechanical character in the Star Wars universe\n  type Droid implements Character {\n    # The ID of the droid\n    id: ID!\n    # What others call this droid\n    name: String!\n    # This droid\'s friends, or an empty list if they have none\n    friends: [Character]\n    # The friends of the droid exposed as a connection with edges\n    friendsConnection(first: Int, after: ID): FriendsConnection!\n    # The movies this droid appears in\n    appearsIn: [Episode]!\n    # This droid\'s primary function\n    primaryFunction: String\n  }\n\n  # A connection object for a character\'s friends\n  type FriendsConnection {\n    # The total number of friends\n    totalCount: Int\n    # The edges for each of the character\'s friends.\n    edges: [FriendsEdge]\n    # A list of the friends, as a convenience when edges are not needed.\n    friends: [Character]\n    # Information for paginating this connection\n    pageInfo: PageInfo!\n  }\n\n  # An edge object for a character\'s friends\n  type FriendsEdge {\n    # A cursor used for pagination\n    cursor: ID!\n    # The character represented by this friendship edge\n    node: Character\n  }\n\n  # Information for paginating this connection\n  type PageInfo {\n    startCursor: ID\n    endCursor: ID\n    hasNextPage: Boolean!\n  }\n\n  # Represents a review for a movie\n  type Review {\n    # The number of stars this review gave, 1-5\n    stars: Int!\n    # Comment about the movie\n    commentary: String\n  }\n\n  # The input object sent when someone is creating a new review\n  input ReviewInput {\n    # 0-5 stars\n    stars: Int!\n    # Comment about the movie, optional\n    commentary: String\n  }\n\n  type Starship @cacheControl(maxAge: 240) {\n    # The ID of the starship\n    id: ID!\n    # The name of the starship\n    name: String!\n    # Length of the starship, along the longest axis\n    length(unit: LengthUnit = METER): Float\n  }\n\n  union SearchResult = Human | Droid | Starship\n';

/**
 * This defines a basic set of data for our Star Wars Schema.
 *
 * This data is hard coded for the sake of the demo, but you could imagine
 * fetching this data from a backend service rather than from hardcoded
 * JSON objects in a more complex demo.
 */

// This is the Star Wars schema used in all of the interactive GraphiQL
// examples on GraphQL.org. License reproduced at the bottom.

/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var humans = [{
  id: '1000',
  name: 'Luke Skywalker',
  friends: ['1002', '1003', '2000', '2001'],
  appearsIn: ['NEWHOPE', 'EMPIRE', 'JEDI'],
  height: 1.72,
  mass: 77,
  starships: ['3001', '3003']
}, {
  id: '1001',
  name: 'Darth Vader',
  friends: ['1004'],
  appearsIn: ['NEWHOPE', 'EMPIRE', 'JEDI'],
  height: 2.02,
  mass: 136,
  starships: ['3002']
}, {
  id: '1002',
  name: 'Han Solo',
  friends: ['1000', '1003', '2001'],
  appearsIn: ['NEWHOPE', 'EMPIRE', 'JEDI'],
  height: 1.8,
  mass: 80,
  starships: ['3000', '3003']
}, {
  id: '1003',
  name: 'Leia Organa',
  friends: ['1000', '1002', '2000', '2001'],
  appearsIn: ['NEWHOPE', 'EMPIRE', 'JEDI'],
  height: 1.5,
  mass: 49,
  starships: []
}, {
  id: '1004',
  name: 'Wilhuff Tarkin',
  friends: ['1001'],
  appearsIn: ['NEWHOPE'],
  height: 1.8,
  mass: null,
  starships: []
}];

var humanData = {};
humans.forEach(function (ship) {
  humanData[ship.id] = ship;
});

var droids = [{
  id: '2000',
  name: 'C-3PO',
  friends: ['1000', '1002', '1003', '2001'],
  appearsIn: ['NEWHOPE', 'EMPIRE', 'JEDI'],
  primaryFunction: 'Protocol'
}, {
  id: '2001',
  name: 'R2-D2',
  friends: ['1000', '1002', '1003'],
  appearsIn: ['NEWHOPE', 'EMPIRE', 'JEDI'],
  primaryFunction: 'Astromech'
}];

var droidData = {};
droids.forEach(function (ship) {
  droidData[ship.id] = ship;
});

var starships = [{
  id: '3000',
  name: 'Millenium Falcon',
  length: 34.37
}, {
  id: '3001',
  name: 'X-Wing',
  length: 12.5
}, {
  id: '3002',
  name: 'TIE Advanced x1',
  length: 9.2
}, {
  id: '3003',
  name: 'Imperial shuttle',
  length: 20
}];

var starshipData = {};
starships.forEach(function (ship) {
  starshipData[ship.id] = ship;
});

/**
 * Helper function to get a character by ID.
 */
function getCharacter(id) {
  // Returning a promise just to illustrate GraphQL.js's support.
  return Promise.resolve(humanData[id] || droidData[id]);
}

/**
 * Allows us to fetch the undisputed hero of the Star Wars trilogy, R2-D2.
 */
function getHero(episode) {
  if (episode === 'EMPIRE') {
    // Luke is the hero of Episode V.
    return humanData['1000'];
  }
  // Artoo is the hero otherwise.
  return droidData['2001'];
}

/**
 * Allows us to query for the human with the given id.
 */
function getHuman(id) {
  return humanData[id];
}

/**
 * Allows us to query for the droid with the given id.
 */
function getDroid(id) {
  return droidData[id];
}

function getStarship(id) {
  return starshipData[id];
}

function toCursor(str) {
  return Buffer('cursor' + str).toString('base64');
}

function fromCursor(str) {
  return Buffer.from(str, 'base64').toString().slice(6);
}

var resolvers = {
  Query: {
    hero: function hero(root, _ref) {
      var episode = _ref.episode;
      return getHero(episode);
    },
    character: function character(root, _ref2) {
      var id = _ref2.id;
      return getCharacter(id);
    },
    human: function human(root, _ref3) {
      var id = _ref3.id;
      return getHuman(id);
    },
    droid: function droid(root, _ref4) {
      var id = _ref4.id;
      return getDroid(id);
    },
    starship: function starship(root, _ref5) {
      var id = _ref5.id;
      return getStarship(id);
    },
    reviews: function reviews() {
      return null;
    },
    search: function search(root, _ref6) {
      var text = _ref6.text;

      var re = new RegExp(text, 'i');

      var allData = [].concat(humans, droids, starships);

      return allData.filter(function (obj) {
        return re.test(obj.name);
      });
    }
  },
  Mutation: {
    createReview: function createReview(root, _ref7) {
      var episode = _ref7.episode,
          review = _ref7.review;
      return review;
    }
  },
  Character: {
    __resolveType: function __resolveType(data, context, info) {
      if (humanData[data.id]) {
        return info.schema.getType('Human');
      }
      if (droidData[data.id]) {
        return info.schema.getType('Droid');
      }
      return null;
    }
  },
  Human: {
    height: function height(_ref8, _ref9) {
      var _height = _ref8.height;
      var unit = _ref9.unit;

      if (unit === 'FOOT') {
        return _height * 3.28084;
      }

      return _height;
    },
    friends: function friends(_ref10) {
      var _friends = _ref10.friends;
      return _friends.map(getCharacter);
    },
    friendsConnection: function friendsConnection(_ref11, _ref12) {
      var friends = _ref11.friends;
      var first = _ref12.first,
          after = _ref12.after;

      first = first || friends.length;
      after = after ? parseInt(fromCursor(after), 10) : 0;
      var edges = friends.map(function (friend, i) {
        return {
          cursor: toCursor(i + 1),
          node: getCharacter(friend)
        };
      }).slice(after, first + after);
      var slicedFriends = edges.map(function (_ref13) {
        var node = _ref13.node;
        return node;
      });
      return {
        edges: edges,
        friends: slicedFriends,
        pageInfo: {
          startCursor: edges.length > 0 ? edges[0].cursor : null,
          hasNextPage: first + after < friends.length,
          endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null
        },
        totalCount: friends.length
      };
    },
    starships: function starships(_ref14) {
      var _starships = _ref14.starships;
      return _starships.map(getStarship);
    },
    appearsIn: function appearsIn(_ref15) {
      var _appearsIn = _ref15.appearsIn;
      return _appearsIn;
    }
  },
  Droid: {
    friends: function friends(_ref16) {
      var _friends2 = _ref16.friends;
      return _friends2.map(getCharacter);
    },
    friendsConnection: function friendsConnection(_ref17, _ref18) {
      var friends = _ref17.friends;
      var first = _ref18.first,
          after = _ref18.after;

      first = first || friends.length;
      after = after ? parseInt(fromCursor(after), 10) : 0;
      var edges = friends.map(function (friend, i) {
        return {
          cursor: toCursor(i + 1),
          node: getCharacter(friend)
        };
      }).slice(after, first + after);
      var slicedFriends = edges.map(function (_ref19) {
        var node = _ref19.node;
        return node;
      });
      return {
        edges: edges,
        friends: slicedFriends,
        pageInfo: {
          startCursor: edges.length > 0 ? edges[0].cursor : null,
          hasNextPage: first + after < friends.length,
          endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null
        },
        totalCount: friends.length
      };
    },
    appearsIn: function appearsIn(_ref20) {
      var _appearsIn2 = _ref20.appearsIn;
      return _appearsIn2;
    }
  },
  FriendsConnection: {
    edges: function edges(_ref21) {
      var _edges = _ref21.edges;
      return _edges;
    },
    friends: function friends(_ref22) {
      var _friends3 = _ref22.friends;
      return _friends3;
    },
    pageInfo: function pageInfo(_ref23) {
      var _pageInfo = _ref23.pageInfo;
      return _pageInfo;
    },
    totalCount: function totalCount(_ref24) {
      var _totalCount = _ref24.totalCount;
      return _totalCount;
    }
  },
  FriendsEdge: {
    node: function node(_ref25) {
      var _node = _ref25.node;
      return _node;
    },
    cursor: function cursor(_ref26) {
      var _cursor = _ref26.cursor;
      return _cursor;
    }
  },
  Starship: {
    length: function length(_ref27, _ref28) {
      var _length = _ref27.length;
      var unit = _ref28.unit;

      if (unit === 'FOOT') {
        return _length * 3.28084;
      }

      return _length;
    }
  },
  SearchResult: {
    __resolveType: function __resolveType(data, context, info) {
      if (humanData[data.id]) {
        return info.schema.getType('Human');
      }
      if (droidData[data.id]) {
        return info.schema.getType('Droid');
      }
      if (starshipData[data.id]) {
        return info.schema.getType('Starship');
      }
      return null;
    }
  }
};

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
var schema = exports.schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: [schemaString],
  resolvers: resolvers
});

/*
License from https://github.com/graphql/graphql.github.io/blob/source/LICENSE

LICENSE AGREEMENT For graphql.org software

Facebook, Inc. (“Facebook”) owns all right, title and interest, including all
intellectual property and other proprietary rights, in and to the graphql.org
software. Subject to your compliance with these terms, you are hereby granted a
non-exclusive, worldwide, royalty-free copyright license to (1) use and copy the
graphql.org software; and (2) reproduce and distribute the graphql.org software
as part of your own software (“Your Software”). Facebook reserves all rights not
expressly granted to you in this license agreement.

THE SOFTWARE AND DOCUMENTATION, IF ANY, ARE PROVIDED "AS IS" AND ANY EXPRESS OR
IMPLIED WARRANTIES (INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE) ARE DISCLAIMED. IN NO
EVENT SHALL FACEBOOK OR ITS AFFILIATES, OFFICES, DIRECTORS OR EMPLOYEES BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
THE USE OF THE SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

You will include in Your Software (e.g., in the file(s), documentation or other
materials accompanying your software): (1) the disclaimer set forth above; (2)
this sentence; and (3) the following copyright notice:

Copyright (c) 2015, Facebook, Inc. All rights reserved.
*/