import { 
	getClientById,
	getProjectById,
	getTaskById,
	getProjectByClientId,
	getTasksByProjectId
} from './data.js';
const print = console.log;
print(getClientById(1));
print(getProjectByClientId(1))

