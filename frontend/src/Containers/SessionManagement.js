import { parseCookies } from "nookies";
import { RevalidateLogin } from "../Services/Authentication/AuthService";

// redirect if user already logged in
export async function LoadSession(ctx) {

    console.log('Check whether user already logged');

    const currentUrl = ctx.resolvedUrl;
    const { TOKEN_CODESSA } = parseCookies(ctx);

    if (typeof TOKEN_CODESSA != 'undefined') {
        let revalidate = await RevalidateLogin(TOKEN_CODESSA);
        if (revalidate.status == 200) {
            if(revalidate.data.user.permissions == 'ADMIN' || revalidate.data.user.permissions == 'POST') {
                
                if(
                    currentUrl == '/' ||
                    currentUrl.startsWith('/article')
                )
                    return {props: {auth: true}}
                
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
            if (revalidate.data.user.permissions == 'ADMIN' || revalidate.data.user.permissions == 'POST') {
                return {
                    props: {user: revalidate.data.user}
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