// src/lib/gameEngine.ts

// Define basic NFT stack structure
export interface NFTStack {
    id: number;
    name: string;
    hp: number;
    melee: number;
    ranged: number;
    speed: number;
    cost: number;
    gridPosition: number; // 1-8
    movementCommand: 'Attack Melee' | 'Attack Ranged' | 'Hold Ground';
    targetCommand:
      | 'Highest HP'
      | 'Lowest HP'
      | 'Highest Melee'
      | 'Lowest Melee'
      | 'Highest Ranged'
      | 'Lowest Ranged'
      | 'Highest Speed'
      | 'Lowest Speed';
    isAttacker: boolean;
  }
  
  // Define each grid cell
  interface GridCell {
    stacks: NFTStack[];
    occupiedBy: 'attacker' | 'defender' | null;
  }
  
  // Define the game state
  export interface GameState {
    grid: GridCell[];
    round: number;
  }
  
  // Initialize the grid
  export function initializeGame(attackerStacks: NFTStack[], defenderStacks: NFTStack[]): GameState {
    const grid: GridCell[] = Array.from({ length: 8 }, () => ({ stacks: [], occupiedBy: null }));
  
    // Assign attacker stacks to grid 1
    attackerStacks.forEach((stack) => {
      stack.gridPosition = 1;
      stack.isAttacker = true;
      grid[0].stacks.push(stack);
      grid[0].occupiedBy = 'attacker';
    });
  
    // Assign defender stacks to grid 8
    defenderStacks.forEach((stack) => {
      stack.gridPosition = 8;
      stack.isAttacker = false;
      grid[7].stacks.push(stack);
      grid[7].occupiedBy = 'defender';
    });
  
    return { grid, round: 1 };
  }
  
  // Determine next action based on command
  function advanceStack(stack: NFTStack, state: GameState) {
    if (stack.movementCommand === 'Hold Ground') return;
  
    const currentPos = stack.gridPosition - 1;
    const nextPos = stack.isAttacker ? currentPos + 1 : currentPos - 1;
  
    if (nextPos < 0 || nextPos > 7) return;
  
    const nextCell = state.grid[nextPos];
  
    if (nextCell.occupiedBy === null || nextCell.occupiedBy === (stack.isAttacker ? 'attacker' : 'defender')) {
      state.grid[currentPos].stacks = state.grid[currentPos].stacks.filter(s => s.id !== stack.id);
      if (state.grid[currentPos].stacks.length === 0) state.grid[currentPos].occupiedBy = null;
  
      nextCell.stacks.push(stack);
      nextCell.occupiedBy = stack.isAttacker ? 'attacker' : 'defender';
      stack.gridPosition = nextPos + 1;
    }
  }
  
  // Combat handling
  function handleCombat(attackerStack: NFTStack, defenderStack: NFTStack, isRanged: boolean) {
    const damage = isRanged ? attackerStack.ranged : attackerStack.melee;
    defenderStack.hp -= damage;
  }
  
  // Select target based on command
  function selectTarget(attackingStack: NFTStack, enemyStacks: NFTStack[]): NFTStack | null {
    if (enemyStacks.length === 0) return null;
  
    const command = attackingStack.targetCommand;
    const comparator = command.includes('Lowest') ? (a: number, b: number) => a - b : (a: number, b: number) => b - a;
    const stat = command.split(' ')[1].toLowerCase();
  
    return enemyStacks.sort((a, b) => comparator(a[stat as keyof NFTStack] as number, b[stat as keyof NFTStack] as number))[0];
  }
  
  // Execute a single round of the game
  export function executeRound(state: GameState): GameState {
    const allStacks = state.grid.flatMap(cell => cell.stacks);
    allStacks.sort((a, b) => b.speed - a.speed);
  
    allStacks.forEach(stack => {
      if (stack.hp <= 0) return;
  
      const pos = stack.gridPosition - 1;
      const enemyPos = stack.isAttacker ? pos + 1 : pos - 1;
  
      if (enemyPos < 0 || enemyPos > 7) return;
  
      const enemyCell = state.grid[enemyPos];
  
      if (enemyCell.occupiedBy && enemyCell.occupiedBy !== (stack.isAttacker ? 'attacker' : 'defender')) {
        // Engage combat
        const target = selectTarget(stack, enemyCell.stacks);
        if (target) {
          const isRanged = stack.movementCommand === 'Attack Ranged';
          handleCombat(stack, target, isRanged);
          if (target.hp <= 0) {
            enemyCell.stacks = enemyCell.stacks.filter(s => s.id !== target.id);
            if (enemyCell.stacks.length === 0) enemyCell.occupiedBy = null;
          }
        }
      } else {
        // Advance if no enemy adjacent
        advanceStack(stack, state);
      }
    });
  
    state.round += 1;
    return state;
  }
  
  // Check victory conditions
  export function checkVictory(state: GameState): 'attacker' | 'defender' | 'ongoing' {
    const attackerExists = state.grid.some(cell => cell.stacks.some(stack => stack.isAttacker && stack.hp > 0));
    const defenderExists = state.grid.some(cell => cell.stacks.some(stack => !stack.isAttacker && stack.hp > 0));
  
    if (!defenderExists) return 'attacker';
    if (!attackerExists || state.round > 16) return 'defender';
  
    return 'ongoing';
  }
  