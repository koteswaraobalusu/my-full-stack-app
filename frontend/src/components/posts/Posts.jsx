import React from 'react'
import profile_logo from '../../assets/netflix.jpg'
import './posts.css';
import like_logo from '../../assets/like_logo.png';
import comment_logo from '../../assets/comment_logo.png';

const Posts = () => {

  return (
    <div className='posts-container'>

        <div className='post'>
            <div className="userinfo">
                <img src={profile_logo}/>
                <div>
                    <p>username</p>
                </div>
            </div> 
            <div className="userimg">
                <img src={profile_logo}/>
            </div>
            <div className="post-buttons">
                <img src={like_logo}/>
                <img src={comment_logo}/>
                
            </div>
            <div className="post-button-info">
                <h4>10 likes</h4>
                <p>View all 38 comments</p>
            </div>
            <div className="input-comment">
                <input type='text' placeholder='Add a Comment...'/>
                <span>post</span>
            </div>

        </div>


        <div className='post'>
            <div className="userinfo">
                <img src={profile_logo}/>
                <div>
                    <p>username</p>
                </div>
            </div> 
            <div className="userimg">
                <img src={profile_logo}/>
            </div>
            <div className="post-buttons">
                <img src={like_logo}/>
                <img src={comment_logo}/>
                
            </div>
            <div className="post-button-info">
                <h4>10 likes</h4>
                <p>View all 38 comments</p>
            </div>
            <div className="input-comment">
                <input type='text' placeholder='Add a Comment...'/>
                <span>post</span>
            </div>

        </div>

      
    </div>
  )
}

export default Posts
