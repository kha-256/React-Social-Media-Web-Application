import "./feed.css";
import Share from "../share/share";
import Post from "../post/Post";
import { Posts } from "../../dummyData";

export default function Feed() {
    return (
<div className="feed">
<div className="feedWrapper">
<Share/>
</div>
    {Posts.map((p)=>(
        <Post key={p.id} post={p}/>
    ))}
</div>
    );
}
