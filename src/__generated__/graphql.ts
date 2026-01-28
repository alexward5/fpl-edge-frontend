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

export type Event = {
  __typename?: 'Event';
  finished: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  is_current: Scalars['Boolean']['output'];
};

export type Player = {
  __typename?: 'Player';
  fpl_player_cost: Scalars['Float']['output'];
  fpl_player_id: Scalars['String']['output'];
  fpl_player_position: Scalars['String']['output'];
  fpl_selected_by_percent: Scalars['Float']['output'];
  fpl_team_name: Scalars['String']['output'];
  fpl_web_name: Scalars['String']['output'];
  player_gameweek_data: Array<PlayerGameweekData>;
};

export type PlayerGameweekData = {
  __typename?: 'PlayerGameweekData';
  calc_xgap: Scalars['Float']['output'];
  fpl_assists: Scalars['Int']['output'];
  fpl_bps: Scalars['Int']['output'];
  fpl_clean_sheet: Scalars['Int']['output'];
  fpl_defensive_contribution: Scalars['Int']['output'];
  fpl_expected_assists: Scalars['Float']['output'];
  fpl_expected_goals: Scalars['Float']['output'];
  fpl_goals_scored: Scalars['Int']['output'];
  fpl_minutes: Scalars['Int']['output'];
  fpl_round: Scalars['Int']['output'];
  fpl_total_points: Scalars['Int']['output'];
  fpl_xgi: Scalars['Float']['output'];
  sm_big_chances_created: Scalars['Int']['output'];
  sm_key_passes: Scalars['Int']['output'];
  sm_shots_on_target: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  events: Array<Event>;
  players: Array<Player>;
  teams: Array<Team>;
};

export type Team = {
  __typename?: 'Team';
  name: Scalars['String']['output'];
};

export type GetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDataQuery = { __typename?: 'Query', players: Array<{ __typename?: 'Player', fpl_player_id: string, fpl_web_name: string, fpl_team_name: string, fpl_player_position: string, fpl_player_cost: number, fpl_selected_by_percent: number, player_gameweek_data: Array<{ __typename?: 'PlayerGameweekData', fpl_minutes: number, fpl_round: number, fpl_total_points: number, fpl_goals_scored: number, fpl_assists: number, fpl_bps: number, fpl_clean_sheet: number, fpl_defensive_contribution: number, fpl_expected_goals: number, fpl_expected_assists: number, fpl_xgi: number, sm_shots_on_target: number, sm_big_chances_created: number, sm_key_passes: number, calc_xgap: number }> }>, teams: Array<{ __typename?: 'Team', name: string }>, events: Array<{ __typename?: 'Event', id: number, is_current: boolean, finished: boolean }> };


export const GetDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fpl_player_id"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_web_name"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_team_name"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_player_position"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_player_cost"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_selected_by_percent"}},{"kind":"Field","name":{"kind":"Name","value":"player_gameweek_data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fpl_minutes"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_round"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_total_points"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_goals_scored"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_assists"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_bps"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_clean_sheet"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_defensive_contribution"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_expected_goals"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_expected_assists"}},{"kind":"Field","name":{"kind":"Name","value":"fpl_xgi"}},{"kind":"Field","name":{"kind":"Name","value":"sm_shots_on_target"}},{"kind":"Field","name":{"kind":"Name","value":"sm_big_chances_created"}},{"kind":"Field","name":{"kind":"Name","value":"sm_key_passes"}},{"kind":"Field","name":{"kind":"Name","value":"calc_xgap"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"is_current"}},{"kind":"Field","name":{"kind":"Name","value":"finished"}}]}}]}}]} as unknown as DocumentNode<GetDataQuery, GetDataQueryVariables>;