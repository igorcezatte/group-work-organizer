import React from 'react';

export function useToggle(initialOn: boolean) {
  const [on, setOn] = React.useState(initialOn);

  const handlers = React.useMemo(
    () => ({
      on: () => setOn(true),
      off: () => setOn(false),
      toggle: () => setOn((prevOn) => !prevOn),
    }),
    []
  );

  return [on, handlers] as const;
}
