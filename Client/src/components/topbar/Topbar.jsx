import "./topbar.css";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from "react-router-dom";


export default function Topbar() {
    
    const navigate= useNavigate();

    const homepaheNavigation=()=>{
        navigate('/home')
    }

    return (
        <div className="topbarContainer">

            <div className="topbarLeft" onClick={homepaheNavigation}>
                <span className="logo">Social Media App</span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <SearchIcon  className="searchIcon"/>
                    <input placeholder="Search for any friend, post or video" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">

                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>

                <div className="topbarIcons">
                    <div className="topbarIconItems">
                    <PersonIcon/>
                    <span className="topbarIconBadge">1</span>
                    </div>

                    <div className="topbarIconItems">
                    <ChatIcon/>
                    <span className="topbarIconBadge">1</span>
                    </div>

                    <div className="topbarIconItems">
                    <NotificationsIcon/>
                    <span className="topbarIconBadge">1</span>
                    </div>
                </div>

                <img src="/assets/person/1.jpeg" alt="" className="topbarImg"/>

            </div>

        </div>
    );
}
