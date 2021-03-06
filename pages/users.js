import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Cookie from 'js-cookie'
import { getUsers } from '../services/follow'
import { AiOutlineUser } from 'react-icons/ai'
import styles from '../styles/home.module.scss'
import Nav from '../components/nav'
import Menu from '../components/menu'
export default function Users() {
    const [new_users, setNewUsers] = useState([])
    const router = useRouter()
    const token = Cookie.get('token')
    const id = Cookie.get('id')
    useEffect(() => {
        if (!token) {
            router.push('/login')
        } else {
            getUsers(token, 'new').then(
                setNewUsers
            ).catch(err => {
                <h1>{err}</h1>
            })
        }
    }, [])
    return (
        <div className={styles.users}>
            <Nav id={id} token={token} />
            <h1>Meet new people</h1>
            {new_users != null ?
                new_users.map(user => (
                    <div className={styles.user} key={user.id}>
                        <Link href={`/profile/${user.id}`}><a><AiOutlineUser /> {user.name} {user.surname}</a></Link>
                        <h2>{user.biography}</h2>
                        <h2>{user.location}</h2>
                        <h2>{user.email}</h2>
                    </div>
                ))
                : <h1>No users new found</h1>}
            <Menu />
        </div>
    )
}