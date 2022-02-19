import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";
import { Container } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import MainSession from "../../Containers/main_session";
import { GetAllUsers, SetPermission } from "../../Services/Users/UserService";

export default function Page(props) {

    const route = useRouter();

    const [users, setUsers] = useState(props.users);

    async function setPermission(e, permission) {

        let userId = e.target.dataset.user;
        console.log(`Mudando permissão do usuário ${userId} para ${permission}`);

        SetPermission(parseCookies()['TOKEN_CODESSA'], userId, permission)
            .then(res => {

                let replacedUser = users.map(user => {
                    if (user.id == userId) {
                        return res.data;
                    }
                    return user;
                });
                setUsers(replacedUser);
                toast.success(`Permissão do usuário #${userId} alterada!`, {id: `USER_PERMISSION_${userId}` });
            }).catch(err => {
                if (err.response.data.msg) {
                    toast.error(err.response.data.msg, { id: 'permission_error' });
                } else {
                    toast.error('Ocorreu um erro', { id: 'permission_error' });
                }
            });
    }

    return (
        <MainSession>
            <Toaster />
            <Container>
                <h5>Colaboradores</h5> <br />
                {(users.length == 0) ? (
                    <>Nenhum colaborador encontrado.</>
                ) :
                    (<table border='0' align='center' width={'100%'}>
                    <tr>
                        <th>Nome</th>
                        <th>Usuário</th>
                        <th>Permissão</th>
                        {(props.userLoggedIn.permissions == 'ADMIN') ?
                            (
                                <th>Editar permissão</th>
                            ) : null}
                    </tr>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.permissions}</td>
                            {(props.userLoggedIn.permissions == 'ADMIN') ?
                                (
                                    <td>
                                        <form onSubmit={(e) => e.preventDefault()}>
                                            <label htmlFor={`ADMIN_${user.id}`}>ADMIN</label>
                                            <input type='radio' name='permission' data-user={user.id} onChange={e => setPermission(e, 'ADMIN')} id={`ADMIN_${user.id}`} checked={(user.permissions) == 'ADMIN' ? true : false} />
                                            &nbsp;&nbsp;
                                            <label htmlFor={`POST_${user.id}`}>POST</label>
                                            <input type='radio' name='permission' data-user={user.id} onChange={e => setPermission(e, 'POST')} id={`POST_${user.id}`} checked={(user.permissions) == 'POST' ? true : false} />
                                            &nbsp;&nbsp;
                                            <label htmlFor={`USER_${user.id}`}>USER</label>
                                            <input type='radio' name='permission' data-user={user.id} onChange={e => setPermission(e, 'USER')} id={`USER_${user.id}`} checked={(user.permissions) == 'USER' ? true : false} />
                                        </form>
                                    </td>
                                ) : null}
                        </tr>
                    ))}
                </table>)
                }
            </Container>
        </MainSession>
    );
}

export async function getServerSideProps(ctx) {

    const getAllUsers = await GetAllUsers(ctx);

    const userLoggedIn = JSON.parse(parseCookies(ctx)['userLoggedIn']);

    return {
        props: {
            users: getAllUsers.data.response,
            userLoggedIn
        }
    }
}