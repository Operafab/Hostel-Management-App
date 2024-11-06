
import React from 'react'
import "./HomeDash.css"
import { Link } from 'react-router-dom'


const activities = [
  {
    name: "Johny OG",
    action: "Johny OG just checked out !",
    time:"3 mins ago",
    img:"/src/assets/lady.png"
  },
  {
    name: "John Bosco",
    action: "John Bosco just checked out !",
    time:"5 mins ago",
    img:"/src/assets/asset-1.png"
  },
  {
    name: "Johny Sins",
    action: "Johny Sins just checked out !",
    time:"3 mins ago",
    img:"/src/assets/lady.png"
  }
]

const HomeDash = () => {
  return (
    <div className='--flex-center __homeDashCon'>
      <div className="__paraCon">
        <h1 className="__paraHeader">
          Welcome Back, Jackie !
        </h1>

      </div>

      <div className="__secondCon">
        <h1 className="__quickTitle">
            Quick Stats.
        </h1>

        <div className="__flex __boards">
        <div className=" __board">
          <p className="__boardHead">
            120
          </p>
          <p className="__boardDetails">
            Total Students.
          </p>
        </div>
      
        <div className=" __board">
          <p className="__boardHead">
            100
          </p>
          <p className="__boardDetails">
            Active Students.
          </p>
        </div>

        <div className=" __board">
          <p className="__boardHead">
            20
          </p>
          <p className="__boardDetails">
            Inactive Students.
          </p>
        </div>
        </div>
      </div>

    <div className="--flex-center __firstCon">
      <h4 className="__title">Recent Activities</h4>
      {activities.map((activity)=>(
        <div className="__users">
          <div className="__firstUserPlc">
            <img src={activity.img} alt={activity.name}/>
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
        <h1 className="__lsastTitle">
          Quick Actions.
        </h1>

        <div>
          <button className="__addBtn">
            <Link to='/studentreg'>
              Add Student
            </Link>
          </button>

          <button className="__attendBtn">
            <Link to='#'>
              Attenddance
            </Link>
          </button>
        </div>
      </div>

    </div>
  )
}

export default HomeDash