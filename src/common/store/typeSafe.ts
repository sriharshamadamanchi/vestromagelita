import { produce } from "immer";

export function getActionType<T extends { type: string }>(action: () => T): T["type"];
export function getActionType<T extends { type: string }, P>(
  action: (payload: P) => T
): T["type"];

export function getActionType(action: (...args: any[]) => { type: string }): string {
  return action({} as any).type;
}

export const resetState = (initState: any): any => (state: any) => {
  for (const key in initState) {
    state[key] = initState[key];
  }
};

export const action = (type: string, payload?: any): any => {
  return {
    type,
    payload
  };
};

export const createReducer = (initialState: any): any => {
  const actionHandlers: any = {};

  const reducer: any = (state: any = initialState, calledAction: any) => {

    const handler = actionHandlers[calledAction.type];
    if (handler) {
      const nextState = produce(state, (stateState: any) => {
        handler(stateState, calledAction );
      });

      return nextState;
    }

    return state;
  };

  reducer.__proto__.handleAction = (action: any, handler: any) => {
    const actionName = getActionType(action);
    actionHandlers[actionName] = handler;

    return reducer;
  };

  return reducer;
};
