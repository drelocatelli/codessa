import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Redirect(props) {

    const route = useRouter();
    
    useEffect(() => {
        route.push(props.path)
    }, []);
    
    return(null);
}