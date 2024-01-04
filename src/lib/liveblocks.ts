const SECRET_KEY = process.env.LIVEBLOCKS_SECRET_KEY;
const HEADERS = { Authorization: `Bearer ${SECRET_KEY}` };
const BASE_URL = "https://api.liveblocks.io/v2/rooms";

export async function createRoom(roomId: string, defaultAccesses: string[]) {
  const url = BASE_URL;

  const body = JSON.stringify({
    id: roomId,
    defaultAccesses,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: HEADERS,
    body,
  });

  const data = await response.json();
  return data;
}

export async function deleteRoom(roomId: string) {
  const url = `${BASE_URL}/${roomId}`;

  await fetch(url, {
    method: "DELETE",
    headers: HEADERS,
  });
}

export async function initializeStorage(roomId: string, storage: any) {
  const url = `${BASE_URL}/${roomId}/storage`;

  const body = JSON.stringify({
    liveblocksType: "LiveObject",
    data: storage,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: HEADERS,
    body,
  });

  const data = await response.json();
  return data;
}

export async function getStorage(roomId: string) {
  const url = `${BASE_URL}/${roomId}/storage?format=json`;

  const response = await fetch(url, {
    method: "GET",
    headers: HEADERS,
  });

  const data = await response.json();
  return data;
}
