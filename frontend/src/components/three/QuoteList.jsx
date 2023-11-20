import { Box, Line, Sphere, Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { urlFor } from '../../lib/urlFor';

const QuoteBox = ({ quote, position, rotationY }) => {
   const textWidth = 1.1;
   const textHeight = 1.5;

   return (
      <group position={position} rotation={[0, rotationY, 0]}>
         <Text name="PostTitle" position={[0, 0, 0]} fontSize={0.09} color="black" maxWidth={textWidth - 0.2} textAlign="center" anchorX="center" anchorY="middle" font={'/fonts/monomaniac.ttf'}>
            {quote.quote}
         </Text>

         <Line
            points={[
               [-textWidth / 2, textHeight / 2, 0],
               [textWidth / 2, textHeight / 2, 0],
               [textWidth / 2, -textHeight / 2, 0],
               [-textWidth / 2, -textHeight / 2, 0],
               [-textWidth / 2, textHeight / 2, 0],
            ]}
            color="black"
            lineWidth={1}
            dashed={false}
         />
      </group>
   );
};

const QuoteList = ({ quotes }) => {
   const radius = quotes.length * 0.5;
   const angleIncrement = Math.PI / (quotes.length - 1);

   return (
      <group rotation={[0, Math.PI / 2, 0]}>
         {quotes.map((quote, id) => {
            const angle = angleIncrement * id;
            const position = [radius * Math.sin(angle), 0, -radius * Math.cos(angle)];
            return <QuoteBox key={id} quote={quote} position={position} rotationY={-angle} />;
         })}
      </group>
   );
};

export default QuoteList;
