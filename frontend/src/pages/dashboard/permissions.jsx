import { useEffect } from "react";
import { Container } from "react-bootstrap";
import MainSession from "../../Containers/main_session";
import { PrivateRoute } from "../../Containers/SessionManagement";
import { GetAllUsers } from "../../Services/Users/UserService";

export default function Page(props) {

    const { users } = props;
    console.log(users);

    return (
        <MainSession>
            <Container>
                <h5>Gerenciar permissões</h5> <br />
                <table border='0' width={'100%'}>
                    <tr>
                        <th>Nome</th>
                        <th>Usuário</th>
                        <th>Permissão</th>
                        <th>Editar permissão</th>
                    </tr>
                    {users.map(user => (
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.permissions}</td>
                        </tr>
                    ))}
                </table>
            </Container>
        </MainSession>
    );
}

export async function getServerSideProps(ctx) {

    const getAllUsers = await GetAllUsers(ctx);

    return {
        ...await PrivateRoute(ctx),
        props: {
            users: getAllUsers.data.response
        }
    }
}