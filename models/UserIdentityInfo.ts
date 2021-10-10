import { EntityId } from "@reduxjs/toolkit";

export interface UserIdentityInfo {
    name: string,
    preferred_username: string,
    sub: EntityId
}