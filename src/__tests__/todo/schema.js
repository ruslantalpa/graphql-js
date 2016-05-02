import {
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt
} from '../../type';

import { 
  getClientById,
  getProjectById,
  getTaskById,
  getProjectByClientId,
  getTasksByProjectId
} from './data.js';

const client = new GraphQLObjectType({
  name: 'Client',
  description: 'Client',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the client.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the client.',
    },
    projects: {
      type: new GraphQLList(project),
      description: 'projects',
      resolve: client => getProjectByClientId(client.id)
    }
  })
});

const project = new GraphQLObjectType({
  name: 'Project',
  description: 'Project',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the project.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the project.',
    },
    client_id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'client id'
    },
    client: {
      type: client,
      description: 'client',
      resolve: project => getClientById(project.client_id)
    },
    tasks: {
      type: new GraphQLList(task),
      description: 'tasks',
      resolve: project => getTasksByProjectId(project.id)
    }
  })
});

const task = new GraphQLObjectType({
  name: 'Task',
  description: 'Task',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the task.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the task.',
    },
    project_id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'project id'
    },
    project: {
      type: project,
      description: 'project',
      resolve: task => getProjectById(task.project_id)
    }
  })
});


const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    client: {
      type: client,
      args: {
        id: {
          description: 'id of the client',
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (root, { id }) => getClientById(id)
    },
    project: {
      type: project,
      args: {
        id: {
          description: 'id of the project',
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (root, { id }) => getProjectById(id)
    },
    task: {
      type: task,
      args: {
        id: {
          description: 'id of the task',
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (root, { id }) => getTaskById(id)
    }
  })
});

export const todoSchema = new GraphQLSchema({
  query: queryType,
  //types: [ humanType, droidType ]
});
