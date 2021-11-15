import CustomButton from './UI/button/CustomButton';
import {IPost} from '../interfaces';
import { useNavigate } from 'react-router-dom';

export interface PostRemoveFunc {
    (post: IPost): void;
}

interface PostProps {
    number: number;
    title?: string;
    body?: string;
    post: IPost;
    remove: PostRemoveFunc;
}


const Post = (props : PostProps) => {
    const navigate = useNavigate();

    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>{props.post.body}</div>
            </div>  
            <div className="post__btns">
                <CustomButton onClick={() => navigate(`/posts/${props.post.id}`)}>
                    Открыть
                </CustomButton>
                <CustomButton onClick={() => props.remove(props.post)}>
                    Удалить
                </CustomButton>
            </div>
        </div>
    );
};

export default Post;