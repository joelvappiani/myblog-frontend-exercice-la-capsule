import styles from '../styles/Post.module.css';
import React from 'react';

const Post = ({ post, handleRemove }) => {
    return (
        <div className={styles.container}>
            <div>{post}</div>
            <span className={styles.remove} onClick={() => handleRemove(post)}>
                x
            </span>
        </div>
    );
};

export default Post;
