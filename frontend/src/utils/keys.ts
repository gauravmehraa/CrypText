export const toBuffer = (obj: any): ArrayBuffer => {
  let array;
  if(obj.data) array = new Uint8Array(obj.data);
  else array = new Uint8Array(obj);
  return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);
}

export const toArray = (buffer: any): number[] => {
  return Array.from(new Uint8Array(buffer));
}

export const generateKeys = async () => {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    ["deriveKey", "deriveBits"]
  );

  const publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
  const privateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

  return { publicKey, privateKey };
};

export const deriveSharedSecret = async (privateKey: BufferSource, publicKey: BufferSource) => {
  const importedPrivateKey = await window.crypto.subtle.importKey(
    "pkcs8",
    privateKey,
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    false,
    ["deriveKey", "deriveBits"]
  );

  const importedPublicKey = await window.crypto.subtle.importKey(
    "spki",
    publicKey,
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    []
  );

  const sharedSecret = await window.crypto.subtle.deriveKey(
    {
      name: "ECDH",
      public: importedPublicKey,
    },
    importedPrivateKey,
    {
      name: "AES-GCM",
      length: 256, 
    },
    true,
    ["encrypt", "decrypt"]
  );

  const exportedSharedSecret = await window.crypto.subtle.exportKey("raw", sharedSecret);

  return exportedSharedSecret;
};

export const encryptPrivateKey = async (privateKey: ArrayBuffer, password: string) => {
  const passwordBuffer = new TextEncoder().encode(password);
  const salt = window.crypto.getRandomValues(new Uint8Array(16)); // Generate a random salt

  const derivedKey = await window.crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );

  const aesKey = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    derivedKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encryptedPrivateKey = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    aesKey,
    privateKey
  );

  return { encryptedPrivateKey, iv, salt };
};

export const decryptPrivateKey = async (encryptedPrivateKey: ArrayBuffer, password: string, iv: BufferSource, salt: BufferSource) => {
  const passwordBuffer = new TextEncoder().encode(password);

  const derivedKey = await window.crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );

  const aesKey = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    derivedKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const decryptedPrivateKey = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    aesKey,
    encryptedPrivateKey
  );

  return decryptedPrivateKey;
};