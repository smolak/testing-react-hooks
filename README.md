# Testing React Hooks

In this repo I will try to test React's hooks by using only [`shallow`](https://airbnb.io/enzyme/docs/api/shallow.html) rendering of [`enzyme`](https://airbnb.io/enzyme/) testing tool.

There are few rules to that:

1. I will only use `shallow` to render components.
   
   What that means is that I will avoid deep (using [`mount`](https://airbnb.io/enzyme/docs/api/mount.html)) rendering. This requirement is about not having to have to prepare dependencies (e.g. store) for any child component(s) the component under the test will also render.
   
2. I will try to avoid mocking global and local imports to stub methods of those imports.

   Meaning, I will try to avoid using https://jestjs.io/docs/en/manual-mocks#mocking-node-modules (as I am using Jest for tests here).
   
3. I will use the newest version of React, enzyme and Jest to do so.

   I will update them every now and then and improve the tests if any of the tools will allow me to do so.
   
## State of what's been done 

List taken from https://reactjs.org/docs/hooks-reference.html

### Basic Hooks

 - [x] useState [ [code example](https://github.com/smolak/testing-react-hooks/tree/master/src/components/UseStateComponent), [reference](https://reactjs.org/docs/hooks-reference.html#usestate) ]
 - [ ] useEffect
 - [ ] useContext
 
### Additional Hooks

 - [ ] useReducer
 - [ ] useCallback
 - [ ] useMemo
 - [ ] useRef
 - [ ] useImperativeHandle
 - [ ] useLayoutEffect
 - [ ] useDebugValue

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
