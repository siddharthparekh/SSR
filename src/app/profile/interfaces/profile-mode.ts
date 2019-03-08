export enum AccessMode {
   Directory,
   Ranking,
}

export enum AccessLevel {
   None,
   Essential,
   Advanced,
   Analytic,
   Owner,
}

export interface Access {
   mode: AccessMode,
   level: AccessLevel,
}

export interface ProfileMode {
   accessMode: AccessMode;
   identifier: number | string;
}

export interface Privacy {
   profile: boolean,
   irj: boolean
}
