import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrganizationStore} from './organization.store';
import {Organization} from '../organization.model';
import {OrganizationQuery} from './organization.query';
import {EntityEditorService} from '../../../projects/nyomio-ng-components/src/lib/entity-editor/entity-editor.service';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class OrganizationService extends EntityEditorService {

  private organizations: Organization[] = [
    {
      id: 1,
      org_address: 'address1', org_name: 'name1'
    },
    {
      id: 2,
      org_address: 'address2', org_name: 'name2'
    },
    {
      id: 3,
      org_address: 'address3', org_name: 'name3'
    }
  ];

  constructor(router: Router,
              route: ActivatedRoute,
              organizationStore: OrganizationStore,
              organizationQuery: OrganizationQuery,
              http: HttpClient
  ) {
    super(router, route, organizationStore, organizationQuery, http);
  }

  getAt(timestamp: number, filter?: string) {
    console.log('demo1-organizationservice-getAt: ' + timestamp + ' filter: ' + filter);
    this.entityStore.remove(this.entityQuery.getAll().map(org => org.id));
    this.entityStore.add(this.organizations);
  }

  upsert(organization: Organization) {
    console.error('not implemented');
  }

  deleteSelected() {
    console.error('not implemented');
  }

  buildDeleteUrl(selectedId: number): string {
    return '';
  }

  buildGetAtUrl(timestamp: number, filter?: string): string {
    return '';
  }

  buildUpsertUrl(): string {
    return '';
  }

}
