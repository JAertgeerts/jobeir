import React from 'react';
import styled from 'styled-components';
import PostingSidebar from './PostingSidebar';
import PostingBody from '../containers/PostingBody';
import PostingMap from '../containers/PostingMap';

const PostingPreview = ({ activePosting }) => {
  const activePostingReady = Object.keys(activePosting).length;

  return (
    <PostingPreviewContainer>
      {activePostingReady &&
        <div>
          <PostingPreviewContent>
            <PostingBody activePosting={activePosting} />
            {
              // <PostingSidebar activePosting={activePosting} />
            }
          </PostingPreviewContent>
          <PostingMap activePosting={activePosting} />
        </div>}
    </PostingPreviewContainer>
  );
};

export default PostingPreview;

const PostingPreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const PostingPreviewContent = styled.div`
  display: flex;
  justify-content: center;
`;
