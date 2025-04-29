import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Tile = ({ position, type, label, players, tileSize = 1 }) => {
  const colors = {
    start: '#65c1f7',
    end: '#5cdb5c',
    obstacle: '#f76565',
    chance: '#f7d365',
    normal: '#ffffff'
  };

  const meshRef = useRef();
  
  // Hover effect
  const [hovered, setHovered] = React.useState(false);
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  // Set tile color based on type
  const color = colors[type] || colors.normal;
  
  return (
    <group position={position}>
      {/* Base tile */}
      <mesh 
        ref={meshRef}
        position={[0, 0, 0]}
        receiveShadow
        castShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[tileSize, 0.1, tileSize]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.1} 
          roughness={0.5}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>
      
      {/* Tile label */}
      <Text
        position={[0, 0.06, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.3}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      
      {/* Player tokens */}
      {players.map((player, index) => (
        <mesh
          key={player.id}
          position={[
            (index % 2 === 0 ? 0.25 : -0.25), 
            0.2, 
            (index < 2 ? 0.25 : -0.25)
          ]}
          castShadow
        >
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color={player.color} 
            metalness={0.3} 
            roughness={0.2} 
          />
        </mesh>
      ))}
    </group>
  );
};

const PathCurve = ({ start, end, controlPoint, segments = 20 }) => {
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = Math.pow(1 - t, 2) * start[0] + 2 * (1 - t) * t * controlPoint[0] + Math.pow(t, 2) * end[0];
    const y = Math.pow(1 - t, 2) * start[1] + 2 * (1 - t) * t * controlPoint[1] + Math.pow(t, 2) * end[1];
    const z = Math.pow(1 - t, 2) * start[2] + 2 * (1 - t) * t * controlPoint[2] + Math.pow(t, 2) * end[2];
    points.push(new THREE.Vector3(x, y, z));
  }
  
  const curve = new THREE.CatmullRomCurve3(points);
  const tubeGeometry = new THREE.TubeGeometry(curve, segments, 0.05, 8, false);

  return (
    <mesh>
      <primitive object={tubeGeometry} attach="geometry" />
      <meshStandardMaterial color="#888888" roughness={0.5} metalness={0.2} />
    </mesh>
  );
};

const Board = ({ 
  gameBoard, 
  players, 
  tileSize = 1, 
  spacing = 0.3,
  pathWidth = 0.1,
  boardWidth = 5 
}) => {
  const { camera } = useThree();
  
  // Position camera to see board
  useEffect(() => {
    camera.position.set(5, 8, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  // Calculate positions for tiles in a winding path
  const getTilePosition = (index) => {
    const tilesPerRow = Math.ceil(Math.sqrt(gameBoard.length));
    const totalWidth = tilesPerRow * (tileSize + spacing) - spacing;
    
    let x, z;
    const row = Math.floor(index / tilesPerRow);
    const col = index % tilesPerRow;
    
    // Create a winding path (snake-like)
    if (row % 2 === 0) {
      x = col * (tileSize + spacing) - totalWidth / 2 + tileSize / 2;
    } else {
      x = (tilesPerRow - 1 - col) * (tileSize + spacing) - totalWidth / 2 + tileSize / 2;
    }
    
    z = row * (tileSize + spacing) - totalWidth / 2 + tileSize / 2;
    
    return [x, 0, z];
  };
  
  // Generate connections between tiles
  const connections = [];
  for (let i = 0; i < gameBoard.length - 1; i++) {
    const start = getTilePosition(i);
    const end = getTilePosition(i + 1);
    
    // Create control point for curved path
    const mid = [
      (start[0] + end[0]) / 2,
      0.2, // Slightly raised
      (start[2] + end[2]) / 2
    ];
    
    connections.push(
      <PathCurve 
        key={`path-${i}`}
        start={start}
        end={end}
        controlPoint={mid}
      />
    );
  }
  
  return (
    <group>
      {/* Board base */}
      <mesh receiveShadow position={[0, -0.1, 0]}>
        <boxGeometry args={[boardWidth + 2, 0.1, boardWidth + 2]} />
        <meshStandardMaterial color="#5a4fcf" metalness={0.1} roughness={0.8} />
      </mesh>
      
      {/* Tiles */}
      {gameBoard.map((tile, index) => {
        const position = getTilePosition(index);
        const playersOnTile = players.filter(p => p.position === tile.position);
        
        return (
          <Tile
            key={`tile-${index}`}
            position={position}
            type={tile.type}
            label={tile.label}
            players={playersOnTile}
            tileSize={tileSize}
          />
        );
      })}
      
      {/* Paths between tiles */}
      {connections}
    </group>
  );
};

// Game environment (lighting, etc.)
const Environment = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
    </>
  );
};

// Main 3D game board component
const GameBoard3D = ({ gameBoard, players }) => {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <Environment />
        <Board gameBoard={gameBoard} players={players} />
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.5}
          minDistance={5}
          maxDistance={15}
        />
      </Canvas>
    </div>
  );
};

export default GameBoard3D;
