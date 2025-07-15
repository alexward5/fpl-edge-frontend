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
    "\n    query GetTeamNames {\n        teams {\n            fbref_team\n        }\n    }\n": types.GetTeamNamesDocument,
    "\n    query GetPlayerGameweekData {\n        players {\n            fpl_player_code\n            fpl_web_name\n            fbref_team\n            fpl_player_position\n            fpl_player_cost\n            fpl_selected_by_percent\n            player_gameweek_data {\n                fbref_round\n                fbref_minutes\n                calc_fpl_npxp\n                fbref_xg_assist\n                fbref_npxg\n                fpl_gameweek\n            }\n        }\n        teams {\n            fbref_team\n            fbref_team_matchlog {\n                fbref_match_date\n                fbref_round\n                match_number\n            }\n        }\n    }\n": types.GetPlayerGameweekDataDocument,
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
export function gql(source: "\n    query GetTeamNames {\n        teams {\n            fbref_team\n        }\n    }\n"): (typeof documents)["\n    query GetTeamNames {\n        teams {\n            fbref_team\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetPlayerGameweekData {\n        players {\n            fpl_player_code\n            fpl_web_name\n            fbref_team\n            fpl_player_position\n            fpl_player_cost\n            fpl_selected_by_percent\n            player_gameweek_data {\n                fbref_round\n                fbref_minutes\n                calc_fpl_npxp\n                fbref_xg_assist\n                fbref_npxg\n                fpl_gameweek\n            }\n        }\n        teams {\n            fbref_team\n            fbref_team_matchlog {\n                fbref_match_date\n                fbref_round\n                match_number\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetPlayerGameweekData {\n        players {\n            fpl_player_code\n            fpl_web_name\n            fbref_team\n            fpl_player_position\n            fpl_player_cost\n            fpl_selected_by_percent\n            player_gameweek_data {\n                fbref_round\n                fbref_minutes\n                calc_fpl_npxp\n                fbref_xg_assist\n                fbref_npxg\n                fpl_gameweek\n            }\n        }\n        teams {\n            fbref_team\n            fbref_team_matchlog {\n                fbref_match_date\n                fbref_round\n                match_number\n            }\n        }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;