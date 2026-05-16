export const parseSocketPayload = (data: any): any => {
  return JSON.parse(JSON.stringify(data));
}
