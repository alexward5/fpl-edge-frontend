/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n    query GetData {\n        players {\n            fpl_player_id\n            fpl_web_name\n            fpl_team_name\n            fpl_player_position\n            fpl_player_cost\n            fpl_selected_by_percent\n            player_gameweek_data {\n                fpl_minutes\n                fpl_round\n                fpl_total_points\n                fpl_goals_scored\n                fpl_assists\n                fpl_bps\n                fpl_clean_sheet\n                fpl_defensive_contribution\n                fpl_expected_goals\n                fpl_expected_assists\n                fpl_xgi\n                sm_shots_on_target\n                sm_big_chances_created\n                sm_key_passes\n                calc_xgap\n            }\n        }\n        teams {\n            name\n        }\n        events {\n            id\n            is_current\n            finished\n        }\n    }\n": types.GetDataDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetData {\n        players {\n            fpl_player_id\n            fpl_web_name\n            fpl_team_name\n            fpl_player_position\n            fpl_player_cost\n            fpl_selected_by_percent\n            player_gameweek_data {\n                fpl_minutes\n                fpl_round\n                fpl_total_points\n                fpl_goals_scored\n                fpl_assists\n                fpl_bps\n                fpl_clean_sheet\n                fpl_defensive_contribution\n                fpl_expected_goals\n                fpl_expected_assists\n                fpl_xgi\n                sm_shots_on_target\n                sm_big_chances_created\n                sm_key_passes\n                calc_xgap\n            }\n        }\n        teams {\n            name\n        }\n        events {\n            id\n            is_current\n            finished\n        }\n    }\n"): (typeof documents)["\n    query GetData {\n        players {\n            fpl_player_id\n            fpl_web_name\n            fpl_team_name\n            fpl_player_position\n            fpl_player_cost\n            fpl_selected_by_percent\n            player_gameweek_data {\n                fpl_minutes\n                fpl_round\n                fpl_total_points\n                fpl_goals_scored\n                fpl_assists\n                fpl_bps\n                fpl_clean_sheet\n                fpl_defensive_contribution\n                fpl_expected_goals\n                fpl_expected_assists\n                fpl_xgi\n                sm_shots_on_target\n                sm_big_chances_created\n                sm_key_passes\n                calc_xgap\n            }\n        }\n        teams {\n            name\n        }\n        events {\n            id\n            is_current\n            finished\n        }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;