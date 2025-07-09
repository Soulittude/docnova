import axios from "axios";

const invoiceClient = axios.create({
    baseURL: 'https://api-dev.docnova.ai/invoice',
    headers: { 'Content-Type': 'application.json' },
});

export function searchInvoices(filter, token) {
    return invoiceClient.post(
        '/search',
        filter,
        {
            headers: {
                'R-Auth': token
            }
        }
    );
}