import { destroyCookie, parseCookies } from 'nookies';
import { RevalidateLogin } from './Services/Authentication/AuthService';

export function userCheck(fn) {
    return async (ctx) => {
        const cookies = parseCookies(ctx);
        if(cookies['TOKEN_CODESSA'])
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false
                }
            }
    
        return fn(ctx);
    }
}
export function userAuth(fn) {
    return async (ctx) => {
        const cookies = parseCookies(ctx);

        if(!cookies['TOKEN_CODESSA'])
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
        
        try {
            const revalidate = await RevalidateLogin(cookies['TOKEN_CODESSA']);

            const userData = revalidate.data;
            // receive props from file then merge with props from here
            const propsReceived = await fn(ctx).then(c => {
                return c;
            });
            const props = await {
                ...propsReceived,
                props: {
                    user: userData,
                    ...propsReceived.props
                }
            }
            return props;

        } catch(err) {
            destroyCookie(ctx, 'TOKEN_CODESSA');
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

        
       
    }
}