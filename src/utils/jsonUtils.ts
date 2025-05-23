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
          if (!Array.isArray(area.controls)) {
            errors.push(`Dimension ${idx}, Area ${areaIdx}: controls must be an array`);
          } else {
            area.controls.forEach((proposal: any, proposalIdx: number) => {
              if (!proposal.title || typeof proposal.title !== 'string') {
                errors.push(`Dimension ${idx}, Area ${areaIdx}, Proposal ${proposalIdx}: Missing or invalid title`);
              }
              // Ensure mitigation_measures is always an array, even if it's a single string
              if (proposal.mitigation_measures) {
                if (typeof proposal.mitigation_measures === 'string') {
                  proposal.mitigation_measures = [proposal.mitigation_measures];
                } else if (!Array.isArray(proposal.mitigation_measures)) {
                  errors.push(`Dimension ${idx}, Area ${areaIdx}, Proposal ${proposalIdx}: Mitigation measures must be an array`);
                }
              } else {
                proposal.mitigation_measures = [];
              }
              // Validate audit field if present
              if (proposal.audit !== undefined && typeof proposal.audit !== 'string') {
                errors.push(`Dimension ${idx}, Area ${areaIdx}, Proposal ${proposalIdx}: Audit must be a string if present`);
              }
            });
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
        controls: Array.isArray(area.controls) ? 
          area.controls.map((proposal: any) => ({
            id: proposal.id || String(Math.random()),
            title: proposal.title || 'Untitled Proposal',
            category: proposal.category || 'OWASP ASVS',
            isCompleted: Boolean(proposal.isCompleted),
            description: proposal.description || '',
            mitigation_measures: Array.isArray(proposal.mitigation_measures) ? 
              proposal.mitigation_measures :
              typeof proposal.mitigation_measures === 'string' ? 
                [proposal.mitigation_measures] : 
                [],
            // Only include audit if it exists and is a string
            ...(proposal.audit && typeof proposal.audit === 'string' ? { audit: proposal.audit } : {})
          })) : []
      })) : []
    }));
  } catch (error) {
    console.error('Data Normalization Error:', error);
    throw new Error('Failed to normalize data structure');
  }
};