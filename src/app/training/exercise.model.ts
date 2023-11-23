export interface Exercise {
    id: string;
    name: string;
    durationSeconds: number;
    calories: number;
    date?: Date;
    state?: 'completed' | 'cancelled' | null;
}