import axios from 'axios';

const authClient = axios.create({
    baseURL: 'https://api-dev.docnova.ai/auth',
    headers: { "Content-Type": 'application.json' }
});

export function loginRequest({ email, password }) {
    return authClient.post('/login/external', { email, password });
}