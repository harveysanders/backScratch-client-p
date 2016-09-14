import * as api from '../utils/api';

// ------------- Tasks ------------
export async function getTasks() {
  // return GET promise
  return api.get('/tasks');
}

// for main task list
export async function getRequestedTasks() {
  return api.get('tasks/requested');
}

export async function getTaskById(taskId) {
  return api.get(`/tasks/${taskId}`);
}

export async function getUserAssignedTasks(userId) {
  return api.get(`/tasks/assigned/${userId}`);
}

export async function getUserRequestedTasks(userId) {
  return api.get(`/tasks/requested/${userId}`);
}

export async function assigneeTaskCompletion(taskId) {
  return api.post(`/tasks/completed/assignee/${taskId}`);
}

export async function requestorTaskCompletion(taskId) {
  return api.post(`/tasks/completed/requestor/${taskId}`);
}

export async function postTask(task) {
  return api.post('/tasks', task);
}

export async function updateTask(taskId, newProps) {
  return api.put(`/tasks/${taskId}`, newProps);
}

export async function postTaskAssignment(assignment) {
  return api.post('/tasks/assign', assignment);
}

export async function sendRequestorTaskRating(taskId, ratingInfo) {
  return api.put(`/tasks/rating/requestor/${taskId}`, ratingInfo);
}

export async function sendAssigneeTaskRating(taskId, ratingInfo) {
  console.log('ratingInfo', ratingInfo);
  return api.put(`/tasks/rating/assignee/${taskId}`, ratingInfo);
}

// ------------- Users ------------
export async function getUserInfo(userId) {
  return api.get(`/users/${userId}`);
}

export async function loginUser(email) {
  return api.get(`/users/login/${encodeURIComponent(email)}`);
}

export async function createUser(user) {
  return api.post('/users', user);
}

export async function updateUser(userId, newProps) {
  return api.put(`/users/${userId}`, newProps);
}
