/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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

export type Events = {
  __typename?: 'Events';
  finished: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  is_current: Scalars['Boolean']['output'];
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
  fbref_minutes: Scalars['Int']['output'];
  fbref_npxg: Scalars['Float']['output'];
  fbref_round: Scalars['Int']['output'];
  fbref_xg_assist: Scalars['Float']['output'];
  fpl_assists: Scalars['Int']['output'];
  fpl_bps: Scalars['Int']['output'];
  fpl_clean_sheet: Scalars['Int']['output'];
  fpl_gameweek: Scalars['Int']['output'];
  fpl_goals_scored: Scalars['Int']['output'];
  fpl_total_points: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  events: Array<Events>;
  players: Array<Player>;
  teams: Array<Team>;
};


export type QueryPlayersArgs = {
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryTeamsArgs = {
  teamNames?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Team = {
  __typename?: 'Team';
  fbref_team: Scalars['String']['output'];
  fbref_team_matchlog: Array<TeamMatchlog>;
};

export type TeamMatchlog = {
  __typename?: 'TeamMatchlog';
  fbref_match_date: Scalars['String']['output'];
  fbref_round: Scalars['Int']['output'];
  match_number: Scalars['Int']['output'];
};

export type GetTeamNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamNamesQuery = { __typename?: 'Query', teams: Array<{ __typename?: 'Team', fbref_team: string }> };

export type GetFplEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFplEventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Events', id: number, is_current: boolean, finished: boolean }> };

export type GetPlayerDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlayerDataQuery = { __typename?: 'Query', players: Array<{ __typename?: 'Player', fpl_player_code: number, fpl_web_name: string, fbref_team: string, fpl_player_position: string, fpl_player_cost: number, fpl_selected_by_percent: number, player_gameweek_data: Array<{ __typename?: 'PlayerGameweekData', fbref_round: number, fbref_minutes: number, fbref_npxg: number, fpl_gameweek: number, fpl_total_points: number, fpl_goals_scored: number, fpl_assists: number, fpl_bps: number, fpl_clean_sheet: number, calc_fpl_npxp: number, fbref_xg_assist: number }> }> };


export const GetTeamNamesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTeamNames"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fbref_team"}}]}}]}}]} as unknown as DocumentNode<GetTeamNamesQuery, GetTeamNamesQueryVariables>;
export const GetFplEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFplEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"is_current"}},{"kind":"Field","name":{"kind":"Name","value":"finished"}}]}}]}}]} as unknown as DocumentNode<GetFplEventsQuery, GetFplEventsQueryVariables>;
export const GetPlayerDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPlayerData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fpl_player_code"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_web_name"}},{"kind":"Field","name":{"kind":"Name","value":"fbref_team"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_player_position"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_player_cost"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_selected_by_percent"}},{"kind":"Field","name":{"kind":"Name","value":"player_gameweek_data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fbref_round"}},{"kind":"Field","name":{"kind":"Name","value":"fbref_minutes"}},{"kind":"Field","name":{"kind":"Name","value":"fbref_npxg"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_gameweek"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_total_points"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_goals_scored"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_assists"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_bps"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_clean_sheet"}},{"kind":"Field","name":{"kind":"Name","value":"calc_fpl_npxp"}},{"kind":"Field","name":{"kind":"Name","value":"fbref_xg_assist"}}]}}]}}]}}]} as unknown as DocumentNode<GetPlayerDataQuery, GetPlayerDataQueryVariables>;