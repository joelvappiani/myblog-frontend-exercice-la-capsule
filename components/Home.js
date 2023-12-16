import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Post from './Post';

const Home = () => {
    const [messageInput, setMessageInput] = useState('');
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/allPosts')
            .then((response) => response.json())
            .then((data) => setPostList(data.posts.map((post) => post.message)));
    }, []);

    const handlePost = () => {
        setPostList([...postList, messageInput]);
        fetch('http://localhost:3000/addPost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: messageInput }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
        setMessageInput('');
    };
    const handleRemove = (myPost) => {
        setPostList(postList.filter((post) => post !== myPost));

        fetch('http://localhost:3000/deletePost', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: myPost }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    };

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <input
                    className={styles.input}
                    type='text'
                    placeholder="What's on your mind..."
                    onChange={(e) => setMessageInput(e.target.value)}
                    value={messageInput}
                />
                <button onClick={() => handlePost()} className={styles.button}>
                    Post
                </button>
            </div>
            <div className={styles.postsList}>
                {postList.map((post, i) => {
                    return <Post key={i} post={post} handleRemove={handleRemove} />;
                })}
            </div>
        </div>
    );
};

export default Home;
