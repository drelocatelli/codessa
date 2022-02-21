import Link from 'next/link';
import { Container, Button } from 'react-bootstrap';
import MainSession from '../../Containers/main_session';
import { DeletePost, GetAllPostsByUserLoggedIn } from '../../Services/Posts/PostService';
import stylesPosts from '../../../styles/posts.module.css';
import Parse, { resumeText } from '../../Utils/HtmlParse';
import { parseCookies } from 'nookies';
import { route } from 'next/dist/server/router';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function Page(props) {
    
    const { posts } = props;

    return (
        <MainSession>
            <Container>
                <ProfilePage pageProps={props}>
                    <h5>Meu conteúdo</h5>
                    <Posts posts={posts} />
                </ProfilePage>
            </Container>
        </MainSession>
    );
}

export function Posts({ posts }) {

    const route = useRouter();
    
    if (posts.length == 0)
        return (
            <div style={{ margin: '50px 30px', background: '#f9f9f9', padding: '12px' }}>
                Nenhuma postagem foi encontrada.
            </div>
        );

    return (
        <div style={{ marginTop: '28px' }}>
            {posts.map(post =>
            (
                <div className={stylesPosts.post} key={post.id}>
                    <div className='handle-buttons'>
                        <li>
                            <a href="javascript:void(0);"
                                onClick={async () => {
                                    await DeletePost(post.id)
                                        .then(response => {
                                            toast.success(`Artigo #${post.id} removido!`, {id: 'remove_article'});
                                            route.reload();
                                        }).catch(err => {
                                            toast.error(`Impossível deletar o artigo #${post.id}`, {id: 'remove_article_error'});
                                        });
                                }}
                            >Excluir</a>
                        </li>
                        <li><Link href={`editar/post/${post.id}`}>Editar</Link></li>
                    </div>
                    <h5>
                        <Link href={`/dashboard/article/${post.id}`}>{post.title}</Link>
                    </h5>
                    <div className={stylesPosts.post_details}>
                        <li><b>Autor:</b> {post.user.name}</li>
                        <li><b>Data:</b> {post.createdAt}</li>
                    </div>
                    <div className={stylesPosts.post_body}>
                        {Parse(resumeText(post.content))}
                    </div>
                    <style jsx>{`
                        .handle-buttons {
                            float: right;
                        }
                        .handle-buttons li {
                            display: inline;
                            list-style:none;
                        }
                        .handle-buttons li:first-child {
                            margin-right: 20px;
                        }
                    `}</style>
                </div>

            )
            )}
        </div>
    );
}

export function ProfilePage(props) {

    const { userLoggedIn } = props.pageProps;

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', margin: '60px 0' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div>
                        <img src={`https://github.com/${userLoggedIn.username}.png`} style={{ width: '50px', height: '50px', borderRadius: '50px' }} />
                    </div>
                    <div style={{ marginLeft: '10px' }}>
                        <b>Seja bem-vindo, {userLoggedIn.name} !</b> <br />
                        Sua permissão é {userLoggedIn.permissions}
                    </div>
                </div>
                <div>
                    <Link href='/dashboard/postar'>
                        <Button variant="danger">Criar artigo</Button>
                    </Link>
                </div>
            </div>
            {props.children}
        </>
    );
}

export async function getServerSideProps(ctx) {

    let posts = await GetAllPostsByUserLoggedIn(ctx);
    const userLoggedIn = JSON.parse(parseCookies(ctx)['userLoggedIn']);

    return {
        props: {
            posts: posts.data.posts,
            userLoggedIn
        }
    };

}
