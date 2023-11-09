import { Text, Line } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import Crystal from './Crystal';

export function getMainCategoryPositions(count, offset = [0, 0, 0], radius = 15) {
  const positions = [];

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count; // Evenly distribute around the circle
    const x = Math.cos(angle) * radius + offset[0];
    const z = Math.sin(angle) * radius + offset[2];
    const y = offset[1]; // Keep y fixed at the same height

    positions.push([x, y, z]);
  }

  return positions;
}

const playSound = (soundPath) => {
  const audio = new Audio(soundPath);
  audio.play();
};

export const MainCategory = (props) => {
  const {
    title,
    position,
    isHighlighted,
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

  const handleRedirect = () => {
    const categoryRoute = `/library/${title.toLowerCase()}`;
    window.location.href = categoryRoute;
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
      onClick={handleRedirect}
    >
    
        <Crystal
          className="main-crystal"
          position={[0, 0, 0]}
          scale={[2, 2, 2]}
          onPointerOver={handleHover}
          onPointerOut={onPointerOut}
          emissiveIntensity={isDimmed ? 0.25 : isHighlighted ? 1.5 : 1}
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


export const MainCategories = (props) => {
  const {
    categories,
    highlightedCategory,
    handleMainWorldInteraction,
    setHoveredWorld,
    hoveredWorld,
    selectedMainWorld,
  } = props;

  const positions = getMainCategoryPositions(categories.length);

  return (
    <>
      {categories.map((cat, index) => {
        const [x, y, z] = positions[index];
        const world = cat.title || '';
        const isHovered = world === highlightedCategory;
        const rotationY = -((Math.PI * 2 * index) / categories.length) + Math.PI / 2;

        return (
          <MainCategory
            key={world}
            title={world}
            position={[x, y, z]}
            isHighlighted={isHovered}
            onClick={handleMainWorldInteraction}
            onPointerOver={() => handleMainWorldInteraction(world, [x, y, z])}
            onPointerOut={() => {}}
            hoveredWorld={hoveredWorld}
            onHover={() => setHoveredWorld(world)}
            onLeave={() => setHoveredWorld(null)}
            selectedMainWorld={selectedMainWorld}
            rotationY={rotationY}
          />
        );
      })}
    </>
  );
};

export default React.memo(MainCategories);
