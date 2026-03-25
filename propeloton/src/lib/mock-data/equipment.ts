import { Equipment } from '@/types';

export const equipment: Equipment[] = [
  // Road Bikes
  { id: 'e1', type: 'road_bike', brand: 'Specialized', model: 'S-Works Tarmac SL8', serialNumber: 'SPZ-2026-001', assignedTo: 'm2', condition: 'excellent', lastService: '2026-03-01', purchaseDate: '2025-12-01', weight: 6800 },
  { id: 'e2', type: 'road_bike', brand: 'Specialized', model: 'S-Works Tarmac SL8', serialNumber: 'SPZ-2026-002', assignedTo: 'm1', condition: 'excellent', lastService: '2026-03-01', purchaseDate: '2025-12-01', weight: 6850 },
  { id: 'e3', type: 'road_bike', brand: 'Specialized', model: 'S-Works Tarmac SL8', serialNumber: 'SPZ-2026-003', assignedTo: 'm3', condition: 'good', lastService: '2026-02-15', purchaseDate: '2025-12-01', weight: 6900 },
  { id: 'e4', type: 'road_bike', brand: 'Specialized', model: 'S-Works Tarmac SL8', serialNumber: 'SPZ-2026-004', assignedTo: 'm4', condition: 'excellent', lastService: '2026-03-05', purchaseDate: '2025-12-01', weight: 7100 },
  { id: 'e5', type: 'road_bike', brand: 'Specialized', model: 'S-Works Tarmac SL8', serialNumber: 'SPZ-2026-005', assignedTo: 'm5', condition: 'good', lastService: '2026-02-20', purchaseDate: '2025-12-01', weight: 7000 },
  { id: 'e6', type: 'road_bike', brand: 'Specialized', model: 'S-Works Tarmac SL8', serialNumber: 'SPZ-2026-006', assignedTo: 'm6', condition: 'excellent', lastService: '2026-03-01', purchaseDate: '2025-12-01', weight: 6950 },
  { id: 'e7', type: 'road_bike', brand: 'Specialized', model: 'S-Works Tarmac SL8', serialNumber: 'SPZ-2026-007', assignedTo: 'm7', condition: 'excellent', lastService: '2026-03-10', purchaseDate: '2026-01-15', weight: 7050 },
  { id: 'e8', type: 'road_bike', brand: 'Specialized', model: 'S-Works Tarmac SL8', serialNumber: 'SPZ-2026-008', assignedTo: 'm8', condition: 'good', lastService: '2026-02-10', purchaseDate: '2025-12-01', weight: 6800 },
  { id: 'e9', type: 'road_bike', brand: 'Specialized', model: 'S-Works Tarmac SL8', serialNumber: 'SPZ-2026-009', assignedTo: 'm11', condition: 'excellent', lastService: '2026-03-01', purchaseDate: '2025-12-01', weight: 6900 },
  { id: 'e10', type: 'road_bike', brand: 'Specialized', model: 'S-Works Tarmac SL8', serialNumber: 'SPZ-2026-010', assignedTo: null, condition: 'good', lastService: '2026-01-15', purchaseDate: '2025-12-01', weight: 6950, notes: 'Spare team bike' },
  { id: 'e11', type: 'road_bike', brand: 'Specialized', model: 'Tarmac SL8 Pro', serialNumber: 'SPZ-2026-011', assignedTo: 'm9', condition: 'excellent', lastService: '2026-03-05', purchaseDate: '2026-01-15', weight: 7200 },
  { id: 'e12', type: 'road_bike', brand: 'Specialized', model: 'Tarmac SL8 Pro', serialNumber: 'SPZ-2026-012', assignedTo: 'm10', condition: 'good', lastService: '2026-02-20', purchaseDate: '2026-01-15', weight: 7250 },
  { id: 'e13', type: 'road_bike', brand: 'Specialized', model: 'Tarmac SL8 Pro', serialNumber: 'SPZ-2026-013', assignedTo: 'm12', condition: 'excellent', lastService: '2026-03-08', purchaseDate: '2026-01-15', weight: 7150 },
  { id: 'e14', type: 'road_bike', brand: 'Specialized', model: 'Tarmac SL8 Pro', serialNumber: 'SPZ-2026-014', assignedTo: 'm13', condition: 'excellent', lastService: '2026-03-08', purchaseDate: '2026-01-15', weight: 7100 },
  { id: 'e15', type: 'road_bike', brand: 'Specialized', model: 'Tarmac SL8 Pro', serialNumber: 'SPZ-2026-015', assignedTo: 'm14', condition: 'needs-service', lastService: '2025-12-10', purchaseDate: '2025-12-01', weight: 7300, notes: 'Rear derailleur alignment needed' },
  { id: 'e16', type: 'road_bike', brand: 'Specialized', model: 'Tarmac SL8 Pro', serialNumber: 'SPZ-2026-016', assignedTo: 'm15', condition: 'good', lastService: '2026-02-25', purchaseDate: '2025-12-01', weight: 7200 },
  { id: 'e17', type: 'road_bike', brand: 'Specialized', model: 'Tarmac SL8 Pro', serialNumber: 'SPZ-2026-017', assignedTo: 'm16', condition: 'excellent', lastService: '2026-03-10', purchaseDate: '2026-01-15', weight: 7400 },
  { id: 'e18', type: 'road_bike', brand: 'Specialized', model: 'Tarmac SL8 Pro', serialNumber: 'SPZ-2026-018', assignedTo: 'm17', condition: 'good', lastService: '2026-02-15', purchaseDate: '2025-12-01', weight: 7350 },
  { id: 'e19', type: 'road_bike', brand: 'Specialized', model: 'Tarmac SL8 Pro', serialNumber: 'SPZ-2026-019', assignedTo: 'm18', condition: 'excellent', lastService: '2026-03-01', purchaseDate: '2026-01-15', weight: 7100 },
  { id: 'e20', type: 'road_bike', brand: 'Specialized', model: 'Tarmac SL8 Pro', serialNumber: 'SPZ-2026-020', assignedTo: 'm20', condition: 'excellent', lastService: '2026-03-10', purchaseDate: '2026-01-15', weight: 7050 },
  // TT Bikes
  { id: 'e21', type: 'tt_bike', brand: 'Specialized', model: 'S-Works Shiv TT', serialNumber: 'SPZ-TT-001', assignedTo: 'm2', condition: 'excellent', lastService: '2026-02-28', purchaseDate: '2025-10-01', weight: 7600 },
  { id: 'e22', type: 'tt_bike', brand: 'Specialized', model: 'S-Works Shiv TT', serialNumber: 'SPZ-TT-002', assignedTo: 'm1', condition: 'excellent', lastService: '2026-02-28', purchaseDate: '2025-10-01', weight: 7650 },
  { id: 'e23', type: 'tt_bike', brand: 'Specialized', model: 'S-Works Shiv TT', serialNumber: 'SPZ-TT-003', assignedTo: 'm9', condition: 'good', lastService: '2026-01-20', purchaseDate: '2025-10-01', weight: 7700 },
  { id: 'e24', type: 'tt_bike', brand: 'Specialized', model: 'S-Works Shiv TT', serialNumber: 'SPZ-TT-004', assignedTo: null, condition: 'good', lastService: '2026-01-15', purchaseDate: '2025-10-01', weight: 7650, notes: 'Team spare TT bike' },
  // Wheel Sets
  { id: 'e25', type: 'wheel', brand: 'Roval', model: 'Rapide CLX II 64', serialNumber: 'RVL-001', assignedTo: 'm2', condition: 'excellent', lastService: '2026-03-05', purchaseDate: '2025-12-01', weight: 1420, notes: 'Race wheels — climbing stages' },
  { id: 'e26', type: 'wheel', brand: 'Roval', model: 'Alpinist CLX II', serialNumber: 'RVL-002', assignedTo: 'm1', condition: 'excellent', lastService: '2026-03-05', purchaseDate: '2025-12-01', weight: 1330, notes: 'Ultra-light — mountain finishes' },
  { id: 'e27', type: 'wheel', brand: 'Roval', model: 'Rapide CLX II 64', serialNumber: 'RVL-003', assignedTo: 'm3', condition: 'good', lastService: '2026-02-18', purchaseDate: '2025-12-01', weight: 1420 },
  { id: 'e28', type: 'wheel', brand: 'Roval', model: 'Rapide CLX II 51', serialNumber: 'RVL-004', assignedTo: 'm4', condition: 'excellent', lastService: '2026-03-05', purchaseDate: '2025-12-01', weight: 1380, notes: 'Cobblestone setup' },
  { id: 'e29', type: 'wheel', brand: 'Roval', model: 'Rapide CLX II 64', serialNumber: 'RVL-005', assignedTo: 'm6', condition: 'good', lastService: '2026-02-25', purchaseDate: '2025-12-01', weight: 1420 },
  { id: 'e30', type: 'wheel', brand: 'Roval', model: 'Rapide CLX II 64', serialNumber: 'RVL-006', assignedTo: null, condition: 'excellent', lastService: '2026-03-01', purchaseDate: '2025-12-01', weight: 1420, notes: 'Neutral service spare' },
  { id: 'e31', type: 'wheel', brand: 'Roval', model: 'CLX 50 Disc', serialNumber: 'RVL-007', assignedTo: null, condition: 'needs-service', lastService: '2025-11-10', purchaseDate: '2025-06-01', weight: 1450, notes: 'Bearing replacement required' },
  // Components
  { id: 'e32', type: 'component', brand: 'SRAM', model: 'Red eTap AXS 12sp', serialNumber: 'SRAM-001', assignedTo: 'm2', condition: 'excellent', lastService: '2026-03-01', purchaseDate: '2025-12-01', notes: 'Groupset' },
  { id: 'e33', type: 'component', brand: 'SRAM', model: 'Red eTap AXS 12sp', serialNumber: 'SRAM-002', assignedTo: 'm1', condition: 'excellent', lastService: '2026-03-01', purchaseDate: '2025-12-01', notes: 'Groupset' },
  { id: 'e34', type: 'component', brand: 'Garmin', model: 'Edge 1040 Solar', serialNumber: 'GRM-001', assignedTo: 'm2', condition: 'excellent', lastService: '2026-01-01', purchaseDate: '2025-09-01', notes: 'GPS computer' },
  { id: 'e35', type: 'component', brand: 'Garmin', model: 'Edge 1040 Solar', serialNumber: 'GRM-002', assignedTo: 'm1', condition: 'excellent', lastService: '2026-01-01', purchaseDate: '2025-09-01', notes: 'GPS computer' },
];
