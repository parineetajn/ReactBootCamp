import React, { Component } from 'react';
//import axios from 'axios';

import axios from '../../axios';
import Post from '../../Components/Post/Post';
import FullPost from '../../Components/FullPost/FullPost';
import NewPost from '../../Components/NewPost/NewPost';
import classes from './Blog.module.css';

class Blog extends Component {
    state={
        posts:[],
        selectedPostId:null,
        error:false
    }

    componentDidMount(){
        axios.get('/posts')
        .then(response =>{
            const posts= response.data.slice(0,4);
            const updatedPosts=posts.map(post=>{
                return{
                    ...post,
                    author:'Max'
                }
            });
            this.setState({posts: updatedPosts});
            //console.log(response);
        })
        .catch(error=>{
            this.setState({error:true});
            //console.log(error);
        });
            
    }

    postClickedHandler=(id)=>{
        this.setState({selectedPostId:id});
    }

    render () {
        let posts =<p style={{textAlign: "center"}}>Something went wrong..</p>;
        if(!this.state.error){
            posts=this.state.posts.map(post=>{
                return <Post 
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={()=>this.postClickedHandler(post.id)}/>
            });
        }
       

        return (
            <div>
                <section className={classes.Posts}>
                    {posts}
                </section>
                <section>
                    <FullPost 
                        id={this.state.selectedPostId}
                        />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;