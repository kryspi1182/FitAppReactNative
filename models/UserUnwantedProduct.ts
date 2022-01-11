//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import { EntityId } from "@reduxjs/toolkit";

export interface UserUnwantedProduct {
  id: EntityId;
  userId: EntityId;
  productId: EntityId;
}
