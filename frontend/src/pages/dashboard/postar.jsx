import { useRouter } from "next/router";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import MainSession from "../../Containers/main_session";
import { PrivateRoute } from "../../Containers/SessionManagement";
import { Post } from "../../Services/Posts/PostService";

export default function Page() {

    const [blockButton, setButtonConfig] = useState(false);

    const {handleSubmit, register} = useForm();
    const route = useRouter();

    function onSubmit(data) {

        const isDataEmpty = Object.values(data).some(x => x === '' || x === null);
        
        if(!isDataEmpty) {
            Post(data)
                .then(response => {
                    setButtonConfig(true);
                    toast.success('Postagem adicionada!', {id: 'post_added'});
                    route.push('/dashboard');
                }).catch(err => {
                    console.log(err.response);
                    if(err.response.status >= 500) {
                        toast.error('Erro interno do servidor', {id: 'server_error'});
                    }
                });
        }else {
            toast.error('Campos não podem ser nulos!', {id: 'null_fields'});
        }
    }
    
    return(
        <MainSession>
            <Toaster />
            <div className="container">
                <h5>Adicionar postagem</h5>
                <br />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                        <Form.Control {...register('title')} type='text' placeholder='Título da postagem' /> <br />
                    </Form.Group>
                        <textarea {...register('content')} className='form-control'></textarea> <br />
                    <Form.Group>
                        <Button variant='primary' type='submit'
                        disabled={blockButton}>Enviar postagem</Button>
                    </Form.Group>
                </form>
            </div>

            <style jsx>{`
                .container {
                    margin: 0 auto;
                }
            `}</style>
        </MainSession>
    );
}

export async function getServerSideProps(ctx) {

    return await PrivateRoute(ctx);
    
}
