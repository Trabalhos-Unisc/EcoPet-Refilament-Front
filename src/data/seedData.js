/**
 * Seed data matching Main.java demo data.
 * Loaded on first run when localStorage is empty.
 */

import {
  SEED_GARRAFAS,
  SEED_LOTES,
  SEED_PROCESSOS,
  SEED_ESTOQUE,
} from './seedConstants';

export { SEED_GARRAFAS, SEED_LOTES, SEED_PROCESSOS, SEED_ESTOQUE };

/**
 * Check and load seed data directly into localStorage BEFORE React mounts.
 * This avoids StrictMode double-render issues.
 */
export function ensureSeedData() {
  if (!localStorage.getItem('ecopet_garrafas')) {
    localStorage.setItem('ecopet_garrafas', JSON.stringify(SEED_GARRAFAS));
    localStorage.setItem('ecopet_lotes', JSON.stringify(SEED_LOTES));
    localStorage.setItem('ecopet_processos', JSON.stringify(SEED_PROCESSOS));
    localStorage.setItem('ecopet_estoque', JSON.stringify(SEED_ESTOQUE));
  }
}
