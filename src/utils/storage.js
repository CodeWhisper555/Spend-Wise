const STORAGE_PREFIX = "spendwise_";

export function getStorageKey(key) {
  return `${STORAGE_PREFIX}${key}`;
}

export function getStoredValue(key, fallback = null) {
  try {
    const storedValue = window.localStorage.getItem(getStorageKey(key));

    return storedValue === null ? fallback : JSON.parse(storedValue);
  } catch (error) {
    console.error(`Unable to read storage key "${key}":`, error);
    return fallback;
  }
}

export function setStoredValue(key, value) {
  try {
    window.localStorage.setItem(
      getStorageKey(key),
      JSON.stringify(value)
    );

    return true;
  } catch (error) {
    console.error(`Unable to save storage key "${key}":`, error);
    return false;
  }
}

export function removeStoredValue(key) {
  try {
    window.localStorage.removeItem(getStorageKey(key));
    return true;
  } catch (error) {
    console.error(`Unable to remove storage key "${key}":`, error);
    return false;
  }
}

export function clearStoredValues() {
  try {
    Object.keys(window.localStorage)
      .filter((key) => key.startsWith(STORAGE_PREFIX))
      .forEach((key) => window.localStorage.removeItem(key));

    return true;
  } catch (error) {
    console.error("Unable to clear SpendWise storage:", error);
    return false;
  }
}