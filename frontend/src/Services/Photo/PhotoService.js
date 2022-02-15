import { parseCookies } from "nookies";
import toast from "react-hot-toast";
import { ENDPOINT } from "../Service";

export async function UploadPhoto(body) {
    const token = parseCookies()['TOKEN_CODESSA'];

    return await fetch(`${ENDPOINT}/photos/store`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        method: "post",
        body: body
        // mode: "no-cors"
      })
        
}