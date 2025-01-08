interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateDimensionData = (data: unknown): ValidationResult => {
  const errors: string[] = [];

  try {
    if (!Array.isArray(data)) {
      errors.push('Root data must be an array');
      return { isValid: false, errors };
    }

    data.forEach((dimension, idx) => {
      if (!dimension.id || typeof dimension.id !== 'string') {
        errors.push(`Dimension ${idx}: Missing or invalid id`);
      }
      if (!dimension.title || typeof dimension.title !== 'string') {
        errors.push(`Dimension ${idx}: Missing or invalid title`);
      }
      if (!Array.isArray(dimension.areas)) {
        errors.push(`Dimension ${idx}: Areas must be an array`);
      } else {
        dimension.areas.forEach((area: any, areaIdx: number) => {
          if (!area.id || typeof area.id !== 'string') {
            errors.push(`Dimension ${idx}, Area ${areaIdx}: Missing or invalid id`);
          }
          if (!area.title || typeof area.title !== 'string') {
            errors.push(`Dimension ${idx}, Area ${areaIdx}: Missing or invalid title`);
          }
          if (!area.remediationProposals || typeof area.remediationProposals !== 'object') {
            errors.push(`Dimension ${idx}, Area ${areaIdx}: Missing or invalid remediationProposals`);
          } else {
            const proposal = area.remediationProposals;
            if (!proposal.title || typeof proposal.title !== 'string') {
              errors.push(`Dimension ${idx}, Area ${areaIdx}: Missing or invalid proposal title`);
            }
            if (!Array.isArray(proposal.mitigation_measures)) {
              errors.push(`Dimension ${idx}, Area ${areaIdx}: Mitigation measures must be an array`);
            }
          }
        });
      }
    });

    return { isValid: errors.length === 0, errors };
  } catch (error) {
    console.error('JSON Validation Error:', error);
    errors.push('Invalid JSON structure');
    return { isValid: false, errors };
  }
};

export const normalizeData = (data: any) => {
  try {
    if (!Array.isArray(data)) {
      data = [data];
    }

    return data.map((dimension: any) => ({
      id: dimension.id || String(Math.random()),
      title: dimension.title || 'Untitled Dimension',
      description: dimension.description || '',
      areas: Array.isArray(dimension.areas) ? dimension.areas.map((area: any) => ({
        id: area.id || String(Math.random()),
        title: area.title || 'Untitled Area',
        description: area.description || '',
        isCompleted: Boolean(area.isCompleted),
        remediationProposals: {
          title: area.remediationProposals?.title || 'Untitled Proposal',
          category: area.remediationProposals?.category || 'OWASP ASVS',
          isCompleted: Boolean(area.remediationProposals?.isCompleted),
          description: area.remediationProposals?.description || '',
          mitigation_measures: Array.isArray(area.remediationProposals?.mitigation_measures) ?
            area.remediationProposals.mitigation_measures : []
        }
      })) : []
    }));
  } catch (error) {
    console.error('Data Normalization Error:', error);
    throw new Error('Failed to normalize data structure');
  }
};