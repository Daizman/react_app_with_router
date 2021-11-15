import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { IPost, IComment } from '../interfaces';

export default function PostIdPage() {
    const params = useParams();
    const [post, setPost] = useState<IPost>({
        id: 0,
        title: '',
        body: '',
    });
    const [comments, setComments] = useState<IComment[]>();

    const [fetchPost, isLoading, error] = useFetching(async (id: number) => {
        const response = await PostService.getPost(id);
        setPost(response.data);
    });

    const [fetchComments, isCommentsLoading, commentsLoadError] = useFetching(async (id: number) => {
        const response = await PostService.getComments(id);
        setComments(response.data);
    });

    useEffect(() => {
        fetchPost(parseInt(params.id ?? '1'));
        fetchComments(parseInt(params.id ?? '1'));
    }, []);

    return (
        <div>
            <h1>Post №{params.id}</h1>
            {
                isLoading 
                ? <Loader />
                : <div>{post.id}. {post.title}<br />{post.body}</div>
            }
            <hr style={{margin: '15px 0'}}/>
            <h2>Комментарии</h2>
            {
                isCommentsLoading || !comments
                ? <Loader />
                : <div>
                    {comments.map((comment) => 
                        <div style={{margin: '15px 0'}}>
                            <h5>{comment.email}</h5>
                            <div>{comment.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};
