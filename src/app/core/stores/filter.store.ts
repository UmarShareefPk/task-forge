// src/app/core/stores/filter.store.ts
import { Injectable, signal, computed } from '@angular/core';

export type Filters = {
  fromDate: string | null;   // HTML <input type="date"> yields 'yyyy-MM-dd'
  toDate:   string | null;
  userId:   string | null;
  status:   string | null;
};

@Injectable({ providedIn: 'root' })
export class FilterStore {
  // raw fields
  readonly fromDate = signal<string | null>(null);
  readonly toDate   = signal<string | null>(null);
  readonly userId   = signal<string | null>(null);
  readonly status   = signal<string | null>(null);

  // bump this when user hits "Refresh"
  private readonly _version = signal(0);

  showFilter  = true;
  showStatus  = true;
  showUsers   = true;

  // --- setters ---
  setFromDate(v: string | null) { this.fromDate.set(v || null); }
  setToDate(v: string | null)   { this.toDate.set(v || null); }
  setUserId(v: string | null)   { this.userId.set(v || null); }
  setStatus(v: string | null)   { this.status.set(v || null); }

  // patch multiple at once
  patch(p: Partial<Filters>) {
    if ('fromDate' in p) this.setFromDate(p.fromDate ?? null);
    if ('toDate' in p)   this.setToDate(p.toDate ?? null);
    if ('userId' in p)   this.setUserId(p.userId ?? null);
    if ('status' in p)   this.setStatus(p.status ?? null);
  }

  // click "Refresh" -> bump version
  apply() { 
    this._version.update(v => v + 1); 
    console.log('apply called');
  }

  reset() {
    this.fromDate.set(null);
    this.toDate.set(null);
    this.userId.set(null);
    this.status.set(null);
    this.apply();
  }

  // snapshot of current values
  getFilters(): Filters {
    return {
      fromDate: this.fromDate(),
      toDate: this.toDate(),
      userId: this.userId(),
      status: this.status(),
    };
  }

  // consumers listen only to version changes
  readonly applied = computed(() => ({
    version: this._version(),
  }));

  // optional: shape for API
  getFiltersForApi() {
    const toIso = (d: string | null, endOfDay = false) => {
      if (!d) return null;
      const date = new Date(d + (endOfDay ? 'T23:59:59.999' : 'T00:00:00.000'));
      return date.toISOString();
    };
    return {
      fromDateIso: toIso(this.fromDate()),
      toDateIso: toIso(this.toDate(), true),
      userId: this.userId(),
      status: this.status(),
    };
  }
}
