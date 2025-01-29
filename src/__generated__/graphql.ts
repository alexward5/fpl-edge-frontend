/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Player = {
  __typename?: 'Player';
  fbref_team: Scalars['String']['output'];
  fpl_player_code: Scalars['Int']['output'];
  fpl_player_cost: Scalars['Float']['output'];
  fpl_player_id: Scalars['String']['output'];
  fpl_player_position: Scalars['String']['output'];
  fpl_selected_by_percent: Scalars['Float']['output'];
  fpl_web_name: Scalars['String']['output'];
  player_gameweek_data: Array<PlayerGameweekData>;
};


export type PlayerPlayer_Gameweek_DataArgs = {
  gameweekEnd?: InputMaybe<Scalars['Int']['input']>;
  gameweekStart?: InputMaybe<Scalars['Int']['input']>;
};

export type PlayerGameweekData = {
  __typename?: 'PlayerGameweekData';
  calc_fpl_npxp: Scalars['Float']['output'];
  fbref_npxg: Scalars['Float']['output'];
  fbref_xg_assist: Scalars['Float']['output'];
  round: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  players: Array<Maybe<Player>>;
};


export type QueryPlayersArgs = {
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
};
