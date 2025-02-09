import Post from '@/featuers/Feed/components/Post';
import React from 'react'

function Posts({data}:any) {
  return (
    <div className="w-[65%] h-auto flex flex-col gap-8">
      {data?.posts?.map((post:any) => (
        <Post data={post} />
      ))}
    </div>
  );
}

export default Posts