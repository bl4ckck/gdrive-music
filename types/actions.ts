import { ActionPlayerType } from "./player";
import { KActions, TActions } from "./types";
export type ActionCoba = | TActions<"ea2asd", number | null> | TActions<"ea", number | null>
/**
 * Action Types
 */
type SActions<K extends string, T extends TActions<any>> = { key: K, type: T }
export type ACTION_TYPES = | SActions<Extract<KActions, { key: "PLAYER" }>, ActionPlayerType>
    | SActions<Extract<KActions, { key: "COBA" }>, ActionCoba>