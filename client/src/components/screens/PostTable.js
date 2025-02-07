// components/PostTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import M from 'materialize-css';

const PostTable = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', pic: '' });
  const [editingPostId, setEditingPostId] = useState(null);

  // Fetch all posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    // Fetch all posts
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/allpost`)
      .then(response => {
        setPosts(response.data.posts);
      })
      .catch(error => console.error('Error fetching posts:', error));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPost(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCreatePost = () => {
    // Create a new post
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/createpost`, newPost)
      .then(response => {
        setNewPost({ title: '', pic: '' });
        fetchPosts(); // Refresh the posts after creating a new one
        M.toast({ html: 'Post created successfully!', classes: 'green darken-1' });
      })
      .catch(error => console.error('Error creating post:', error));
  };

  const handleEditPost = (postId) => {
    // Set the post id to be edited
    setEditingPostId(postId);
    // Fetch the post details to populate the editing form
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts/${postId}`)
      .then(response => {
        const { title, pic } = response.data.post;
        // Provide default values if title or pic is missing
        setNewPost({ title: title || '', pic: pic || '' });
      })
      .catch(error => console.error('Error fetching post details for editing:', error));
  };

  const handleDeletePost = (postId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) {
      return;
    }

    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deletepost/${postId}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'), // Replace with your actual token
      },
    })
      .then(response => {
        if (response.data.error) {
          console.error(response.data.error);
        } else {
          console.log('Post deleted successfully:', response.data);
          fetchPosts(); // Refresh the posts after deleting one
          M.toast({ html: 'Post deleted successfully!', classes: 'green darken-1' });
        }
      })
      .catch(error => console.error('Error deleting post:', error));
  };

  const handleUpdatePost = () => {
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/updatepost/${editingPostId}`, newPost, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'), // Replace with your actual token
      },
    })
      .then(response => {
        if (response.data.error) {
          console.error(response.data.error);
        } else {
          console.log('Post updated successfully:', response.data);
          setNewPost({ title: '', pic: '' });
          setEditingPostId(null);
          fetchPosts(); // Refresh the posts after updating
          M.toast({ html: 'Post updated successfully!', classes: 'green darken-1' });
        }
      })
      .catch(error => console.error('Error updating post:', error));
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px' }}>Posts</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Title</th>
            <th style={tableHeaderStyle}>Image</th>
            <th style={tableHeaderStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post._id} style={tableRowStyle}>
              <td style={tableCellStyle}>{post.title}</td>
              <td style={tableCellStyle}><img src={post.photo} alt={post.title} style={imageStyle} /></td>
              <td style={tableCellStyle}>
                <button style={buttonStyle} onClick={() => handleDeletePost(post._id)}>Delete</button>
                <button style={buttonStyle} onClick={() => handleEditPost(post._id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingPostId ? (
        <div style={formContainerStyle}>
          <h2 style={{ fontSize: '24px' }}>Edit Post</h2>
          <label style={formLabelStyle}>Title:
            <input type="text" name="title" value={newPost.title} onChange={handleInputChange} style={formInputStyle} />
          </label>
          <label style={formLabelStyle}>Image URL:
            <input type="text" name="pic" value={newPost.pic} onChange={handleInputChange} style={formInputStyle} />
          </label>
          <button style={formButtonStyle} onClick={handleUpdatePost}>Update Post</button>
        </div>
      ) : (
        <div style={formContainerStyle}>
          <h2 style={{ fontSize: '24px' }}>Create New Post</h2>
          <label style={formLabelStyle}>Title:
            <input type="text" name="title" value={newPost.title} onChange={handleInputChange} style={formInputStyle} />
          </label>
          <label style={formLabelStyle}>Image URL:
            <input type="text" name="pic" value={newPost.pic} onChange={handleInputChange} style={formInputStyle} />
          </label>
          <button style={formButtonStyle} onClick={handleCreatePost}>Add Post</button>
        </div>
      )}
    </div>
  );
};

const tableHeaderStyle = {
  backgroundColor: '#f2f2f2',
  padding: '12px',
  textAlign: 'left',
  fontsize: "18px",
};

const tableRowStyle = {
  borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '12px',
};

const imageStyle = {
  width: '50px',
  height: '50px',
};

const buttonStyle = {
  marginRight: '5px',
  padding: '8px 12px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const formContainerStyle = {
  marginTop: '20px',
  padding: '20px',
  border: '1px solid #ddd',
};

const formLabelStyle = {
  display: 'block',
  marginBottom: '10px',
};

const formInputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
};

const formButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default PostTable;