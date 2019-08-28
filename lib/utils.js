// eslint-disable-next-line import/no-cycle
import { parseBody, parseFirstLine, parseHeaders, parsePath } from './parsers';

export function getHeadersDelimeter(lines) {
  let headersDelimeter = 0;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === '') {
      headersDelimeter = i;
      break;
    }
  }

  return headersDelimeter;
}

export function createResponseData(data) {
  const lines = Array.from(data.toString().split(/[\r\n]{2}/));
  const headersDelim = getHeadersDelimeter(lines);
  const [method, rawPath, version] = parseFirstLine(lines[0]);
  const headers = parseHeaders(lines.slice(1, headersDelim));
  const body = parseBody(lines.slice(headersDelim));
  const [path, query] = parsePath(rawPath);

  return {
    meta: { method, path, version },
    data: { query, body },
    headers,
  };
}

export function constructResponse(data) {
  const body = JSON.stringify(data);

  const parts = [
    'HTTP/1.1 200 OK',
    'Server: RequestMirror/1.0',
    'Content-Type: application/json',
    'Connection: close',
    `Content-Length: ${body.length}`,
    '',
    body,
  ];

  return parts.join('\r\n');
}

export function partitionString(str, delimeter) {
  let firstOccur = str.indexOf(delimeter);

  if (firstOccur === -1) {
    firstOccur = str.length;
  }

  return [str.slice(0, firstOccur), str.slice(firstOccur + 1)];
}
