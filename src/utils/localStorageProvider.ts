export const setLocalStorage = (name:string, value:string) => {
    return localStorage.setItem(name, JSON.stringify(value));
  }
  export const getLocalStorage = (name:string) => {
    const value = localStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  }