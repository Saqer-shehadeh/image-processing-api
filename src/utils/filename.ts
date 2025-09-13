import path from 'path';

export function safeFilename(name: string): string {
  return path.basename(name).replace(/[^a-zA-Z0-9-_]/g, '');
}
