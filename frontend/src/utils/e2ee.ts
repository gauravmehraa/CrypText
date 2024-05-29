export const encryptMessage = async (message: string, sharedSecret: BufferSource) => {
  const sharedSecretKey = await window.crypto.subtle.importKey(
    "raw",
    sharedSecret,
    { name: "AES-GCM" },
    true,
    ["encrypt", "decrypt"]
  );

  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();
  const encodedMessage = encoder.encode(message);
  const encryptedMessage = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    sharedSecretKey,
    encodedMessage
  );

  return { encryptedMessage, iv };
};

export const decryptMessage = async (encryptedMessage: BufferSource, sharedSecret: BufferSource, iv: BufferSource) => {
  const sharedSecretKey = await window.crypto.subtle.importKey(
    "raw",
    sharedSecret,
    { name: "AES-GCM" },
    true,
    ["encrypt", "decrypt"]
  );
  const decryptedMessage = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    sharedSecretKey,
    encryptedMessage
  );
  const decoder = new TextDecoder();
  const decodedMessage = decoder.decode(decryptedMessage);

  return decodedMessage;
};