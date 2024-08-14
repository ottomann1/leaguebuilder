type RerollPoints = {
  currentPoints: number;
  maxRolls: number;
  numberOfRolls: number;
  pointsCostToRoll: number;
  pointsToReroll: number;
};

type Summoner = {
  accountId: number;
  displayName: string;
  gameName: string;
  internalName: string;
  nameChangeFlag: boolean;
  percentCompleteForNextLevel: number;
  privacy: string;
  profileIconId: number;
  puuid: string;
  rerollPoints: RerollPoints;
  summonerId: number;
  summonerLevel: number;
  tagLine: string;
  unnamed: boolean;
  xpSinceLastLevel: number;
  xpUntilNextLevel: number;
};

// Represents an ability of the player
type Ability = {
  abilityLevel?: number;
  displayName: string;
  id: string;
  rawDescription: string;
  rawDisplayName: string;
};

// Represents the champion stats for a player
type ChampionStats = {
  abilityHaste: number;
  abilityPower: number;
  armor: number;
  armorPenetrationFlat: number;
  armorPenetrationPercent: number;
  attackDamage: number;
  attackRange: number;
  attackSpeed: number;
  bonusArmorPenetrationPercent: number;
  bonusMagicPenetrationPercent: number;
  critChance: number;
  critDamage: number;
  currentHealth: number;
  healShieldPower: number;
  healthRegenRate: number;
  lifeSteal: number;
  magicLethality: number;
  magicPenetrationFlat: number;
  magicPenetrationPercent: number;
  magicResist: number;
  maxHealth: number;
  moveSpeed: number;
  omnivamp: number;
  physicalLethality: number;
  physicalVamp: number;
  resourceMax: number;
  resourceRegenRate: number;
  resourceType: string;
  resourceValue: number;
  spellVamp: number;
  tenacity: number;
};

type DDChampionStats = {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
};

type DDChampionInfo = {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
};

type DDChampionImage = {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

type DDChampion = {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: DDChampionInfo;
  image: DDChampionImage;
  tags: string[];
  partype: string;
  stats: DDChampionStats;
};

// Represents a single rune
type Rune = {
  id: number;
  displayName: string;
  rawDescription: string;
  rawDisplayName: string;
};

// Represents the rune setup for a player
type FullRunes = {
  generalRunes: Rune[];
  keystone: Rune;
  primaryRuneTree: Rune;
  secondaryRuneTree: Rune;
  statRunes: Rune[];
};

// Represents an item
type Item = {
  itemID: number;
  count: number;
};

type DDItem = {
  id: number;
  name: string;
  description: string;
  colloq: string;
  plaintext: string;
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  gold: {
    base: number;
    purchasable: boolean;
    total: number;
    sell: number;
  };
  tags: string[];
  maps: {
    [key: string]: boolean;
  };
  stats: {
    FlatHPPoolMod?: number;
    FlatPhysicalDamageMod?: number;
    FlatArmorMod?: number;
    PercentAttackSpeedMod?: number;
    PercentLifeStealMod?: number;
    [key: string]: number | undefined; // Accommodates any additional stats
  };
  effect?: {
    [key: string]: string; // For effects like "Effect1Amount", "Effect2Amount", etc.
  };
};

// Represents the active player
type ActivePlayer = {
  abilities: {
    E: Ability;
    Passive: Ability;
    Q: Ability;
    R: Ability;
    W: Ability;
  };
  championStats: ChampionStats;
  currentGold: number;
  fullRunes: FullRunes;
  level: number;
  riotId: string;
  riotIdGameName: string;
  riotIdTagLine: string;
  summonerName: string;
  teamRelativeColors: boolean;
};

// Represents the score data for a player
type Scores = {
  assists: number;
  creepScore: number;
  deaths: number;
  kills: number;
  wardScore: number;
};

// Represents a player in the game
type Player = {
  championName: string;
  isBot: boolean;
  isDead: boolean;
  items: Item[];
  level: number;
  position: string;
  rawChampionName: string;
  rawSkinName?: string;
  respawnTimer: number;
  riotId: string;
  riotIdGameName: string;
  riotIdTagLine: string;
  runes: FullRunes;
  scores: Scores;
  skinID?: number;
  skinName?: string;
  summonerName: string;
  summonerSpells: {
    summonerSpellOne: Ability;
    summonerSpellTwo: Ability;
  };
  team: string;
};

// Represents the game data
type GameData = {
  gameMode: string;
  gameTime: number;
  mapName: string;
  mapNumber: number;
  mapTerrain: string;
};

// Represents an event in the game
type GameEvent = {
  EventID: number;
  EventName: string;
  EventTime: number;
  Assisters?: string[];
  KillerName?: string;
  TurretKilled?: string;
};

// Represents the entire match data structure
type MatchData = {
  activePlayer: ActivePlayer;
  allPlayers: Player[];
  events: {
    Events: GameEvent[];
  };
  gameData: GameData;
};
