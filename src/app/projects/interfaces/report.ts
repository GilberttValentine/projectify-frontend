export interface Report {
  readonly userId?: string;
  readonly projectId?: string;
  readonly dedication: {
    hours: number;
    minutes: number;
  };
  readonly weekNumber?: number;
  readonly status?: boolean;
  readonly createdAt?: Date;
}
