import pandas as pd
import json

# Load the Excel file
file_path = 'Security_Controls_Checklist_DSOMM_ASVS_MITRE.xlsx'
xls = pd.ExcelFile(file_path)

# Load the relevant sheets into a dataframe
dimensions_df = pd.read_excel(file_path, sheet_name='Dimensions', engine='openpyxl')
areas_df = pd.read_excel(file_path, sheet_name='Areas', engine='openpyxl')
controls_df = pd.read_excel(xls, 'Security Controls')

# Extract dimensions information
dimensions = []
for index, row in dimensions_df.iterrows():
    dimension_id = row['Dimension ID']
    dimension_title = row['Dimension Name']
    dimension_description = row['Description']
    
    # Extract areas information for the current dimension
    areas = []
    for _, area_row in areas_df[areas_df['Dimension ID'] == dimension_id].iterrows():
        area_id = area_row['Area ID']
        area_title = area_row['Area']
        area_description = area_row['Description']
        
        areas.append({
            "id": area_id,
            "title": area_title,
            "description": area_description,
            "isCompleted": False,
            "controls": []
        })
    
    dimensions.append({
        "id": dimension_id,
        "title": dimension_title,
        "description": dimension_description,
        "areas": areas
    })

# Iterate over each control in the controls_df and add mitigation measures to the corresponding controls in the JSON data
for _, control_row in controls_df.iterrows():
    dimension_name = control_row['Dimension']
    area_name = control_row['Area']
    control_title = control_row['Activity (security controls)']
    control_description = control_row['Description']
    mitigation_measures = control_row['Detection / Mitigation Measures']
    
    # Split mitigation measures by lines
    if type(mitigation_measures) == str:
        mitigation_measures_list = mitigation_measures.split('\n')
    else:
        mitigation_measures_list = str(control_title)
    
    # Find the corresponding dimension and area in the JSON data
    for dimension in dimensions:
        if dimension['title'] == dimension_name:
            for area in dimension['areas']:
                if area['title'] == area_name:
                    #print(area['title'])
                    area['controls'].append({
                        "title" : control_title,
                        "category" : control_row['Security standard'],
                        "isCompleted": False,
                        "description" : str(control_description),
                        "mitigation_measures" : mitigation_measures_list
                    })                        

# Save the extracted information to a JSON file
output_file_path = 'output.json'
with open(output_file_path, 'w') as json_file:
    json.dump(dimensions, json_file, indent=4)

print(f"Data has been successfully extracted and saved to {output_file_path}")

