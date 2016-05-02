/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import { expect } from 'chai';
import { describe, it } from 'mocha';
import { todoSchema } from './schema.js';
import { graphql } from '../../graphql';

// 80+ char lines are useful in describe/it, so ignore in this file.
/* eslint-disable max-len */

describe('ToDo Query Tests', () => {
  describe('Basic Queries', () => {
    it('Can get a client', async () => {
      const query = `
        query getClient {
          client (id: 1) {
            name
          }
        }
      `;
      const expected = {
        client: { name: 'Microsoft' }
      };
      const result = await graphql(todoSchema, query);
      expect(result).to.deep.equal({ data: expected });
    });

    it('Can get a project', async () => {
      const query = `
        query getProject {
          project (id: 1) {
            name
          }
        }
      `;
      const expected = {
        project: { name: 'Windows 7' }
      };
      const result = await graphql(todoSchema, query);
      expect(result).to.deep.equal({ data: expected });
    });
  });

  describe('Nested Queries', () => {
    it('Can get a client with projects and tasks', async () => {
      const query = `
        query getClient {
          client (id: 1) {
            id
            name
            projects {
              id
              name
              tasks {
                id
                name
              }
            }
          }
        }
      `;
      const expected = {
        client: { 
          id: 1, name: 'Microsoft',
          projects: [
            {
              id: 1, name: 'Windows 7',
              tasks: [
                { id: 1, name: 'Design w7' },
                { id: 2, name: 'Code w7' },
                { id: 3, name: 'Unassigned Task' }
              ]
            },
            {
              id: 2, name: 'Windows 10',
              tasks: [
                { id: 4, name: 'Design w10' },
                { id: 5, name: 'Code w10' }
              ]
            }
          ]
        }
      };
      const result = await graphql(todoSchema, query);
      expect(result).to.deep.equal({ data: expected });
    });

  });

  describe('Using IDs and query parameters to refetch objects', () => {

    it('Allows us to create a generic query, then use it to fetch a project using the ID', async () => {
      const query = `
        query FetchSomeIDQuery($someId: Int!) {
          project(id: $someId) {
            name
          }
        }
      `;
      const params = {
        someId: 2
      };
      const expected = {
        project: {
          name: 'Windows 10'
        }
      };
      const result = await graphql(todoSchema, query, null, null, params);
      expect(result).to.deep.equal({ data: expected });
    });

    it('Allows us to create a generic query, then pass an invalid ID to get null back', async () => {
      const query = `
        query projectQuery($id: Int!) {
          project(id: $id) {
            name
          }
        }
      `;
      const params = {
        id: 99999
      };
      const expected = {
        project: null
      };
      const result = await graphql(todoSchema, query, null, null, params);
      expect(result).to.deep.equal({ data: expected });
    });
  });

  describe('Using aliases to change the key in the response', () => {
    it('Allows us to query for a client, changing his key with an alias', async () => {
      const query = `
        query FetchClientAliased {
          microsoft: client(id: 1) {
            name
          }
        }
      `;
      const expected = {
        microsoft: {
          name: 'Microsoft'
        }
      };
      const result = await graphql(todoSchema, query);
      expect(result).to.deep.equal({ data: expected });
    });

    it('Allows us to query for two clients, using two root fields and an alias', async () => {
      const query = `
        query FetchTwoClients {
          microsoft: client(id: 1) {
            name
          }
          oracle: client(id: 2) {
            name
          }
        }
      `;
      const expected = {
        microsoft: {
          name: 'Microsoft'
        },
        oracle: {
          name: 'Oracle'
        }
      };
      const result = await graphql(todoSchema, query);
      expect(result).to.deep.equal({ data: expected });
    });
  });

  describe('Uses fragments to express more complex queries', () => {
    it('Allows us to query using duplicated content', async () => {
      const query = `
        query DuplicateFields {
          windows: project(id: 1) {
            name
            client { name }
          }
          ios: project(id: 3) {
            name
            client { name }
          }
        }
      `;
      const expected = {
        windows: {
          name: 'Windows 7',
          client: { name: 'Microsoft'}
        },
        ios: {
          name: 'IOS',
          client: { name: 'Apple'}
        }
      };
      const result = await graphql(todoSchema, query);
      expect(result).to.deep.equal({ data: expected });
    });

    it('Allows us to use a fragment to avoid duplicating content', async () => {
      const query = `
        query UseFragment {
          windows: project(id: 1) {
            ...ProjectFragment
          }
          ios: project(id: 3) {
            ...ProjectFragment
          }
        }

        fragment ProjectFragment on Project {
          name
          client { name }
        }
      `;
      const expected = {
        windows: {
          name: 'Windows 7',
          client: { name: 'Microsoft'}
        },
        ios: {
          name: 'IOS',
          client: { name: 'Apple'}
        }
      };
      const result = await graphql(todoSchema, query);
      expect(result).to.deep.equal({ data: expected });
    });
  });
});
