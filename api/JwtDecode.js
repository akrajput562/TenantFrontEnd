// jwtHelper.js
import base64 from 'react-native-base64';

// Decode Base64Url to standard Base64
function decodeBase64Url(base64Url) {
    const padding = '='.repeat((4 - base64Url.length % 4) % 4);
    const base64Str = base64Url.replace(/-/g, '+').replace(/_/g, '/') + padding;
    return base64.decode(base64Str);
}

// Exported JWT decoder
export function decodeJWT(token) {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid JWT token format');
    }

    const payload = parts[1];
    const decodedPayload = decodeBase64Url(payload);

    try {
        return JSON.parse(decodedPayload);
    } catch (error) {
        throw new Error('Failed to parse JWT payload: ' + error.message);
    }
}
