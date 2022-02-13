import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Redirect from "../Components/redirect";
import { RevalidateLogin } from "../Services/Authentication/AuthService";

// redirect if user already logged in
export async function LoadSession(ctx) {

    console.log('Check whether user already logged');

    const { TOKEN_CODESSA } = parseCookies(ctx);

    if (typeof TOKEN_CODESSA != 'undefined') {
        let revalidate = await RevalidateLogin(TOKEN_CODESSA);
        if (revalidate.status == 200) {
            if(revalidate.data.user.permissions == 'ADMIN') {
                return {
                    redirect: {
                        destination: '/dashboard',
                        permanent: false,
                    },
                };
            }
        }
    }

    return {
        props: {}
    }

}


// redirect if user not logged
export async function PrivateRoute(ctx) {

    console.log('Check user in private route');

    const { TOKEN_CODESSA } = parseCookies(ctx);

    if (typeof TOKEN_CODESSA != 'undefined') {
        let revalidate = await RevalidateLogin(TOKEN_CODESSA);
        if (revalidate.status == 200) {
            if (revalidate.data.user.permissions == 'ADMIN') {
                return {
                    props: {}
                };
            }
        }
    }

    return {
        redirect: {
            destination: '/',
            permanent: false,
        },
    }

}