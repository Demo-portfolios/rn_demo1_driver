import { RECEIPT_URL } from "../Modules/app/config";
export function generateUrlReceipt(id, token) {
    return RECEIPT_URL+id+"/receipt/-/-/-/-/"+token
}