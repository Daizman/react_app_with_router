import React, {useState} from 'react';
import CustomInput from './UI/input/CustomInput';
import {IPost} from '../interfaces';

interface PostCreateFunc {
    (post: IPost): void;
}

interface PostFormProps {
    create: PostCreateFunc;
}

const PostForm = ({create} : PostFormProps) => {
    // можно использовать объекты целиком
    const [post, setPost] = useState<IPost>({
        id: Date.now(),
        title: '', 
        body: ''
    });

    const addNewPost = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();  // отмена базовой работы кнопок

        const newPost = {
            ...post, 
            id: Date.now(),
        };

        create(newPost);

        setPost({
            id: Date.now(),
            title: '', 
            body: ''
        });
    };

    return (
        <form onSubmit={addNewPost}>
            <CustomInput 
                value={post.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPost({...post, title: e.target.value})}
                type="text" 
                placeholder="Название поста" 
            />
            <CustomInput 
                value={post.body}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPost({...post, body: e.target.value})}
                type="text"
                placeholder="Описание поста"
            />
            <CustomInput type="submit" value="Создать пост" />
        </form>
    );
};

export default PostForm;