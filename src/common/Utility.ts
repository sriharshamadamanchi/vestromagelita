const isEmpty = (str: any): boolean => {
  return (str === null || str === undefined || str === "");
};

const isNotEmpty = (str: any): boolean => {
  return !(str === null || str === undefined || str === "");
};

export default {
  isEmpty,
  isNotEmpty
}
