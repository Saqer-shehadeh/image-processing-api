import path from 'path';

export function safeFilename(name: string): string {
  // remove path traversal characters
  return path.basename(name).replace(/[^a-zA-Z0-9-_]/g, '');
}
