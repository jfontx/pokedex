import { describe, it, expect } from 'vitest';
import { parseEvolutionChain, countEvolutionNodes } from './evolutionParser';
import type { EvolutionChainResponse } from '../types/api';

describe('evolutionParser', () => {
  describe('parseEvolutionChain', () => {
    it('parses a linear evolution chain', () => {
      const mockApiData: EvolutionChainResponse = {
        id: 1,
        chain: {
          is_baby: false,
          species: { name: 'bulbasaur', url: 'url/1' },
          evolution_details: [],
          evolves_to: [
            {
              is_baby: false,
              species: { name: 'ivysaur', url: 'url/2' },
              evolution_details: [{ min_level: 16, trigger: { name: 'level-up' } }] as any,
              evolves_to: [
                {
                  is_baby: false,
                  species: { name: 'venusaur', url: 'url/3' },
                  evolution_details: [{ min_level: 32, trigger: { name: 'level-up' } }] as any,
                  evolves_to: [],
                }
              ]
            }
          ]
        }
      };

      const result = parseEvolutionChain(mockApiData.chain);
      
      expect(result.speciesName).toBe('bulbasaur');
      expect(result.children).toHaveLength(1);
      expect(result.children[0].speciesName).toBe('ivysaur');
      expect(result.children[0].trigger).toBe('Level Up');
      expect(result.children[0].triggerDetail).toBe('Level 16');
      
      expect(result.children[0].children).toHaveLength(1);
      expect(result.children[0].children[0].speciesName).toBe('venusaur');
    });

    it('parses branching evolutions', () => {
      const mockApiData: EvolutionChainResponse = {
        id: 2,
        chain: {
          is_baby: false,
          species: { name: 'eevee', url: 'url/133' },
          evolution_details: [],
          evolves_to: [
            {
              is_baby: false,
              species: { name: 'vaporeon', url: 'url/134' },
              evolution_details: [{ item: { name: 'water-stone' }, trigger: { name: 'use-item' } }] as any,
              evolves_to: [],
            },
            {
              is_baby: false,
              species: { name: 'jolteon', url: 'url/135' },
              evolution_details: [{ item: { name: 'thunder-stone' }, trigger: { name: 'use-item' } }] as any,
              evolves_to: [],
            }
          ]
        }
      };

      const result = parseEvolutionChain(mockApiData.chain);
      
      expect(result.children).toHaveLength(2);
      expect(result.children[0].speciesName).toBe('vaporeon');
      expect(result.children[0].trigger).toBe('Use Item');
      expect(result.children[0].triggerDetail).toBe('Water Stone');

      expect(result.children[1].speciesName).toBe('jolteon');
      expect(result.children[1].trigger).toBe('Use Item');
      expect(result.children[1].triggerDetail).toBe('Thunder Stone');
    });
  });

  describe('countEvolutionNodes', () => {
    it('returns the correct number of nodes', () => {
      const tree = {
        speciesName: 'bulbasaur',
        spriteUrl: '',
        trigger: null,
        triggerDetail: null,
        children: [
          {
            speciesName: 'ivysaur',
            spriteUrl: '',
            trigger: null,
            triggerDetail: null,
            children: [
              {
                speciesName: 'venusaur',
                spriteUrl: '',
                trigger: null,
                triggerDetail: null,
                children: []
              }
            ]
          }
        ]
      };

      expect(countEvolutionNodes(tree)).toBe(3);
    });
  });
});
