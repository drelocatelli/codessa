import Link from 'next/link';
import styles from '../../../styles/indexPage.module.css';

export default function Header() {

    return (
        <div className={styles.header}>
             <div className={styles.fundo}>
                <div className={styles.body}>
                    <div className={styles.brand}>Codessa</div>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.menu}>
                    <ul>
                        <li><Link href='/'>Página Inicial</Link></li>
                        <li> <Link href='/categories'>Artigos por tags</Link> </li>
                        <li><Link href='/admin'>Criar artigo</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}