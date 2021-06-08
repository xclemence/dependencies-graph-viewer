export function handleApolloError(result: any): any {
  if (!result.errors) {
    return result;
  }

  let errorMessage = "Service error(s):";
  for (const error of result.errors) {
    errorMessage = `${errorMessage}\n${error.message}`;
  }
  throw new Error(errorMessage);
}
