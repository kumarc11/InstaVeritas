import pandas as pd
from sklearn.preprocessing import StandardScaler

def preprocess_data(input_path, output_path):
    """Preprocess Instagram account data for fake detection"""
    # Load data
    df = pd.read_csv(input_path)
    
    # Convert boolean columns to binary
    for col in ['name==username', 'private']:
        if col in df.columns:
            df[col] = df[col].astype(int)
    
    # Handle numerical features
    numerical_cols = ['nums/length username', '#posts', '#followers', '#follows']
    missing_num_cols = [col for col in numerical_cols if col not in df.columns]
    if missing_num_cols:
        raise ValueError(f"Missing numerical columns: {missing_num_cols}")
    
    # Normalize features
    scaler = StandardScaler()
    df[numerical_cols] = scaler.fit_transform(df[numerical_cols])
    
    # Save processed data
    df.to_csv(output_path, index=False)
    print(f"Successfully processed data saved to: {output_path}")

# Actual invocation with your specific paths
if __name__ == "__main__":
    input_file = r'C:\Users\kumar\instafake_detector\data\instagram_data.csv'
    output_file = r'C:\Users\kumar\instafake_detector\data\ipreprocessed_data.csv'
    
    preprocess_data(input_file, output_file)