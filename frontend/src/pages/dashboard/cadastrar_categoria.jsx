import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import MainSession from "../../Containers/main_session";
import Redirect from '../../Containers/redirect';
import { NewCategorie } from "../../Services/Posts/PostService";

export default function Page() {

    const route = useRouter();
    const [isAdmin, setIsAdmin] = useState(undefined);
    const [blockButton, setBlockButton] = useState(false);
    const { handleSubmit, register } = useForm();

    useEffect(() => {
        const userLoggedIn = parseCookies()['userLoggedIn'];
        let checkAdmin = JSON.parse(userLoggedIn).permissions == 'ADMIN';

        if(checkAdmin) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }

    }, []);

    async function cadastrarCategoria(data) {

        setBlockButton(true);
        
        if(data.title != '') {
            await NewCategorie(data)
                .then(response => {
                    route.push('administrar')
                }).catch(err => {
                    console.log(err.response)
                })
        }
    }

    if(isAdmin)
    return(
        <MainSession>
            <h5>Cadastrar categoria</h5>
            <hr />
            <form onSubmit={handleSubmit(cadastrarCategoria)}>
                <Form.Control {...register('title')} type="text" required /> <br />
                <Button variant='primary' type='submit' disabled={blockButton}>Cadastrar categoria</Button>
            </form>
        </MainSession>
    );
    
    return(null);

}