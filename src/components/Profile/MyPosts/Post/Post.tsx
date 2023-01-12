import React from 'react';
import s from './Post.module.css';

type PropsType = {
    id: string
    message: string
    likesCount: number
}

const Post = (props: PropsType) => {
    return (
        <li className={s.item}>
            <img src={'https://s.zefirka.net/images/2015-09-14/smeshnye-illyustracii-ot-brazilskogo-xudozhnika-tiago-xoizel/smeshnye-illyustracii-ot-brazilskogo-xudozhnika-tiago-xoizel-11.jpeg'} alt={'avatar'}/>
            {props.message}
            <div className={s.likes}>
                <img src={'https://www.pngall.com/wp-content/uploads/4/Heart-Symbol-PNG.png'} alt="like"/>
                {props.likesCount}</div>
        </li>
    )
}

export default Post;