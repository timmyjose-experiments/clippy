import UserDefaultsSuiteIosModule from "./UserDefaultsSuiteIosModule";

// Given the UserDefaults suite, get the value for the given key
export function getForSuite(suite: string, key: string): string | null {
  return UserDefaultsSuiteIosModule.get(suite, key)
}