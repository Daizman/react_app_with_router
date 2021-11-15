import Post, {PostRemoveFunc} from './Post';
import { IPost } from '../interfaces';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';

interface PostListProps {
    posts: IPost[];
    title: string;
    remove: PostRemoveFunc;
}

const PostList = ({posts, title, remove}: PostListProps) => {
    if(!posts.length) {
        return (
            <h2 style={{textAlign: 'center'}}>
                Посты не найдены!
            </h2>
        );
    }
    return (
        <div>
            <h2 style={{textAlign: 'center'}}>
                {title}
            </h2>
            <TransitionGroup>
                {posts.map((post: IPost, index: number) => 
                    <CSSTransition
                    key={post.id}
                    timeout={500}
                    classNames="post"
                    >
                        <Post remove={remove} number={index + 1} post={post}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default PostList;
