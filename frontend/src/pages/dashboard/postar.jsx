import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import MainSession from "../../Containers/main_session";
import { GetAllCategories, Post } from "../../Services/Posts/PostService";
import RichTextEditor from "../../Utils/RichTextEditor";

export default function Page(props) {

    console.log(props)

    const [content, setContent] = useState('');
    const [blockButton, setButtonConfig] = useState(false);

    const { handleSubmit, register } = useForm();
    const route = useRouter();


    function onSubmit(data) {

        data = {
            ...data,
            content
        }

        const isDataEmpty = Object.values(data).some(x => x === '' || x === null);

        if (!isDataEmpty) {
            Post(data)
                .then(response => {
                    setButtonConfig(true);
                    toast.success('Postagem adicionada!', { id: 'post_added' });
                    route.push('/dashboard');
                }).catch(err => {
                    console.log(err.response);
                    if (err.response.status >= 500) {
                        toast.error('Erro interno do servidor', { id: 'server_error' });
                    }
                });
        } else {
            toast.error('Campos não podem ser nulos!', { id: 'null_fields' });
        }
    }

    return (
        <MainSession>
            <Toaster />
            <div className="container">
                <div style={{ float: 'right' }}>
                    <Link href='/dashboard/meu_conteudo'>
                        <Button variant="danger">Meu conteudo</Button>
                    </Link>
                </div>
                <h5>Adicionar postagem</h5>
                <br />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                        <Form.Control {...register('title')} type='text' placeholder='Título da postagem' /> <br />
                    </Form.Group>

                    <Form.Select {...register('categorie')}>
                        <option value="">Selecione a categoria</option>
                        {props.categories.map(categorie => (
                            <option value={categorie.id}>{categorie.title}</option>
                        ))}
                    </Form.Select>
                    <br />
                    <RichTextEditor
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent(data);
                        }}
                        onReady={(editor) => {
                            editor.editing.view.change((writer) => {
                                writer.setStyle(
                                    "height",
                                    "300px",
                                    editor.editing.view.document.getRoot()
                                );
                            });
                        }}
                    >

                    </RichTextEditor>

                    <Form.Group>
                        <br />
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
    const categories = await GetAllCategories();

    return {
        props: {
            categories: categories.data.categories
        }
    }
    
}