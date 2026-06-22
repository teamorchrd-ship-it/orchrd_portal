import React from 'react';
import { Heart, MessageCircle, Share2, MoreVertical } from 'lucide-react';

const Post = ({ post }) => (
  <div style={{ 
    backgroundColor: 'var(--m3-surface)', 
    borderRadius: '16px', 
    marginBottom: '16px', 
    overflow: 'hidden',
    border: '1px solid var(--m3-outline-variant)'
  }}>
    <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img 
          src={post.user.avatar} 
          alt={post.user.name} 
          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} 
        />
        <div>
          <span style={{ display: 'block', fontWeight: '700', fontSize: '0.9rem', color: 'var(--m3-on-surface)' }}>{post.user.name}</span>
          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--m3-on-surface-variant)' }}>{post.timestamp}</span>
        </div>
      </div>
      <MoreVertical size={18} style={{ color: 'var(--m3-on-surface-variant)' }} />
    </div>
    
    <div style={{ padding: '0 16px 16px 16px' }}>
      <p style={{ fontSize: '0.9rem', color: 'var(--m3-on-surface)', lineHeight: '1.4', marginBottom: post.image ? '12px' : '0' }}>
        {post.content}
      </p>
    </div>

    {post.image && (
      <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
        <img src={post.image} alt="Post content" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    )}

    <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '20px', borderTop: '1px solid var(--m3-outline-variant)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--m3-on-surface-variant)', cursor: 'pointer' }}>
        <Heart size={18} />
        <span style={{ fontSize: '0.8rem' }}>{post.likes}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--m3-on-surface-variant)', cursor: 'pointer' }}>
        <MessageCircle size={18} />
        <span style={{ fontSize: '0.8rem' }}>{post.comments}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--m3-on-surface-variant)', cursor: 'pointer' }}>
        <Share2 size={18} />
      </div>
    </div>
  </div>
);

const Feed = ({ posts }) => {
  return (
    <div style={{ padding: '16px' }}>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
