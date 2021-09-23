import { UsersHandler } from './src/handler';

function createHandler() {
  return new UsersHandler();
}

export async function changePassword(event, context) {
  return createHandler().changePassword(event, context, { body: {}});
}

export async function confirmPassword(event, context) {
  return createHandler().confirmPassword(event, context);
}

export async function create(event, context) {
  return createHandler().create(event, context);
}

export async function forgotPassword(event, context) {
  return createHandler().forgotPassword(event, context);
}

export async function login(event, context) {
  return createHandler().login(event, context);
}

export async function recycle(event, context) {
  return createHandler().recycle(event, context);
}

export async function edit(event, context) {
  return createHandler().edit(event, context);
}

export async function get(event, context) {
  return createHandler().get(event, context);
}

export async function list(event, context) {
  return createHandler().list(event, context);
}

export async function authorize(event, context) {
  return createHandler().authorize(event, context);
}
