import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { RiUserUnfollowFill } from 'react-icons/ri'
import Menu from '../../components/menu'
import Nav from '../../components/nav'
import { checkFollow, followUser, unfollowUser } from '../../services/follow'
import { getUserTweets } from '../../services/tweet'
import { getUser } from '../../services/user'
import styles2 from '../../styles/home.module.scss'
import styles from '../../styles/profile.module.scss'

export default function Profile() {
    const [profile, setProfile] = useState()
    const [following, setFollowing] = useState(null)
    const [tweets, setTweets] = useState([])

    const router = useRouter()
    const id = router.query.id
    const token = Cookie.get('token')
    const myId = Cookie.get('id')
    const ofFollow = () => {
        unfollowUser(id, token).then(() => {
            setFollowing(false)
        })
    }
    const onFollow = () => {
        followUser(id, token).then(() => {
            setFollowing(true)
        })
    }
    useEffect(() => {
        if (token) {
            getUser(id, token).then(response => {
                setProfile(response)
            }).catch((err) => {
                <h1>{err}</h1>
            })
            getUserTweets(id, 1, token).then(setTweets)
            checkFollow(id, token).then(res => {
                if (res?.status) {
                    setFollowing(true)
                } else {
                    setFollowing(false)
                }
            })
        } else {
            router.push('/login')
        }
    }, [following])
    return (<>
        <Nav id={myId} token={token}/>
        <div className={styles.container}>
            {
                (profile == null) ? <h3>oh oh!</h3> :
                    <div className={styles.info}>
                        <h1>{profile.name} {profile.surname}</h1>
                        <h2>{profile.biography}</h2>
                        <h3>{profile.email}</h3>
                        <h3>{profile.location}</h3>
                        <h4>{profile.dateofbirth}</h4>
                        {myId == id ? ''
                            : <div>
                                {following ?
                                    <button onClick={ofFollow}>Unfollow <RiUserUnfollowFill /></button>
                                    : <button onClick={onFollow}>Follow <AiOutlineUserAdd /></button>}
                            </div>
                        }
                    </div>
            }
            {tweets != null ?
                <section className={styles2.list_tweets}>
                    {tweets.map((tweet) => (<div>
                        <p key={tweet.id}>{tweet.message}</p>
                        <h2>{tweet.date}</h2>
                    </div>))}
                </section>
                : <h1>No found tweets</h1>}

        </div>
        <Menu/>
    </>
    )
}