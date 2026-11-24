export async function readLimitedText(
  request: Request,
  limit: number,
): Promise<string | null> {
  const bytes = await readLimitedBytes(request, limit);
  return bytes && new TextDecoder().decode(bytes);
}

export async function readLimitedBytes(
  request: Request,
  limit: number,
): Promise<Uint8Array | null> {
  if (Number(request.headers.get("content-length")) > limit) return null;
  if (!request.body) return new Uint8Array();
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}
