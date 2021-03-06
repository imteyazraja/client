const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

exports.isEmpty = isEmpty;

exports.capitalize = str => {
  str = str.toLowerCase();
  return str.replace(/\b\w/g, l => l.toUpperCase());
};
