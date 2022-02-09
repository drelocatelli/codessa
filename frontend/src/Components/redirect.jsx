import Router from "next/router";
import { useEffect } from "react";

export default function Redirect({path}) {

    useEffect(() => {
        Router.push(path);
    }, []);
    
    return(null);
    
}