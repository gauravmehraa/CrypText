export const generateKeys = async () => {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: { name: "SHA-256" },
    },
    true,
    ["encrypt", "decrypt"]
  );

  const publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
  const privateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

  return { publicKey, privateKey };
};

export const encryptPrivateKey = async (privateKey: BufferSource, password: string) => {
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
      iterations: 100000, // Adjust based on security requirements
      hash: "SHA-256",
    },
    derivedKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Generate IV for encryption
  const encryptedPrivateKey = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    aesKey,
    privateKey
  );

  return { encryptedPrivateKey, iv, salt };
};


export const decryptPrivateKey = async (encryptedPrivateKey: BufferSource, password: string, iv:BufferSource, salt: BufferSource) => {
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
      iterations: 100000, // Should match the iteration count used during encryption
      hash: "SHA-256",
    },
    derivedKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const decryptedKey = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    aesKey,
    encryptedPrivateKey
  );

  return decryptedKey;
};