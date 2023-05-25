const { gql } = require("apollo-server");

module.exports = gql`
  type QLNovel {
    title: String
    intro: String
    genre: String
    author: String
    postAt: String
  }

  input QLNovelInput {
    title: String
    intro: String
    genre: String
    author: String
  }

  type Query {
    QLNovel(ID: ID!): QLNovel!
    getQLNovel(amount: Int): [QLNovel]
  }

  type Mutation {
    createQLNovel(QLNovelInput: QLNovelInput): QLNovel!
    deleteQLNovel(ID: ID!): Boolean
  }
`;
