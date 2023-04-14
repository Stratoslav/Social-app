import { useSelector } from 'react-redux';
import './MyPost.scss';
import { RootState } from '../../../redux/store';
import { useAppDispatch } from '../../../redux/hooks';
import { profileAction } from '../../../redux/slice/profileSlice';


export default function AllPosts() {

  const newPost = useSelector((s: RootState) => s.profile.posts)
  const dispatch = useAppDispatch()
  
  return (
    <div className={'Post_All'}>
      <ul className={'Post_List'}>
        {[...newPost].reverse().map(post => {
          return (
            <li key={post.id} className={'Post_ListItems'}>
              <img
                width="30px"
                height="30px"
                src="https://hardiagedcare.com.au/wp-content/uploads/2019/02/default-avatar-profile-icon-vector-18942381.jpg"
                alt=""
              />
              <h3>{post.name}</h3>
              <div>{post.message}</div>
              <button onClick={() => dispatch(profileAction.deletePost(post.id))}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}