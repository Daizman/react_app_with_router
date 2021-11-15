import {useEffect, useRef, useState} from 'react';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import '../styles/App.css';
import { IPost } from '../interfaces';
import PostFilter, {Filter} from '../components/PostFilter';
import CustomModalWindow from '../components/UI/modal/CustomModalWindow';
import CustomButton from '../components/UI/button/CustomButton';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import useObserver from '../hooks/useObserver';
import CustomSelectComponent from '../components/UI/select/CustomSelectComponent';

function Posts() {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [modal, setModal] = useState(false);
    const [filter, setFilter] = useState<Filter>({
        sort: '',
        query: ''
    });
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [totalPagesCount, setTotalPagesCount] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef() as React.MutableRefObject<HTMLDivElement>;

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit: number, page: number) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = parseInt(response.headers['x-total-count']);
        setTotalPagesCount(getPageCount(totalCount, limit));
    })

    const createPost = (newPost: IPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    };
    const removePost = (post: IPost) => {
        setPosts(posts.filter(p => p.id !== post.id));
    };

    useObserver(lastElement, page < totalPagesCount, isPostsLoading, () => {
        setPage(page + 1);
    });

    useEffect(() => {
        fetchPosts(limit, page);
    }, [page, limit]);

    const changePage = (page: number) => {
        setPage(page);
        fetchPosts(limit, page);
    }

    return (
        <div className="App">
            <CustomButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Создать запись
            </CustomButton>
            <hr style={{margin: '15px 0'}}/>
            <CustomModalWindow visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </CustomModalWindow>
            <PostFilter 
                filter={filter}
                setFilter={setFilter}
            />
            <CustomSelectComponent 
                value={limit}
                onChange={(value) => setLimit(parseInt(value.target.value))}
                selDefault="Количество элементов на странице"
                selOptions={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать все'},
                ]}
            />
            {
                postError && <h1>Произошла ошибка ${postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS"/>
            <div ref={lastElement} style={{height: 20}} />
            {
                isPostsLoading && <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 50
                    }}>
                    <Loader />
                  </div>
            }  
            <Pagination 
                totalPages={totalPagesCount}
                page={page}
                changePage={changePage}
            />
        </div>
    );
}

export default Posts;
