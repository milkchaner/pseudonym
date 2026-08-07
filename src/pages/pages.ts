export interface GameData {
    words: string[];

    // index of the team (for the future)
    // 0 = team one, 1 = team two, ...
    turn: number;
}

export interface ScoreData {
    turn: number;
    score: number;
    words: string[];
}

export type PseudonymPage =
    | { kind: "menu" }
    | { kind: "game"; game: GameData }
    | { kind: 'leaderboard', score: ScoreData }
    | { kind: "settings" };
