export default function objectToArray (data) {
  return Object.keys(data).map(key => Object.assign({}, data[key], { key }));
}
