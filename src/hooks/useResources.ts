import { useMemo, useState } from 'react';
import type { Resource, ResourceDTO } from '@models';
import rawResources from '../data/resources.json';

const parseResources = (data: ResourceDTO[]): Resource[] =>
  data.map((r) => ({ ...r, date: new Date(r.date) }));

export const useResources = () => {
  const allResources = useMemo<Resource[]>(
    () => parseResources(rawResources as ResourceDTO[]),
    []
  );

  const [filtered, setFiltered] = useState<Resource[]>(allResources);

  const filterByName = (query: string): void => {
    const q = query.trim().toLowerCase();
    setFiltered(
      q === ''
        ? allResources
        : allResources.filter((r) => r.name.toLowerCase().includes(q))
    );
  };

  return { allResources, filtered, filterByName };
};
