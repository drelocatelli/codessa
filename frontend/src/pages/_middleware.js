import { NextResponse } from "next/server";
import { RevalidateLogin } from "../Services/Authentication/AuthService";

export async function middleware(req, ev) {

    const token = req.cookies['TOKEN_CODESSA'];
    const {pathname} = req.nextUrl;

    if(pathname.startsWith('/dashboard')) {
        return await refreshTokens(token);
    } 

    if(pathname.startsWith('/admin')) {
        return await isAlreadyLogged(token);
    }
    
}

export async function isAlreadyLogged(token) {
    try {
        if(typeof token != 'undefined') {
            console.log('check already logged');
            let revalidate = await RevalidateLogin(token);
            let hasPermissions = revalidate.data.user.permissions == 'ADMIN' || revalidate.data.user.permissions == 'POST';
            
            if(revalidate.status == 200 && hasPermissions) {
                return NextResponse.redirect('/dashboard');
            } 
    
        }
    } catch(err) {}

    return NextResponse.next();
}

export async function refreshTokens(token) {
    
    try {
        if(typeof token != 'undefined') {
            console.log('refresh token');
    
            let revalidate = await RevalidateLogin(token);
            let hasPermissions = revalidate.data.user.permissions == 'ADMIN' || revalidate.data.user.permissions == 'POST';
            
            if(revalidate.status == 200 && hasPermissions) {
                return NextResponse.next().cookie('userLoggedIn', JSON.stringify(revalidate.data.user));
            } 
    
        }
    } catch(err) {}

    return NextResponse.redirect('/');
    
}