import { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreVertical, Bookmark } from 'lucide-react';

const LikeButton = ({ count }) => {
  const [liked, setLiked] = useState(false);
  return (
    <button
      onClick={() => setLiked(l => !l)}
      style={{ display: 'flex', alignItems: 'center', gap: 5, color: liked ? '#EF4444' : 'var(--m3-on-surface-variant)', border: 'none', background: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}
    >
      <Heart size={17} fill={liked ? '#EF4444' : 'none'} />
      <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{liked ? count + 1 : count}</span>
    </button>
  );
};

/* Feed layout — standard vertical card */
const FeedPost = ({ post }) => (
  <div style={{ background: 'var(--m3-surface)', borderRadius: 16, marginBottom: 12, overflow: 'hidden', border: '1px solid var(--m3-outline-variant)' }}>
    <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src={post.user.avatar} alt={post.user.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
        <div>
          <span style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: 'var(--m3-on-surface)' }}>{post.user.name}</span>
          <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--m3-on-surface-variant)' }}>{post.timestamp}</span>
        </div>
      </div>
      <MoreVertical size={16} style={{ color: 'var(--m3-on-surface-variant)' }} />
    </div>
    <div style={{ padding: '0 14px', marginBottom: post.image ? 10 : 0 }}>
      <p style={{ fontSize: '0.85rem', color: 'var(--m3-on-surface)', lineHeight: 1.45 }}>{post.content}</p>
    </div>
    {post.image && (
      <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
        <img src={post.image} alt="Post" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    )}
    <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 16, borderTop: '1px solid var(--m3-outline-variant)' }}>
      <LikeButton count={post.likes} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--m3-on-surface-variant)', cursor: 'pointer' }}>
        <MessageCircle size={17} />
        <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{post.comments}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--m3-on-surface-variant)', cursor: 'pointer' }}>
        <Share2 size={17} />
      </div>
      <Bookmark size={17} style={{ marginLeft: 'auto', color: 'var(--m3-on-surface-variant)', cursor: 'pointer' }} />
    </div>
  </div>
);

/* Cards layout — large image, overlaid text */
const CardPost = ({ post }) => (
  <div style={{ background: 'var(--m3-surface)', borderRadius: 18, marginBottom: 14, overflow: 'hidden', border: '1px solid var(--m3-outline-variant)' }}>
    {post.image ? (
      <div style={{ position: 'relative', height: 180 }}>
        <img src={post.image} alt="Post" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 14px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src={post.user.avatar} alt={post.user.name} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', border: '2px solid white' }} />
            <span style={{ fontWeight: 700, fontSize: '0.78rem', color: 'white' }}>{post.user.name}</span>
          </div>
          <LikeButton count={post.likes} />
        </div>
      </div>
    ) : (
      <div style={{ padding: '18px 14px', minHeight: 100, background: 'var(--m3-primary-container)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--m3-on-primary-container)', lineHeight: 1.4 }}>{post.content}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
          <img src={post.user.avatar} alt={post.user.name} style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ fontWeight: 700, fontSize: '0.72rem', color: 'var(--m3-on-primary-container)' }}>{post.user.name}</span>
        </div>
      </div>
    )}
    <div style={{ padding: '10px 14px' }}>
      {post.image && <p style={{ fontSize: '0.82rem', color: 'var(--m3-on-surface)', lineHeight: 1.4 }}>{post.content}</p>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: post.image ? 8 : 0 }}>
        <span style={{ fontSize: '0.7rem', color: 'var(--m3-on-surface-variant)' }}>{post.timestamp}</span>
        <span style={{ fontSize: '0.7rem', color: 'var(--m3-on-surface-variant)' }}>{post.comments} comments</span>
      </div>
    </div>
  </div>
);

/* Magazine layout — editorial, compact */
const MagazinePost = ({ post, index }) => {
  const isFeatured = index === 0;
  return (
    <div style={{
      display: 'flex', gap: 10,
      padding: '10px 0',
      borderBottom: '1px solid var(--m3-outline-variant)',
      flexDirection: isFeatured ? 'column' : 'row',
    }}>
      {post.image && (
        <div style={{
          borderRadius: 10, overflow: 'hidden', flexShrink: 0,
          width: isFeatured ? '100%' : 72,
          height: isFeatured ? 140 : 72,
        }}>
          <img src={post.image} alt="Post" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <img src={post.user.avatar} alt={post.user.name} style={{ width: 18, height: 18, borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--m3-primary)' }}>{post.user.name}</span>
          <span style={{ fontSize: '0.65rem', color: 'var(--m3-on-surface-variant)' }}>· {post.timestamp}</span>
        </div>
        <p style={{ fontSize: isFeatured ? '0.88rem' : '0.78rem', fontWeight: isFeatured ? 700 : 500, color: 'var(--m3-on-surface)', lineHeight: 1.38, display: '-webkit-box', WebkitLineClamp: isFeatured ? 3 : 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.content}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--m3-on-surface-variant)' }}>♥ {post.likes}</span>
          <span style={{ fontSize: '0.68rem', color: 'var(--m3-on-surface-variant)' }}>💬 {post.comments}</span>
        </div>
      </div>
    </div>
  );
};

/* Minimal layout — text only, very clean */
const MinimalPost = ({ post }) => (
  <div style={{ padding: '14px 0', borderBottom: '1px solid var(--m3-outline-variant)' }}>
    <div style={{ display: 'flex', gap: 10 }}>
      <img src={post.user.avatar} alt={post.user.name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, marginTop: 1 }} />
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
          <span style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--m3-on-surface)' }}>{post.user.name}</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--m3-on-surface-variant)' }}>@{post.user.handle?.replace('@', '')} · {post.timestamp}</span>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--m3-on-surface)', lineHeight: 1.45 }}>{post.content}</p>
        <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
          <LikeButton count={post.likes} />
          <span style={{ fontSize: '0.75rem', color: 'var(--m3-on-surface-variant)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <MessageCircle size={14} /> {post.comments}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--m3-on-surface-variant)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Share2 size={14} />
          </span>
        </div>
      </div>
    </div>
  </div>
);

const Feed = ({ posts, layoutStyle = 'feed' }) => {
  const wrapperStyle = { padding: layoutStyle === 'minimal' ? '0 16px' : '12px 14px' };

  return (
    <div style={wrapperStyle}>
      {posts.map((post, index) => {
        if (layoutStyle === 'cards') return <CardPost key={post.id} post={post} />;
        if (layoutStyle === 'magazine') return <MagazinePost key={post.id} post={post} index={index} />;
        if (layoutStyle === 'minimal') return <MinimalPost key={post.id} post={post} />;
        return <FeedPost key={post.id} post={post} />;
      })}
    </div>
  );
};

export default Feed;
