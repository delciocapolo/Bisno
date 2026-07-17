export const computeUserIdFromHeaders = (auth: {
  [key: string]: any;
}): string => {
  console.log(auth);
  return "xpto";
};
