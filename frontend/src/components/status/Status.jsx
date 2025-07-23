import React, { useRef } from 'react';
import profile_logo from '../../assets/profile_logo.png';
import './status.css';

const Status = () => {
  const users = Array.from({ length: 20 });
  const scrollRef = useRef();

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === 'left') {
      current.scrollLeft -= 200;
    } else {
      current.scrollLeft += 200;
    }
  };

  return (
    <div className="status-wrapper">
      <button className="scroll-btn left" onClick={() => scroll('left')}>←</button>

      <div className="status-container" ref={scrollRef}>
        {users.map((_, index) => (
          <div className="status" key={index}>
            <div className="status-list">
              <img src={profile_logo} alt="profile" />
            </div>
            <span className="full-name">Johnathan Christopher Doe</span>
          </div>
        ))}
      </div>

      <button className="scroll-btn right" onClick={() => scroll('right')}>→</button>
    </div>
  );
};

export default Status;
