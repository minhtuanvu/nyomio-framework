import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Organization } from './organization.model';

export interface OrganizationState extends EntityState<Organization> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'company' })
export class OrganizationStore extends EntityStore<OrganizationState, Organization> {

  constructor() {
    super();
  }

}

