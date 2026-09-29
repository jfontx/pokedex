import { describe, it, expect } from 'vitest';
import { computeTypeMatchups } from './typeEffectiveness';
import type { TypeRelations } from '../types/api';

describe('computeTypeMatchups', () => {
  it('computes basic weaknesses and resistances for a single type', () => {
    const fireRelations: TypeRelations = {
      double_damage_from: [{ name: 'water', url: '' }, { name: 'ground', url: '' }, { name: 'rock', url: '' }],
      double_damage_to: [],
      half_damage_from: [{ name: 'fire', url: '' }, { name: 'grass', url: '' }, { name: 'ice', url: '' }, { name: 'bug', url: '' }, { name: 'steel', url: '' }, { name: 'fairy', url: '' }],
      half_damage_to: [],
      no_damage_from: [],
      no_damage_to: [],
    };

    const result = computeTypeMatchups([fireRelations]);
    
    expect(result.quadrupleWeaknesses).toHaveLength(0);
    expect(result.doubleWeaknesses).toEqual(expect.arrayContaining(['water', 'ground', 'rock']));
    expect(result.halfResistances).toEqual(expect.arrayContaining(['fire', 'grass', 'ice', 'bug', 'steel', 'fairy']));
    expect(result.quarterResistances).toHaveLength(0);
    expect(result.immunities).toHaveLength(0);
  });

  it('combines multipliers for dual types', () => {
    const fireRelations: TypeRelations = {
      double_damage_from: [{ name: 'water', url: '' }, { name: 'ground', url: '' }, { name: 'rock', url: '' }],
      double_damage_to: [],
      half_damage_from: [{ name: 'fire', url: '' }, { name: 'grass', url: '' }, { name: 'ice', url: '' }, { name: 'bug', url: '' }, { name: 'steel', url: '' }, { name: 'fairy', url: '' }],
      half_damage_to: [],
      no_damage_from: [],
      no_damage_to: [],
    };

    const flyingRelations: TypeRelations = {
      double_damage_from: [{ name: 'electric', url: '' }, { name: 'ice', url: '' }, { name: 'rock', url: '' }],
      double_damage_to: [],
      half_damage_from: [{ name: 'grass', url: '' }, { name: 'fighting', url: '' }, { name: 'bug', url: '' }],
      half_damage_to: [],
      no_damage_from: [{ name: 'ground', url: '' }],
      no_damage_to: [],
    };

    const result = computeTypeMatchups([fireRelations, flyingRelations]);
    
    // Rock is 2x against Fire and 2x against Flying -> 4x
    expect(result.quadrupleWeaknesses).toContain('rock');
    
    // Grass is 0.5x against Fire and 0.5x against Flying -> 0.25x
    expect(result.quarterResistances).toContain('grass');
    expect(result.quarterResistances).toContain('bug');
    
    // Ice is 2x against Flying and 0.5x against Fire -> 1x (neutral, so it shouldn't be in weaknesses or resistances)
    expect(result.doubleWeaknesses).not.toContain('ice');
    expect(result.halfResistances).not.toContain('ice');

    // Ground is immune against Flying, regardless of Fire
    expect(result.immunities).toContain('ground');
  });
});
