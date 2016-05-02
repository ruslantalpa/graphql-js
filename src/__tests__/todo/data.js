const clients = {
  1: { id: 1, name: 'Microsoft' },
  2: { id: 2, name: 'Oracle' },
  3: { id: 3, name: 'Apple' }
}

const projects = {
  1: { id: 1, name: 'Windows 7', client_id: 1 },
  2: { id: 2, name: 'Windows 10', client_id: 1 },
  3: { id: 3, name: 'IOS', client_id: 3 },
  4: { id: 4, name: 'OSX', client_id: 3 }
}

const tasks = {
  1: { id: 1, name: 'Design w7', project_id: 1 },
  2: { id: 2, name: 'Code w7', project_id: 1 },
  3: { id: 3, name: 'Unassigned Task', project_id: 1 },
  4: { id: 4, name: 'Design w10', project_id: 2 },
  5: { id: 5, name: 'Code w10', project_id: 2 },
  6: { id: 6, name: 'Design IOS', project_id: 3 },
  7: { id: 7, name: 'Code IOS', project_id: 3 },
  8: { id: 8, name: 'Design OSX', project_id: 4 },
  9: { id: 9, name: 'Code OSX', project_id: 4 }
}

function getObjectById(store, id) {
  return store[id];
}

function getObjectsByKey(store, key, value) {
  const objects = [];
  Object.keys(store).forEach( id => {
    if (store[id][key] == value) {
      objects.push(store[id]);
    }
  });
  return objects;
}

export const getClientById = getObjectById.bind(undefined, clients)
export const getProjectById = getObjectById.bind(undefined, projects)
export const getTaskById = getObjectById.bind(undefined, tasks)
export const getProjectByClientId = getObjectsByKey.bind(undefined, projects, 'client_id')
export const getTasksByProjectId = getObjectsByKey.bind(undefined, tasks, 'project_id')
