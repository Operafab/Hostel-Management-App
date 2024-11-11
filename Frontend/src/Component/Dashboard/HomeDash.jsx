
import React from 'react';
import './HomeDash.css';
import { Link } from 'react-router-dom';

const activities = [
    {img: '/src/assets/asset-1.png', name: 'Jenny', action: 'Jenny just checked out', time:'3 mins ago'},
    {img: '/src/assets/lady.png', name: 'John', action: 'John checked in', time:'3 mins ago'},
    {img: '/src/assets/asset-1.png', name: 'Peter', action: 'Peter checked out', time:'3 mins ago'}
]

const HomeDash = () => {
  return (
    <div className='--flex-center __homeDashCon'>
        <div className="__paraCon">
            <h1 className='__paraHeader'>Welcome Back, Jackie!</h1>
        </div>
        <div className="__secondCon">
            <h3 className="__quickTitle">Quick Stats</h3>
            <div className="__flex __boards">
                <div className="__board">
                    <p className="__boardHead">120</p>
                    <p className="__boardDetails">Total Students</p>
                </div>
                <div className="__board">
                    <p className="__boardHead">100</p>
                    <p className="__boardDetails">Active Students</p>
                </div>
                <div className="__board">
                    <p className="__boardHead">20</p>
                    <p className="__boardDetails">Inactive Students</p>
                </div>
            </div>
        </div>
        <div className="--flex-center __firstCon">
            <h4 className="__title">Recent Activities</h4>
                {activities.map((activity) => (
                    <div className="__users">
                        <div className="__firstUserPic">
                            <img src={activity.img} alt={activity.name} />
                        </div>
                        <div className="__userData">
                            <div>
                                <h5>{activity.name}</h5>
                                <p>{activity.action}</p>
                            </div>
                            <p>{activity.time}</p>
                        </div>
                    </div>
                ))}
        </div>
        <div className="__lastCon">
            <h3 className="__lastTitle">Quick Actions</h3>
            <div>
                <button className="__addBtn">
                    <Link style={{color: 'white'}} to='/studentreg'>Add student</Link>
                </button>
                <button className="__attendBtn">
                    <Link to='#'>Attendance</Link>
                </button>
            </div>
        </div>
    </div>
  )
}

export default HomeDash;