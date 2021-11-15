import { useMemo } from "react";
import { IPost } from "../interfaces";

export const useSortedPosts = (posts: IPost[], sort: string) => {
    const sortedPosts = useMemo(() => {
        return sort === ''
            ? posts
            : [...posts].sort((a, b) => 
                a[sort].toString()
                .localeCompare(b[sort].toString())
            );
    }, [sort, posts]);
    
    return sortedPosts;
}

export const usePosts = (posts: IPost[], sort: string, query: string) => {
    const sortedPosts = useSortedPosts(posts, sort);

    // callback срабатывает только при измнении зависимых элементов
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
    }, [query, sortedPosts]);

    return sortedAndSearchedPosts;
}