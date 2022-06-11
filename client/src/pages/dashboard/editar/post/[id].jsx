import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import MainSession from "../../../../Components/Containers/main_session";
import RichTextEditor from "../../../../Utils/RichTextEditor";
import {GetPostById, UpdatePost} from '../../../../Services/Posts/PostService';
import { userAuth } from "../../../../authentication";

export default function Page(props) {

    const {post} = props;

    const [content, setContent] = useState(post.content);
    const [blockButton, setButtonConfig] = useState(false);

    const { handleSubmit, register } = useForm();
    const route = useRouter();

    const params = props.params;
    
    console.log(props)
    
    function onSubmit(data) {

        data = {
            ...data,
            content
        }

        const isDataEmpty = Object.values(data).some(x => x === '' || x === null);

        if (!isDataEmpty) {
            UpdatePost(data, params.id)
                .then(response => {
                    console.log(response);
                    toast.success('Postagem adicionada!', { id: 'post_added' });
                    route.push(`/dashboard/article/${params.id}`);
                }).catch(err => {
                    toast.error('Erro interno do servidor', { id: 'server_error' });
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
                <h5>{`Editar artigo #${params.id} - ${post.title}`}</h5>
                <br />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                        <Form.Control {...register('title', {value: post.title})} type='text' placeholder='Título da postagem' /> <br />
                    </Form.Group>
                    <RichTextEditor
                        data={post.content}
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
                            disabled={blockButton}>Salvar artigo</Button>
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

export const getServerSideProps = userAuth(async (ctx) => {
    
    let posts = await GetPostById(ctx.query.id);
    return {
        props: {
            params: ctx.params,
            post: posts.data.post
        }
    }
    
});