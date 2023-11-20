import { Box, Html, Plane, Text, useTexture } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { urlFor } from '../../lib/urlFor';

const PostBox = ({ post, position, rotationY }) => {
   const texture = useTexture(urlFor(post.image).url());

   return (
      <group position={position} rotation={[0, rotationY + Math.PI, 0]} scale={[3, 4, 0.1]}>
         <mesh rotation={[0, 0, Math.PI / 2]}>
            <mesh name="Card">
               <boxGeometry args={[1, 1, 0.1]} />
               <meshBasicMaterial map={texture} />
            </mesh>
            <Text name="PostTitle" position={[0, 0.25, 0.1]} fontSize={0.1} color="white" maxWidth={0.8} anchorX="center" anchorY="middle" font={'/fonts/monomaniac.ttf'}>
               {post.title}
            </Text>
            <Text
               name="tag"
               position={[0, -0.2, 0.1]}
               fontSize={0.05}
               color="white"
               maxWidth={0.8}
               anchorX="center"
               anchorY="middle"
               font={'/fonts/monomaniac.ttf'}
               depth={0.1} // The amount of extrusion
            >
               {post.excerpt}
            </Text>
         </mesh>
      </group>
   );
};

const PostsList = ({ posts }) => {
   const circleRadius = 8;
   const postsCount = posts.length;
   const angleIncrement = (2 * Math.PI) / postsCount;

   return (
      <group rotation={[Math.PI / 2, Math.PI, 0]}>
         {posts.map((post, id) => {
            const angle = angleIncrement * id;
            const position = [circleRadius * Math.cos(angle), 0, circleRadius * Math.sin(angle)];
            return <PostBox key={id} post={post} position={position} rotationY={-angle + Math.PI / 2} />;
         })}
      </group>
   );
};

export default PostsList;
