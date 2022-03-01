import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../../styles/indexPage.module.css';
import { GetAllPages } from '../Services/Pages/PagesServices';

function Pages({children}) {
    
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState(undefined);
    
    useEffect(() => {
        fetchPages();
    }, []);
    
    async function fetchPages() {
        try {
            const pages = await GetAllPages();
            setPages(pages.data.pages);
        } catch(err) {
            console.log(err);
        }
        
        setLoading(false);
    }
    
    if(!loading)
    return(    
        <ul>
            <li><Link href='/'>Página Inicial</Link></li>
                {(typeof pages != 'undefined' && pages.length > 0) ? (
                    <>
                    {pages.map(page => {
                        return(
                            <li><Link href={`/page/${page.id}`}>{page.title}</Link></li>
                            );
                        })}
                    </>) : null}              
        </ul>);

    return(<>&nbsp;</>);
}
                
export default function Header() {
                    
    return (
      <>
        <div className={styles.header}>
            <div className={styles.fundo}>
                <div className={styles.body}>
                    <div className={styles.brand}>Codessa</div>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.menu}>
                    <Pages />
                </div>
            </div>
        </div>
        </>
    );
}