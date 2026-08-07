import { GameCache } from "./cache.ts"

export interface Team {
    teamName: string;
    score: number;
}

class TeamsData {
    public score: [number, number] = [0, 0];

    get length() { return 2; }

    get teams(): Team[] {
        return [
            { teamName: GameCache.teamOneName, score: this.score[0] },
            { teamName: GameCache.teamTwoName, score: this.score[1] },
        ];
    }
}

export const GameTeams = new TeamsData();
