// Function to encrypt message using Caesar Cipher
function caesarEncrypt(message, shift) {
    let result = '';
    shift = parseInt(shift) % 26;  // Ensure shift is within 0-25 range

    for (let i = 0; i < message.length; i++) {
        let char = message[i];

        if (char.match(/[a-z]/)) {
            let code = message.charCodeAt(i);
            result += String.fromCharCode(((code - 97 + shift) % 26) + 97);
        } else if (char.match(/[A-Z]/)) {
            let code = message.charCodeAt(i);
            result += String.fromCharCode(((code - 65 + shift) % 26) + 65);
        } else {
            result += char;  // Non-alphabetic characters remain unchanged
        }
    }

    return result;
}

// Function to brute force decrypt Caesar Cipher
function bruteForceDecrypt(ciphertext) {
    let results = [];

    for (let shift = 0; shift < 26; shift++) {
        let result = '';
        for (let i = 0; i < ciphertext.length; i++) {
            let char = ciphertext[i];

            if (char.match(/[a-z]/)) {
                let code = ciphertext.charCodeAt(i);
                result += String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
            } else if (char.match(/[A-Z]/)) {
                let code = ciphertext.charCodeAt(i);
                result += String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
            } else {
                result += char;  // Non-alphabetic characters remain unchanged
            }
        }
        results.push(`Shift ${shift}: ${result}`);
    }

    return results;
}

// DOM Elements
const aliceMessageInput = document.getElementById('aliceMessage');
const keyInput = document.getElementById('key');
const encryptBtn = document.getElementById('encryptBtn');
const encryptedMessageSpan = document.getElementById('encryptedMessage');
const sendBtn = document.getElementById('sendBtn');
const receivedMessageSpan = document.getElementById('receivedMessage');
const bruteForceBtn = document.getElementById('bruteForceBtn');
const decryptedMessageSpan = document.getElementById('decryptedMessage');

// Alice encrypts the message
let encryptedMessage = '';

encryptBtn.addEventListener('click', () => {
    const message = aliceMessageInput.value;
    const key = keyInput.value;

    if (message && key) {
        encryptedMessage = caesarEncrypt(message, key);
        encryptedMessageSpan.textContent = encryptedMessage;
    } else {
        alert('Please enter a message and key.');
    }
});

// Send encrypted message to Bob
sendBtn.addEventListener('click', () => {
    if (encryptedMessage) {
        receivedMessageSpan.textContent = encryptedMessage;
        decryptedMessageSpan.textContent = '';  // Clear previous decrypted message
    } else {
        alert('Please encrypt the message first.');
    }
});

// Bob decrypts the message using brute force
bruteForceBtn.addEventListener('click', () => {
    const ciphertext = receivedMessageSpan.textContent;
    if (ciphertext) {
        const possibleDecryptions = bruteForceDecrypt(ciphertext);
        decryptedMessageSpan.textContent = possibleDecryptions.join('\n');
    } else {
        alert('No message received yet.');
    }
});
