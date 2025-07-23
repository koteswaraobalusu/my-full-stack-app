import React from 'react'
import './usersuggestions.css';
import kotes from '../../assets/koteswararao.jpg';
import { useUsers_suggestQuery } from '../../api/authApi';

const UserSuggestions = () => {
    const {data,isLoading}=useUsers_suggestQuery()

  return (
    <div className='user-suggestions'>
        <div className='user-switch'>
            <img src={kotes}/>
            <div className='switch'>
                <p>Username</p>
                <a>switch</a>
            </div>

        </div>

        <div className='follow'>
           <div className='follow-header'>
                <p>Suggested for you</p>
                <a>See all</a>
           </div>
           <div className='follow-requests'>

            {isLoading && <div>Loading...</div>}
            {!isLoading && data?.length === 0 && (
            <div>No suggestions available</div>
            )}
            {data && data.map(user => (
            <div key={user.id} className="suggested-user">
              <div className="user-info">
                <img src={kotes} alt="Suggested user" />
                <div className='user-info-username'>
                  <p className="username">{user.username}</p>
                </div>
              </div>
              <button className="follow-btn">Follow</button>
            </div>
          ))}

           </div>
        </div>
      
    </div>
  )
}

export default UserSuggestions
