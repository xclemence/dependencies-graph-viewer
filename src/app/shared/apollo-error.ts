export function handleApolloError(result: any): any {
  if (!result.errors) {
    return result;
  }

  throw new Error(extractApolloError(result));
}

export function extractApolloError(result: any): string {

  let errorMessage = "Service error(s):";
  for (const error of result.errors) {
    errorMessage = `${errorMessage}\n${error.message}`;
  }

  return errorMessage;
}

