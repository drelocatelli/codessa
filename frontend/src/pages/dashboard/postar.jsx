import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import MainSession, {getServerSideProps} from "../../Containers/main_session";
import { Post } from "../../Services/Posts/PostService";

export default function Page() {

    const {handleSubmit, register} = useForm();

    function onSubmit(data) {

        const isDataEmpty = Object.values(data).some(x => x === '' || x === null);
        
        if(!isDataEmpty) {
            Post(data)
                .then(response => {
                    console.log(response);
                }).catch(err => {
                    console.log(err.response);
                });
        }else {
            toast.error('Campos não podem ser nulos!');
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
                        <Button variant='primary' type='submit'>Enviar postagem</Button>
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

export {getServerSideProps}