import React from "react";
import { Link } from "react-router";
import { GITHUB_PROFILE } from "../utils/constants";
import UserContext from "../utils/UserContext";

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        userInfo : {
            name : '',
            bio : '',
            url : '',
            avatar_url : 'default'
        }
    }
  }

  async componentDidMount(){
    const data = await fetch(GITHUB_PROFILE);
    const res = await data.json();
    this.setState({
        userInfo : res
    })
  }

  render() {
    const {name,bio, blog, avatar_url} = this.state.userInfo;

    return (
      <div className="userCard" style={{display: "flex", gap: '1rem', alignItems: 'center'}}>
                <img src={avatar_url} alt="avatar url" style={{height: '7rem', width : '7rem', borderRadius : '50%'}}/>
        <div style={{display: "flex", flexDirection: 'column'}}>
            <span>Name: {name}</span>
            <span>Bio: {bio}</span>
            <span>Linkedin: <Link className="text-dec" to={blog}>{blog}</Link></span>
            <UserContext.Consumer>{({loggedInUser}) => <span>{loggedInUser}</span>}</UserContext.Consumer>
        </div>
      </div>
    );
  }
}

export default User;
