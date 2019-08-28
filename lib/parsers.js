import { partitionString } from './utils';

export function parseHeaders(lines) {
  return lines
    .filter(item => item.match(/^.*?:.*?$/)) // keep only key value pairs
    .map(item => partitionString(item, ':')); // split the name and the value
}

export function parseFirstLine(firstLine) {
  return firstLine.split(/\s+/).slice(0, 3);
}

export function parseBody(lines) {
  return lines.slice(1).join('\n');
}

export function parsePath(rawPath) {
  return partitionString(rawPath, '?');
}
