import type { StageDef } from './maps';
import type { MapEntity } from '../types/MapEntity.type';

// Map 5: Pinball Frenzy
function createPinballFrenzy(): StageDef {
  const entities: MapEntity[] = [
    // Outer Walls
    {
      type: 'static',
      position: { x: 0, y: 0 },
      props: { density: 1, angularVelocity: 0, restitution: 0.2 },
      shape: {
        type: 'polyline',
        rotation: 0,
        color: '#00f0ff',
        bloomColor: '#00f0ff',
        points: [
          [9.25, -300],
          [9.25, 8],
          [2.5, 18],
          [2.5, 98],
          [14.8, 105],
          [14.8, 112],
        ],
      },
    },
    {
      type: 'static',
      position: { x: 0, y: 0 },
      props: { density: 1, angularVelocity: 0, restitution: 0.2 },
      shape: {
        type: 'polyline',
        rotation: 0,
        color: '#00f0ff',
        bloomColor: '#00f0ff',
        points: [
          [16.5, -300],
          [16.5, 8],
          [23.5, 18],
          [23.5, 98],
          [16.2, 105],
          [16.2, 112],
        ],
      },
    },
    // Top Slingshots
    {
      type: 'static',
      position: { x: 5.5, y: 22 },
      shape: { type: 'box', width: 2.2, height: 0.3, rotation: 35, color: '#ff007f', bloomColor: '#ff007f' },
      props: { density: 1, angularVelocity: 0, restitution: 1.8 },
    },
    {
      type: 'static',
      position: { x: 20.5, y: 22 },
      shape: { type: 'box', width: 2.2, height: 0.3, rotation: -35, color: '#ff007f', bloomColor: '#ff007f' },
      props: { density: 1, angularVelocity: 0, restitution: 1.8 },
    },
    // Upper Triangle Bumpers
    {
      type: 'static',
      position: { x: 13, y: 26 },
      shape: { type: 'circle', radius: 1.1, color: '#ff007f', bloomColor: '#ff007f' },
      props: { density: 1, angularVelocity: 0, restitution: 2.0 },
    },
    {
      type: 'static',
      position: { x: 8.5, y: 34 },
      shape: { type: 'circle', radius: 0.9, color: '#00e5ff', bloomColor: '#00e5ff' },
      props: { density: 1, angularVelocity: 0, restitution: 2.0 },
    },
    {
      type: 'static',
      position: { x: 17.5, y: 34 },
      shape: { type: 'circle', radius: 0.9, color: '#00e5ff', bloomColor: '#00e5ff' },
      props: { density: 1, angularVelocity: 0, restitution: 2.0 },
    },
    // Upper Flippers (Kinematic)
    {
      type: 'kinematic',
      position: { x: 8, y: 44 },
      shape: { type: 'box', width: 3.0, height: 0.25, rotation: 0, color: '#ffea00', bloomColor: '#ffea00' },
      props: { density: 1, angularVelocity: 4.2, restitution: 1.2 },
    },
    {
      type: 'kinematic',
      position: { x: 18, y: 44 },
      shape: { type: 'box', width: 3.0, height: 0.25, rotation: 0, color: '#ffea00', bloomColor: '#ffea00' },
      props: { density: 1, angularVelocity: -4.2, restitution: 1.2 },
    },
    // Center 4-way Cross Spinner
    {
      type: 'kinematic',
      position: { x: 13, y: 55 },
      shape: { type: 'box', width: 4.0, height: 0.25, rotation: 0, color: '#ff3366', bloomColor: '#ff3366' },
      props: { density: 1, angularVelocity: 4.8, restitution: 1.0 },
    },
    {
      type: 'kinematic',
      position: { x: 13, y: 55 },
      shape: { type: 'box', width: 0.25, height: 4.0, rotation: 0, color: '#ff3366', bloomColor: '#ff3366' },
      props: { density: 1, angularVelocity: 4.8, restitution: 1.0 },
    },
    // Mid Bumper Row
    {
      type: 'static',
      position: { x: 5.5, y: 65 },
      shape: { type: 'circle', radius: 0.8, color: '#76ff03', bloomColor: '#76ff03' },
      props: { density: 1, angularVelocity: 0, restitution: 1.9 },
    },
    {
      type: 'static',
      position: { x: 10.5, y: 64 },
      shape: { type: 'circle', radius: 0.8, color: '#76ff03', bloomColor: '#76ff03' },
      props: { density: 1, angularVelocity: 0, restitution: 1.9 },
    },
    {
      type: 'static',
      position: { x: 15.5, y: 64 },
      shape: { type: 'circle', radius: 0.8, color: '#76ff03', bloomColor: '#76ff03' },
      props: { density: 1, angularVelocity: 0, restitution: 1.9 },
    },
    {
      type: 'static',
      position: { x: 20.5, y: 65 },
      shape: { type: 'circle', radius: 0.8, color: '#76ff03', bloomColor: '#76ff03' },
      props: { density: 1, angularVelocity: 0, restitution: 1.9 },
    },
    // Angled Mid Slopes
    {
      type: 'static',
      position: { x: 6.5, y: 75 },
      shape: { type: 'box', width: 4.0, height: 0.25, rotation: 25, color: '#d500f9', bloomColor: '#d500f9' },
      props: { density: 1, angularVelocity: 0, restitution: 0.5 },
    },
    {
      type: 'static',
      position: { x: 19.5, y: 75 },
      shape: { type: 'box', width: 4.0, height: 0.25, rotation: -25, color: '#d500f9', bloomColor: '#d500f9' },
      props: { density: 1, angularVelocity: 0, restitution: 0.5 },
    },
    // Lower High-Speed Propellers
    {
      type: 'kinematic',
      position: { x: 9, y: 86 },
      shape: { type: 'box', width: 3.2, height: 0.25, rotation: 0, color: '#00e5ff', bloomColor: '#00e5ff' },
      props: { density: 1, angularVelocity: -5.5, restitution: 1.5 },
    },
    {
      type: 'kinematic',
      position: { x: 17, y: 86 },
      shape: { type: 'box', width: 3.2, height: 0.25, rotation: 0, color: '#00e5ff', bloomColor: '#00e5ff' },
      props: { density: 1, angularVelocity: 5.5, restitution: 1.5 },
    },
    // Bottom Pin Cluster
    {
      type: 'static',
      position: { x: 11.5, y: 96 },
      shape: { type: 'circle', radius: 0.35, color: '#ffea00' },
      props: { density: 1, angularVelocity: 0, restitution: 1.6 },
    },
    {
      type: 'static',
      position: { x: 14.5, y: 96 },
      shape: { type: 'circle', radius: 0.35, color: '#ffea00' },
      props: { density: 1, angularVelocity: 0, restitution: 1.6 },
    },
    {
      type: 'static',
      position: { x: 13, y: 100 },
      shape: { type: 'circle', radius: 0.35, color: '#ffea00' },
      props: { density: 1, angularVelocity: 0, restitution: 1.6 },
    },
  ];

  return {
    title: 'Pinball Frenzy',
    goalY: 110,
    zoomY: 105,
    entities,
  };
}

// Map 6: Cyber Slalom
function createCyberSlalom(): StageDef {
  const entities: MapEntity[] = [
    // Outer Walls
    {
      type: 'static',
      position: { x: 0, y: 0 },
      props: { density: 1, angularVelocity: 0, restitution: 0.1 },
      shape: {
        type: 'polyline',
        rotation: 0,
        color: '#00f5d4',
        bloomColor: '#00f5d4',
        points: [
          [9.25, -300],
          [9.25, 8],
          [3, 16],
          [3, 30],
          [17, 44],
          [3, 58],
          [17, 72],
          [3, 86],
          [10, 98],
          [14.8, 108],
          [14.8, 116],
        ],
      },
    },
    {
      type: 'static',
      position: { x: 0, y: 0 },
      props: { density: 1, angularVelocity: 0, restitution: 0.1 },
      shape: {
        type: 'polyline',
        rotation: 0,
        color: '#7b2cbf',
        bloomColor: '#7b2cbf',
        points: [
          [16.5, -300],
          [16.5, 8],
          [23, 16],
          [9, 30],
          [23, 44],
          [9, 58],
          [23, 72],
          [9, 86],
          [23, 98],
          [16.2, 108],
          [16.2, 116],
        ],
      },
    },
    // Slalom Apex Spinners
    {
      type: 'kinematic',
      position: { x: 6, y: 30 },
      shape: { type: 'box', width: 2.2, height: 0.2, rotation: 0, color: '#fee440', bloomColor: '#fee440' },
      props: { density: 1, angularVelocity: 3.5, restitution: 0.8 },
    },
    {
      type: 'kinematic',
      position: { x: 20, y: 44 },
      shape: { type: 'box', width: 2.2, height: 0.2, rotation: 0, color: '#fee440', bloomColor: '#fee440' },
      props: { density: 1, angularVelocity: -3.5, restitution: 0.8 },
    },
    {
      type: 'kinematic',
      position: { x: 6, y: 58 },
      shape: { type: 'box', width: 2.2, height: 0.2, rotation: 0, color: '#fee440', bloomColor: '#fee440' },
      props: { density: 1, angularVelocity: 3.5, restitution: 0.8 },
    },
    {
      type: 'kinematic',
      position: { x: 20, y: 72 },
      shape: { type: 'box', width: 2.2, height: 0.2, rotation: 0, color: '#fee440', bloomColor: '#fee440' },
      props: { density: 1, angularVelocity: -3.5, restitution: 0.8 },
    },
    {
      type: 'kinematic',
      position: { x: 6, y: 86 },
      shape: { type: 'box', width: 2.2, height: 0.2, rotation: 0, color: '#fee440', bloomColor: '#fee440' },
      props: { density: 1, angularVelocity: 3.5, restitution: 0.8 },
    },
    // Corner Bumper Accents
    {
      type: 'static',
      position: { x: 13, y: 22 },
      shape: { type: 'circle', radius: 0.6, color: '#f72585', bloomColor: '#f72585' },
      props: { density: 1, angularVelocity: 0, restitution: 1.6 },
    },
    {
      type: 'static',
      position: { x: 13, y: 50 },
      shape: { type: 'circle', radius: 0.6, color: '#f72585', bloomColor: '#f72585' },
      props: { density: 1, angularVelocity: 0, restitution: 1.6 },
    },
    {
      type: 'static',
      position: { x: 13, y: 78 },
      shape: { type: 'circle', radius: 0.6, color: '#f72585', bloomColor: '#f72585' },
      props: { density: 1, angularVelocity: 0, restitution: 1.6 },
    },
    // Final Funnel Kinetic Rotors
    {
      type: 'kinematic',
      position: { x: 13, y: 102 },
      shape: { type: 'box', width: 3.5, height: 0.2, rotation: 0, color: '#00f5d4', bloomColor: '#00f5d4' },
      props: { density: 1, angularVelocity: 4.5, restitution: 1.0 },
    },
  ];

  return {
    title: 'Cyber Slalom',
    goalY: 115,
    zoomY: 110,
    entities,
  };
}

// Map 7: Pachinko Vortex
function createPachinkoVortex(): StageDef {
  const entities: MapEntity[] = [
    // Outer Bounds
    {
      type: 'static',
      position: { x: 0, y: 0 },
      props: { density: 1, angularVelocity: 0, restitution: 0.2 },
      shape: {
        type: 'polyline',
        rotation: 0,
        color: '#4cc9f0',
        bloomColor: '#4cc9f0',
        points: [
          [9.25, -300],
          [9.25, 8],
          [2, 16],
          [2, 54],
          [1, 70],
          [3, 86],
          [14.8, 104],
          [14.8, 112],
        ],
      },
    },
    {
      type: 'static',
      position: { x: 0, y: 0 },
      props: { density: 1, angularVelocity: 0, restitution: 0.2 },
      shape: {
        type: 'polyline',
        rotation: 0,
        color: '#4cc9f0',
        bloomColor: '#4cc9f0',
        points: [
          [16.5, -300],
          [16.5, 8],
          [24, 16],
          [24, 54],
          [25, 70],
          [23, 86],
          [16.2, 104],
          [16.2, 112],
        ],
      },
    },
    // Center Splitter Wedge
    {
      type: 'static',
      position: { x: 13, y: 68 },
      shape: {
        type: 'polyline',
        rotation: 0,
        color: '#f72585',
        bloomColor: '#f72585',
        points: [
          [13, 56],
          [11.5, 78],
          [14.5, 78],
          [13, 56],
        ],
      },
      props: { density: 1, angularVelocity: 0, restitution: 0.4 },
    },
    // Left Vortex 4-blade Spinner
    {
      type: 'kinematic',
      position: { x: 6.5, y: 70 },
      shape: { type: 'box', width: 3.6, height: 0.2, rotation: 0, color: '#f72585', bloomColor: '#f72585' },
      props: { density: 1, angularVelocity: 3.8, restitution: 0.8 },
    },
    {
      type: 'kinematic',
      position: { x: 6.5, y: 70 },
      shape: { type: 'box', width: 0.2, height: 3.6, rotation: 0, color: '#f72585', bloomColor: '#f72585' },
      props: { density: 1, angularVelocity: 3.8, restitution: 0.8 },
    },
    // Right Vortex 4-blade Spinner
    {
      type: 'kinematic',
      position: { x: 19.5, y: 70 },
      shape: { type: 'box', width: 3.6, height: 0.2, rotation: 0, color: '#f72585', bloomColor: '#f72585' },
      props: { density: 1, angularVelocity: -3.8, restitution: 0.8 },
    },
    {
      type: 'kinematic',
      position: { x: 19.5, y: 70 },
      shape: { type: 'box', width: 0.2, height: 3.6, rotation: 0, color: '#f72585', bloomColor: '#f72585' },
      props: { density: 1, angularVelocity: -3.8, restitution: 0.8 },
    },
    // Lower Basin Converging Spinners
    {
      type: 'kinematic',
      position: { x: 8.5, y: 92 },
      shape: { type: 'box', width: 3.8, height: 0.2, rotation: 20, color: '#7209b7' },
      props: { density: 1, angularVelocity: 4.2, restitution: 0.5 },
    },
    {
      type: 'kinematic',
      position: { x: 17.5, y: 92 },
      shape: { type: 'box', width: 3.8, height: 0.2, rotation: -20, color: '#7209b7' },
      props: { density: 1, angularVelocity: -4.2, restitution: 0.5 },
    },
  ];

  // Procedural Pachinko Peg Pyramid (y: 16 ~ 52)
  const rows = 8;
  for (let r = 0; r < rows; r++) {
    const y = 16 + r * 4.5;
    const count = 5 + (r % 2 === 1 ? 1 : 0);
    const spacing = 18 / (count + 1);
    for (let c = 1; c <= count; c++) {
      const x = 4 + c * spacing;
      entities.push({
        type: 'static',
        position: { x, y },
        shape: { type: 'circle', radius: 0.22, color: '#ffbe0b', bloomColor: '#ffbe0b' },
        props: { density: 1, angularVelocity: 0, restitution: 1.3 },
      });
    }
  }

  return {
    title: 'Pachinko Vortex',
    goalY: 110,
    zoomY: 105,
    entities,
  };
}

// Map 8: Double Helix
function createDoubleHelix(): StageDef {
  const entities: MapEntity[] = [
    // Outer Walls
    {
      type: 'static',
      position: { x: 0, y: 0 },
      props: { density: 1, angularVelocity: 0, restitution: 0.2 },
      shape: {
        type: 'polyline',
        rotation: 0,
        color: '#3a86ff',
        bloomColor: '#3a86ff',
        points: [
          [9.25, -300],
          [9.25, 8],
          [2, 18],
          [2, 100],
          [14.8, 108],
          [14.8, 114],
        ],
      },
    },
    {
      type: 'static',
      position: { x: 0, y: 0 },
      props: { density: 1, angularVelocity: 0, restitution: 0.2 },
      shape: {
        type: 'polyline',
        rotation: 0,
        color: '#ff006e',
        bloomColor: '#ff006e',
        points: [
          [16.5, -300],
          [16.5, 8],
          [24, 18],
          [24, 100],
          [16.2, 108],
          [16.2, 114],
        ],
      },
    },
    // Top Split Diamond
    {
      type: 'static',
      position: { x: 13, y: 22 },
      shape: { type: 'box', width: 2.2, height: 2.2, rotation: 45, color: '#ffbe0b', bloomColor: '#ffbe0b' },
      props: { density: 1, angularVelocity: 0, restitution: 0.8 },
    },
    // Crossing Ramps (Helix Level 1)
    {
      type: 'static',
      position: { x: 7.5, y: 34 },
      shape: { type: 'box', width: 5.0, height: 0.25, rotation: 25, color: '#3a86ff' },
      props: { density: 1, angularVelocity: 0, restitution: 0.4 },
    },
    {
      type: 'static',
      position: { x: 18.5, y: 34 },
      shape: { type: 'box', width: 5.0, height: 0.25, rotation: -25, color: '#ff006e' },
      props: { density: 1, angularVelocity: 0, restitution: 0.4 },
    },
    // Helix Center Cross Spinners (Level 1)
    {
      type: 'kinematic',
      position: { x: 13, y: 44 },
      shape: { type: 'box', width: 4.2, height: 0.25, rotation: 0, color: '#8338ec', bloomColor: '#8338ec' },
      props: { density: 1, angularVelocity: 4.5, restitution: 1.0 },
    },
    // Crossing Ramps (Helix Level 2)
    {
      type: 'static',
      position: { x: 8, y: 55 },
      shape: { type: 'box', width: 5.5, height: 0.25, rotation: -22, color: '#ff006e' },
      props: { density: 1, angularVelocity: 0, restitution: 0.4 },
    },
    {
      type: 'static',
      position: { x: 18, y: 55 },
      shape: { type: 'box', width: 5.5, height: 0.25, rotation: 22, color: '#3a86ff' },
      props: { density: 1, angularVelocity: 0, restitution: 0.4 },
    },
    // Side Boost Bumpers
    {
      type: 'static',
      position: { x: 4.5, y: 64 },
      shape: { type: 'circle', radius: 0.8, color: '#00f5d4', bloomColor: '#00f5d4' },
      props: { density: 1, angularVelocity: 0, restitution: 2.0 },
    },
    {
      type: 'static',
      position: { x: 21.5, y: 64 },
      shape: { type: 'circle', radius: 0.8, color: '#00f5d4', bloomColor: '#00f5d4' },
      props: { density: 1, angularVelocity: 0, restitution: 2.0 },
    },
    // Helix Center Cross Spinners (Level 2)
    {
      type: 'kinematic',
      position: { x: 13, y: 74 },
      shape: { type: 'box', width: 4.2, height: 0.25, rotation: 0, color: '#8338ec', bloomColor: '#8338ec' },
      props: { density: 1, angularVelocity: -4.5, restitution: 1.0 },
    },
    // Lower Helix Funnel Ramps
    {
      type: 'static',
      position: { x: 7.5, y: 85 },
      shape: { type: 'box', width: 5.0, height: 0.25, rotation: 25, color: '#3a86ff' },
      props: { density: 1, angularVelocity: 0, restitution: 0.4 },
    },
    {
      type: 'static',
      position: { x: 18.5, y: 85 },
      shape: { type: 'box', width: 5.0, height: 0.25, rotation: -25, color: '#ff006e' },
      props: { density: 1, angularVelocity: 0, restitution: 0.4 },
    },
    // Twin Gate Rotors
    {
      type: 'kinematic',
      position: { x: 9.5, y: 96 },
      shape: { type: 'box', width: 3.0, height: 0.2, rotation: 0, color: '#ffbe0b' },
      props: { density: 1, angularVelocity: 5.0, restitution: 0.8 },
    },
    {
      type: 'kinematic',
      position: { x: 16.5, y: 96 },
      shape: { type: 'box', width: 3.0, height: 0.2, rotation: 0, color: '#ffbe0b' },
      props: { density: 1, angularVelocity: -5.0, restitution: 0.8 },
    },
  ];

  return {
    title: 'Double Helix',
    goalY: 112,
    zoomY: 107,
    entities,
  };
}

// Map 9: Sky Castle & Traps
function createSkyCastle(): StageDef {
  const entities: MapEntity[] = [
    // Outer Walls
    {
      type: 'static',
      position: { x: 0, y: 0 },
      props: { density: 1, angularVelocity: 0, restitution: 0.2 },
      shape: {
        type: 'polyline',
        rotation: 0,
        color: '#e0aaff',
        bloomColor: '#e0aaff',
        points: [
          [9.25, -300],
          [9.25, 8],
          [2, 16],
          [2, 98],
          [14.8, 105],
          [14.8, 110],
        ],
      },
    },
    {
      type: 'static',
      position: { x: 0, y: 0 },
      props: { density: 1, angularVelocity: 0, restitution: 0.2 },
      shape: {
        type: 'polyline',
        rotation: 0,
        color: '#e0aaff',
        bloomColor: '#e0aaff',
        points: [
          [16.5, -300],
          [16.5, 8],
          [24, 16],
          [24, 98],
          [16.2, 105],
          [16.2, 110],
        ],
      },
    },
    // Giant 4-Spoke Windmill Rotor
    {
      type: 'kinematic',
      position: { x: 13, y: 48 },
      shape: { type: 'box', width: 6.5, height: 0.25, rotation: 0, color: '#c77dff', bloomColor: '#c77dff' },
      props: { density: 1, angularVelocity: 2.8, restitution: 1.0 },
    },
    {
      type: 'kinematic',
      position: { x: 13, y: 48 },
      shape: { type: 'box', width: 0.25, height: 6.5, rotation: 0, color: '#c77dff', bloomColor: '#c77dff' },
      props: { density: 1, angularVelocity: 2.8, restitution: 1.0 },
    },
    // Castle Tier Ramps
    {
      type: 'static',
      position: { x: 6, y: 64 },
      shape: { type: 'box', width: 4.5, height: 0.3, rotation: 25, color: '#7b2cbf' },
      props: { density: 1, angularVelocity: 0, restitution: 0.4 },
    },
    {
      type: 'static',
      position: { x: 20, y: 64 },
      shape: { type: 'box', width: 4.5, height: 0.3, rotation: -25, color: '#7b2cbf' },
      props: { density: 1, angularVelocity: 0, restitution: 0.4 },
    },
    {
      type: 'static',
      position: { x: 13, y: 74 },
      shape: { type: 'box', width: 5.0, height: 0.3, rotation: 0, color: '#7b2cbf' },
      props: { density: 1, angularVelocity: 0, restitution: 0.4 },
    },
    // Lower Rotating Paddle Gates
    {
      type: 'kinematic',
      position: { x: 8, y: 85 },
      shape: { type: 'box', width: 3.2, height: 0.2, rotation: 0, color: '#ff9e00' },
      props: { density: 1, angularVelocity: -4.0, restitution: 0.8 },
    },
    {
      type: 'kinematic',
      position: { x: 18, y: 85 },
      shape: { type: 'box', width: 3.2, height: 0.2, rotation: 0, color: '#ff9e00' },
      props: { density: 1, angularVelocity: 4.0, restitution: 0.8 },
    },
    // Funnel Entrance Pins
    {
      type: 'static',
      position: { x: 11, y: 96 },
      shape: { type: 'circle', radius: 0.4, color: '#ffea00' },
      props: { density: 1, angularVelocity: 0, restitution: 1.5 },
    },
    {
      type: 'static',
      position: { x: 15, y: 96 },
      shape: { type: 'circle', radius: 0.4, color: '#ffea00' },
      props: { density: 1, angularVelocity: 0, restitution: 1.5 },
    },
  ];

  // Brittle Cloud Breakables (life: 1)
  // Layer 1 (y: 22)
  for (let i = 0; i < 7; i++) {
    entities.push({
      type: 'static',
      position: { x: 4.5 + i * 2.8, y: 22 },
      shape: { type: 'box', width: 1.1, height: 0.3, rotation: 0, color: '#90e0ef', bloomColor: '#90e0ef' },
      props: { density: 1, angularVelocity: 0, restitution: 0.5, life: 1 },
    });
  }

  // Layer 2 (y: 34)
  for (let i = 0; i < 6; i++) {
    entities.push({
      type: 'static',
      position: { x: 5.8 + i * 2.8, y: 34 },
      shape: { type: 'box', width: 1.1, height: 0.3, rotation: 0, color: '#ffd166', bloomColor: '#ffd166' },
      props: { density: 1, angularVelocity: 0, restitution: 0.5, life: 1 },
    });
  }

  return {
    title: 'Sky Castle',
    goalY: 108,
    zoomY: 103,
    entities,
  };
}

// Map 10: Chaos Plinko
function createChaosPlinko(): StageDef {
  const entities: MapEntity[] = [
    // Outer Bounds
    {
      type: 'static',
      position: { x: 0, y: 0 },
      props: { density: 1, angularVelocity: 0, restitution: 0.3 },
      shape: {
        type: 'polyline',
        rotation: 0,
        color: '#ff0055',
        bloomColor: '#ff0055',
        points: [
          [9.25, -300],
          [9.25, 8],
          [1.5, 16],
          [1.5, 88],
          [14.8, 102],
          [14.8, 108],
        ],
      },
    },
    {
      type: 'static',
      position: { x: 0, y: 0 },
      props: { density: 1, angularVelocity: 0, restitution: 0.3 },
      shape: {
        type: 'polyline',
        rotation: 0,
        color: '#00f0ff',
        bloomColor: '#00f0ff',
        points: [
          [16.5, -300],
          [16.5, 8],
          [24.5, 16],
          [24.5, 88],
          [16.2, 102],
          [16.2, 108],
        ],
      },
    },
    // Sweeping Deflectors
    {
      type: 'kinematic',
      position: { x: 7, y: 48 },
      shape: { type: 'box', width: 3.2, height: 0.25, rotation: 0, color: '#ffe600', bloomColor: '#ffe600' },
      props: { density: 1, angularVelocity: 4.8, restitution: 1.2 },
    },
    {
      type: 'kinematic',
      position: { x: 19, y: 48 },
      shape: { type: 'box', width: 3.2, height: 0.25, rotation: 0, color: '#ffe600', bloomColor: '#ffe600' },
      props: { density: 1, angularVelocity: -4.8, restitution: 1.2 },
    },
    // Mid Big Bumper
    {
      type: 'static',
      position: { x: 13, y: 56 },
      shape: { type: 'circle', radius: 1.2, color: '#ff007f', bloomColor: '#ff007f' },
      props: { density: 1, angularVelocity: 0, restitution: 2.2 },
    },
    // Lower 5-Slot Dividers (y: 72 ~ 88)
    {
      type: 'static',
      position: { x: 6, y: 80 },
      shape: { type: 'box', width: 0.2, height: 6.0, rotation: 0, color: '#00f0ff' },
      props: { density: 1, angularVelocity: 0, restitution: 0.2 },
    },
    {
      type: 'static',
      position: { x: 10.5, y: 80 },
      shape: { type: 'box', width: 0.2, height: 6.0, rotation: 0, color: '#00f0ff' },
      props: { density: 1, angularVelocity: 0, restitution: 0.2 },
    },
    {
      type: 'static',
      position: { x: 15.5, y: 80 },
      shape: { type: 'box', width: 0.2, height: 6.0, rotation: 0, color: '#00f0ff' },
      props: { density: 1, angularVelocity: 0, restitution: 0.2 },
    },
    {
      type: 'static',
      position: { x: 20, y: 80 },
      shape: { type: 'box', width: 0.2, height: 6.0, rotation: 0, color: '#00f0ff' },
      props: { density: 1, angularVelocity: 0, restitution: 0.2 },
    },
    // Final Chute Funnel Rotors
    {
      type: 'kinematic',
      position: { x: 13, y: 94 },
      shape: { type: 'box', width: 3.5, height: 0.25, rotation: 0, color: '#ff007f', bloomColor: '#ff007f' },
      props: { density: 1, angularVelocity: 5.5, restitution: 1.0 },
    },
  ];

  // Dense Plinko Peg Grid (y: 16 ~ 42)
  for (let r = 0; r < 7; r++) {
    const y = 16 + r * 3.8;
    const isOdd = r % 2 === 1;
    const count = isOdd ? 7 : 8;
    const startX = isOdd ? 4.5 : 3.2;
    const stepX = isOdd ? 2.8 : 2.8;
    for (let c = 0; c < count; c++) {
      entities.push({
        type: 'static',
        position: { x: startX + c * stepX, y },
        shape: { type: 'circle', radius: 0.22, color: '#00f0ff', bloomColor: '#00f0ff' },
        props: { density: 1, angularVelocity: 0, restitution: 1.5 },
      });
    }
  }

  return {
    title: 'Chaos Plinko',
    goalY: 106,
    zoomY: 101,
    entities,
  };
}

export const newStages: StageDef[] = [
  createPinballFrenzy(),
  createCyberSlalom(),
  createPachinkoVortex(),
  createDoubleHelix(),
  createSkyCastle(),
  createChaosPlinko(),
];
