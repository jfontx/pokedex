import type { ChainLink, EvolutionNode } from '../types';
import { extractIdFromUrl, formatName } from './formatters';

/**
 * Parse the recursive chain link structure into a flat-ish EvolutionNode tree.
 * Handles branching evolutions (e.g. Eevee).
 */
export function parseEvolutionChain(chain: ChainLink): EvolutionNode {
  const speciesId = extractIdFromUrl(chain.species.url);

  const triggerInfo = getTriggerInfo(chain);

  return {
    speciesName: chain.species.name,
    spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${speciesId}.png`,
    trigger: triggerInfo.trigger,
    triggerDetail: triggerInfo.detail,
    children: chain.evolves_to.map(child => parseEvolutionChain(child)),
  };
}

function getTriggerInfo(chain: ChainLink): { trigger: string | null; detail: string | null } {
  if (chain.evolution_details.length === 0) {
    return { trigger: null, detail: null };
  }

  // Take the first evolution detail (most common path)
  const detail = chain.evolution_details[0];
  if (!detail) return { trigger: null, detail: null };

  const trigger = detail.trigger.name;

  switch (trigger) {
    case 'level-up': {
      if (detail.min_level) return { trigger: 'Level Up', detail: `Level ${detail.min_level}` };
      if (detail.min_happiness) return { trigger: 'Level Up', detail: `Happiness ≥ ${detail.min_happiness}` };
      if (detail.min_affection) return { trigger: 'Level Up', detail: `Affection ≥ ${detail.min_affection}` };
      if (detail.known_move) return { trigger: 'Level Up', detail: `Knowing ${formatName(detail.known_move.name)}` };
      if (detail.known_move_type) return { trigger: 'Level Up', detail: `Knowing ${formatName(detail.known_move_type.name)}-type move` };
      if (detail.location) return { trigger: 'Level Up', detail: `At ${formatName(detail.location.name)}` };
      if (detail.time_of_day) return { trigger: 'Level Up', detail: `During ${detail.time_of_day}` };
      if (detail.held_item) return { trigger: 'Level Up', detail: `Holding ${formatName(detail.held_item.name)}` };
      return { trigger: 'Level Up', detail: null };
    }
    case 'trade': {
      if (detail.held_item) return { trigger: 'Trade', detail: `Holding ${formatName(detail.held_item.name)}` };
      if (detail.trade_species) return { trigger: 'Trade', detail: `For ${formatName(detail.trade_species.name)}` };
      return { trigger: 'Trade', detail: null };
    }
    case 'use-item': {
      if (detail.item) return { trigger: 'Use Item', detail: formatName(detail.item.name) };
      return { trigger: 'Use Item', detail: null };
    }
    default:
      return { trigger: formatName(trigger), detail: null };
  }
}

/** Count the total number of nodes in the evolution tree. */
export function countEvolutionNodes(node: EvolutionNode): number {
  let count = 1;
  for (const child of node.children) {
    count += countEvolutionNodes(child);
  }
  return count;
}
