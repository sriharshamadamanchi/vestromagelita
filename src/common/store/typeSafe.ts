export const resetState = (initState: any): any => (state: any) => {
  for (const key in initState) {
    state[key] = initState[key];
  }
};