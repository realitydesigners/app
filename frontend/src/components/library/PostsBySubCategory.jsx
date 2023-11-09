import { Text, Line } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Crystal from './Crystal';
import ModelWithEffects from './ModelWithEffects';

export function getSubCategoryPositions(count, offset = [0, 0, 0], radius = 15) {
  const positions = [];

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count; // Evenly distribute around circle
    const x = Math.cos(angle) * radius + offset[0];
    const z = Math.sin(angle) * radius + offset[2];
    const y = offset[1]; // Keep y fixed at the same height

    positions.push([x, y, z]);
  }
  return positions;
}

const getRefPostPosition = (index, count, subCategoryPosition) => {
  const radius = 6; // Adjust as needed
  const angle = (Math.PI * 2 * index) / count;
  const x = subCategoryPosition[0] + Math.cos(angle) * radius;
  const y = subCategoryPosition[1] + Math.sin(angle) * radius;
  return [x, y, subCategoryPosition[2]];
};

const playSound = (soundPath) => {
  const audio = new Audio(soundPath)
  audio.play()
}

export const SubCategory = (props) => {
  const {
    title,
    model,
    position,
    isHighlighted,
    onClick,
    onPointerOver,
    onPointerOut,
    hoveredWorld,
    onHover,
    onLeave,
    selectedMainWorld,
    rotationY,
    textWidth = 21,
    textHeight = 15,
  } = props;

  const isDimmed =
    (hoveredWorld && hoveredWorld !== title) ||
    (selectedMainWorld && selectedMainWorld !== title);

  const handleHover = () => {
    playSound('/sounds/click.mp3');
    if (onPointerOver) {
      onPointerOver(title, position);
    }
  };

  const handleClick = () => {
    playSound('/sounds/click.mp3');
    onClick(title, position);
  };

  const textRef = useRef(null);
  const { camera } = useThree();

  useFrame(() => {
    if (textRef.current) {
      textRef.current.lookAt(camera.position);
    }
  });

  return (
    <group
      position={position}
      rotation={[0, rotationY, 0]}
      onPointerOver={onHover}
      onPointerOut={onLeave}
    >
        <ModelWithEffects
        model={model}
        className="model"
        position={[0,0,1]}
        scale={[1.5,1.5,1.5]}
        onPointerOver={() => title && onPointerOver(title)}
        onPointerOut={onPointerOut}
        onClick={() => title && onClick(title, position)}
        emissiveIntensity={isHighlighted ? 2 : 1}
      />
      <Text
        ref={textRef}
        position={[0, 0, -3]}
        color="white"
        fontSize={0.9}
        font="/fonts/monomaniac.ttf"
        anchorX="center"
        anchorY="middle"
        maxWidth={6}
      >
        {title}
      </Text>
      <Line
        points={[
          [-textWidth / 2, textHeight / 2, 0],
          [textWidth / 2, textHeight / 2, 0],
          [textWidth / 2, -textHeight / 2, 0],
          [-textWidth / 2, -textHeight / 2, 0],
          [-textWidth / 2, textHeight / 2, 0],
        ]}
        position={[0, 0, 0]}
        color="gray"
        lineWidth={1}
        dashed={false}
      />
    </group>
  );
};

export const SubCategories = (props) => {
  const {
    categories,
    highlightedCategory,
    handleMainWorldInteraction,
    setHoveredWorld,
    hoveredWorld,
    selectedMainWorld,
  } = props;

  const positions = getSubCategoryPositions(categories.length);

  return (
    <>
      {categories.map((cat, index) => {
        const [x, y, z] = positions[index];
        const world = cat.title || '';
        const isHovered = world === highlightedCategory;
        const rotationY = -((Math.PI * 2 * index) / categories.length) + Math.PI / 2;

        return (
          <SubCategory
            key={world}
            title={world}
            model={cat.model}
            position={[x, y, z]}
            isHighlighted={isHovered}
            onClick={handleMainWorldInteraction}
            onPointerOver={() => {handleMainWorldInteraction(world, [x, y, z])}}
            onPointerOut={() => {}}
            hoveredWorld={hoveredWorld}
            onHover={() => {setHoveredWorld(world)}}
            onLeave={() => {setHoveredWorld(null)}}
            selectedMainWorld={selectedMainWorld}
            rotationY={rotationY}
          />
        );
      })}
    </>
  );
};

export const RefPost = (props) => {
  const {
    title,
    position, // This is the position relative to the subCategoryPosition
    isHighlighted,
    onClick,
    onPointerOver,
    onPointerOut,
  } = props;

  const { camera } = useThree();
  const textRef = useRef();

  useFrame(() => {
    if (textRef.current) {
      textRef.current.lookAt(camera.position);
    }
  });

  return (
    <group position={position}> 
      <Crystal
        className="sub-crystal"
        position={[0, 0, 0]} 
        scale={[0.5, 0.5, 0.5]}
        onPointerOver={() => title && onPointerOver(title)}
        onPointerOut={onPointerOut}
        onClick={() => title && onClick(title, position)}
        emissiveIntensity={isHighlighted ? 1.5 : 1}
      />
      <Text
        ref={textRef}
        position={[0, 0, -3]} 
        color="white"
        fontSize={0.9}
        font="/fonts/monomaniac.ttf"
        anchorX="center"
        anchorY="middle"
        maxWidth={6}
      >
        {title}
      </Text>
    </group>
  );
};


export const RefPosts = ({ subCategoryPosition, refPosts, highlightedCategory, setHighlightedWorld }) => {
  const { camera } = useThree();
  const currentPositionsRef = useRef([]);

  useFrame(() => {
    if (currentPositionsRef.current.length === 0) return;
    const mainWorldVec = new THREE.Vector3(...subCategoryPosition);

    currentPositionsRef.current.forEach((currentPos, i) => {
      const relativePos = new THREE.Vector3().subVectors(currentPos, mainWorldVec);
      relativePos.applyQuaternion(camera.quaternion);
      currentPos.copy(mainWorldVec).add(relativePos);
    });
  });


  return (
    <>
      {refPosts.map((postRef, index) => {
        const [x, y, z] = getRefPostPosition(index, refPosts.length, subCategoryPosition);
        const isHighlighted = postRef.isHighlighted;

        return (
          <RefPost
            key={postRef.title}
            title={postRef.title}
            position={[x, y, z]}
            isHighlighted={isHighlighted}
            onPointerOver={() => setHighlightedWorld(postRef.title)}
            onPointerOut={() => {}}
          />
        );
      })}
    </>
  );
};


const PostsBySubCategory = (props) => {
  const {
    categories,
    handleMainWorldInteraction,
    
  } = props;

  const [hoveredWorld, setHoveredWorld] = useState(null);

  // Get positions for all subcategories
  const subCategoryPositions = getSubCategoryPositions(categories.length);

  // Find the hovered subcategory object
  const hoveredCategory = categories.find(cat => cat.title === hoveredWorld);

  // Get the position for the hovered subcategory
  const hoveredSubCategoryPosition = hoveredCategory ?
    subCategoryPositions[categories.indexOf(hoveredCategory)] : null;

  // Find the refPosts for the hoveredWorld
  const hoveredCategoryPosts = hoveredCategory?.refPosts || [];

  return (
    <group onPointerOut={() => setHoveredWorld(null)}>
      <SubCategories
        categories={categories}
        highlightedCategory={hoveredWorld}
        handleMainWorldInteraction={handleMainWorldInteraction}
        setHoveredWorld={setHoveredWorld}
        hoveredWorld={hoveredWorld}
      />
      {hoveredWorld && hoveredSubCategoryPosition && (
        <RefPosts
          subCategoryPosition={hoveredSubCategoryPosition} 
          refPosts={hoveredCategoryPosts}
        />
      )}
    </group>
  );
};

export default React.memo(PostsBySubCategory);
