import pandas as pd
import json

# Load the Excel file
file_path = 'Security_Controls_Checklist_DSOMM_ASVS_MITTRE.xlsx'
xls = pd.ExcelFile(file_path)

# Load the relevant sheet into a dataframe
controls_df = pd.read_excel(xls, 'Security Controls')

# Load the existing JSON file
with open('final_output_structure.json', 'r') as json_file:
    data = json.load(json_file)

# Iterate over each control in the controls_df and add mitigation measures to the corresponding controls in the JSON data
for _, control_row in controls_df.iterrows():
    dimension_id = control_row['Dimension']
    area_id = control_row['Area']
    control_title = control_row['Activity (security controls)']
    control_description = control_row['Description']
    mitigation_measures = control_row['Detection / Mitigation Measures']
    
    # Split mitigation measures by lines
    if type(mitigation_measures) == str:
        mitigation_measures_list = mitigation_measures.split('\n')
    else:
        mitigation_measures_list = str(control_title)
    
    # Find the corresponding dimension and area in the JSON data
    for dimension in data['dimensions']:
        if dimension['title'] == dimension_id:
            for area in dimension['areas']:
                if area['title'] == area_id:
                    #print(area['title'])
                    area['controls'].append({
                        "title" : control_title,
                        "category" : control_row['Security standard'],
                        "isCompleted": False,
                        "description" : str(control_description),
                        "mitigation_measures" : mitigation_measures_list
                    })                        

# Save the updated JSON structure to a file
output_file_path = 'output.json'
with open(output_file_path, 'w') as json_file:
    json.dump(data, json_file, indent=4)

print(f"Updated JSON structure has been created and saved to {output_file_path}")

